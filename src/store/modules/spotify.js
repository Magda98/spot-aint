import api from '@/api';
import { formatDistanceToNowStrict, startOfYesterday } from 'date-fns';
import { format } from 'date-fns/esm';
import { pl } from 'date-fns/locale';
// initial state
const state = {
  favouritesList: {},
  currentUserTrack: false,
};

// getters
const getters = {
  getFavourites: (state) => state.favouritesList,
  getCurrentUris: (state) =>
    state.favouritesList.items.map((item) => item.track.uri),
  currentUserTrack: (state) => state.currentUserTrack,
};

// actions
const actions = {
  fetchFavourites({ commit }, payload) {
    api.getUserTracks((response) => {
      commit('saveFavourites', response);
    }, payload);
  },
  checkIfUserTracks({ commit }, payload) {
    api.checkIfUserTracks((response) => {
      commit('setUserTrackinfo', response);
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
  setUserTrackinfo(state, payload) {
    state.currentUserTrack = payload[0];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
