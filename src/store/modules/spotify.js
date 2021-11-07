import api from '@/api';

// initial state
const state = {
  favouritesList: {},
};

// getters
const getters = {
  getFavourites: (state) => state.favouritesList,
};

// actions
const actions = {
  fetchFavourites({ commit }) {
    api.getUserTracks((response) => {
      commit('saveFavourites', response);
    });
  },
};

// mutations
const mutations = {
  saveFavourites(state, payload) {
    state.favouritesList = payload;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
