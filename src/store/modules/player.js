import api from '@/api';
import Vue from 'vue';
// initial state
const state = {
  devId: false,
  playing: false,
  min: 0,
  max: 100,
  slider: 0,
};

const getters = {
  getPlayer: (state) => state.player,
  getPlayerState: (state) => state.playing,
  max: (state) => state.max,
  sliderVal: (state) => state.slider,
};
// actions
const actions = {
  initialization({ rootGetters, commit, dispatch }) {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = rootGetters['user/getToken'];
      const player = new window.Spotify.Player({
        name: 'Spot-Aint',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
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
        console.log(statePlayer);
        if (!statePlayer.paused && !state.playing) {
          commit('setPlaying', statePlayer);
          if (!Vue.prototype.$interval) {
            Vue.prototype.$interval = setInterval(() => {
              dispatch('playerUpdateSlider');
            }, 1000);
          } else if (statePlayer.paused) {
            clearInterval(Vue.prototype.$interval);
            Vue.prototype.$interval = false;
          }
        }
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        commit('saveDevId', device_id);

        console.log('Ready with Device ID', device_id);
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
    commit('setPlayingPaused');
  },

  playerResume({ dispatch }) {
    Vue.prototype.$player.togglePlay();
  },

  playerSeek({ commit }, val) {
    Vue.prototype.$player.seek(val);
  },

  playerUpdateSlider({ commit }) {
    Vue.prototype.$player
      .getCurrentState()
      .then((response) => commit('setSlider', response.position));
  },
};

// mutations
const mutations = {
  saveDevId(state, id) {
    state.devId = id;
  },
  setPlaying(state, player) {
    state.playing = true;
    state.slider = player.position;
    state.max = player.duration;
  },
  setPlayingPaused(state) {
    state.playing = false;
  },

  setSlider(state, position) {
    state.slider = position;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
