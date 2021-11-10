import api from '@/api';
import { formatDistanceToNowStrict } from 'date-fns';
import { format } from 'date-fns/esm';
import { pl } from 'date-fns/locale';
// initial state
const state = {
  favouritesList: {},
};

// getters
const getters = {
  getFavourites: (state) => state.favouritesList,
  getCurrentUris: (state) =>
    state.favouritesList.items.map((item) => item.track.uri),
};

// actions
const actions = {
  fetchFavourites({ commit }, payload) {
    api.getUserTracks((response) => {
      commit('saveFavourites', response);
    }, payload);
  },
};

// mutations
const mutations = {
  saveFavourites(state, payload) {
    payload.items.forEach((item) => {
      item.added_at = formatDistanceToNowStrict(new Date(item.added_at), {
        addSuffix: true,
        locale: pl,
      });
      item.track.duration = format(new Date(item.track.duration_ms), 'mm:ss');
    });
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
