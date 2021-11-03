import api from '@/api';

// initial state
const state = {
  favouritesList: {},
};

// getters
const getters = {};

// actions
const actions = {
  getFavourites() {
    api.getUserTracks((response) => {});
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
