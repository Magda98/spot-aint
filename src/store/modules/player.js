import api from '@/api';
import Vue from 'vue';
// initial state
const state = {
  devId: false,
  playing: false,
  max: 100,
  slider: 0,
  timestamp: 0,
  songInfo: {},
  volume: 0.5,
};

const getters = {
  getPlayer: (state) => state.player,
  getPlayerState: (state) => state.playing,
  max: (state) => state.max,
  sliderSong: (state) => state.slider,
  songInfo: (state) => state.songInfo,
  sliderVolume: (state) => state.volume,
  playerDisallowsPrev: (state) => state.songInfo?.disallows?.skipping_prev,
  playerDisallowsNext: (state) => state.songInfo?.disallows?.skipping_next,
  currentSongId: (state) => state.songInfo?.track_window?.current_track?.id,
};
// actions
const actions = {
  initialization({ rootGetters, commit, dispatch, state }) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = rootGetters['user/getToken'];
      const player = new window.Spotify.Player({
        name: 'Spot-Aint',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: state.volume,
      });
      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener('player_state_changed', (statePlayer) => {
        if (!statePlayer.paused && !state.playing) {
          if (!Vue.prototype.$interval) {
            Vue.prototype.$interval = setInterval(() => {
              dispatch('playerUpdateSlider');
            }, 1200);
          } else if (statePlayer.paused) {
            clearInterval(Vue.prototype.$interval);
            Vue.prototype.$interval = false;
          }
        }
        if (!statePlayer.paused) {
          commit('setPlaying', statePlayer);
        }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        commit('saveDevId', device_id);

        this.dispatch('toast/alert', {
          message: 'Odtwarzacz jest gotowy',
          type: 'success',
        });
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
      Vue.prototype.$player = player;
    };
  },

  playSong({ state }, data) {
    api.playSong(
      (response) => {
        if (response.status === 404) {
          this.dispatch('toast/alert', {
            message: response.message,
            type: 'error',
          });
        }
      },
      { track: data, id: state.devId },
    );
  },

  playerPause({ commit }) {
    Vue.prototype.$player.togglePlay();
    clearInterval(Vue.prototype.$interval);
    Vue.prototype.$interval = false;
    commit('setPlayingPaused');
  },

  playerResume({ dispatch }) {
    Vue.prototype.$player.togglePlay();
  },

  playerSeek({ commit }, val) {
    Vue.prototype.$player.seek(val);
  },

  playerUpdateSlider({ commit, state }) {
    Vue.prototype.$player.getCurrentState().then((response) => {
      if (
        Math.abs(state.slider - response.position) > 1000 &&
        state.timestamp < response.timestamp
      ) {
        Vue.prototype.$sliderPosition = response.position;
        commit('setSlider', response);
      }
    });
  },
  playerSetVolume({ commit }, payload) {
    Vue.prototype.$player.setVolume(payload);
    commit('setVolume', payload);
  },
  playerNextSong() {
    Vue.prototype.$player.nextTrack();
  },
  playerPrevSong() {
    Vue.prototype.$player.previousTrack();
  },
};

// mutations
const mutations = {
  saveDevId(state, id) {
    state.devId = id;
  },
  setPlaying(state, player) {
    state.playing = true;
    state.songInfo = player;
  },
  setPlayingPaused(state) {
    state.playing = false;
  },

  setSlider(state, playerState) {
    state.slider = playerState.position;
    state.timestamp = playerState.timestamp;
    state.max = playerState.duration;
  },
  setVolume(state, volume) {
    state.volume = volume;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
