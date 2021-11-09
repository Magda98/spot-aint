import api from '@/api';
import Vue from 'vue';
// initial state
const state = {
  devId: false,
  playing: false,
};

const getters = {
  getPlayer: (state) => state.player,
  getPlayerState: (state) => state.playing,
};
// actions
const actions = {
  initialization({ rootGetters, commit }) {
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
        if (!statePlayer.paused) {
          commit('setPlaying');
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
};

// mutations
const mutations = {
  saveDevId(state, id) {
    state.devId = id;
  },
  setPlaying(state) {
    state.playing = true;
  },
  setPlayingPaused(state) {
    state.playing = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
