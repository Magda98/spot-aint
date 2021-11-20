const state = {
  loader: false,
};
const getters = {
  loader: (state) => state.loader,
};
const actions = {
  showLoader({ commit }, payload) {
    commit('showLoader', payload);
  },
  hideLoader({ commit }) {
    commit('hideLoader');
  },
};

const mutations = {
  hideLoader(state) {
    state.loader = false;
  },
  showLoader(state, payload) {
    state.loader = true;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
