// initial state
const state = {
  player: false,
};

const getters = {};
// actions
const actions = {
  initialization({ rootGetters }) {
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
    };
  },
};

// mutations
const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
