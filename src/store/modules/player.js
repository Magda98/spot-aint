import api from '@/api';
import Vue from 'vue';
// initial state
const state = {
  devId: false,
};

const getters = {
  getPlayer: (state) => state.player,
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
      player.addListener('account_error', ({ message }) => {});
      player.addListener('playback_error', ({ message }) => {});

      // Playback status updates
      player.addListener('player_state_changed', (statePlayer) => {});

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
        // console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect();
      Vue.prototype.$player = player;
    };
  },

  playSong({ state }, data) {
    api.playSong((song) => {}, { track: data, id: state.devId });
  },
};

// mutations
const mutations = {
  saveDevId(state, id) {
    state.devId = id;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
