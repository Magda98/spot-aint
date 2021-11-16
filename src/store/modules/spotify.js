import api from '@/api';
import {
  formatDistanceToNowStrict,
  startOfSecond,
  startOfYesterday,
} from 'date-fns';
import { format } from 'date-fns/esm';
import { pl } from 'date-fns/locale';
// initial state
const state = {
  favouritesList: {},
  currentUserTrack: false,
  currentPageFav: 1,
  playlists: {},
};

// getters
const getters = {
  getFavourites: (state) => state.favouritesList,
  getCurrentUris: (state) =>
    state.favouritesList.items.map((item) => item.track.uri),
  currentUserTrack: (state) => state.currentUserTrack,
  currentPageFav: (state) => state.currentPageFav,
  playlists: (state) => state.playlists,
};

// actions
const actions = {
  fetchFavourites({ commit }, payload) {
    api.getUserTracks((response) => {
      commit('saveFavourites', { response: response, page: payload.page });
    }, payload.offset);
  },
  checkIfUserTracks({ commit }, payload) {
    api.checkIfUserTracks((response) => {
      commit('setUserTrackinfo', response);
    }, payload);
  },
  saveUserTracks({ commit, dispatch, state }, payload) {
    api.saveUserTracks(() => {
      commit('setUserTrackinfo', [true]);
      dispatch('fetchFavourites', {
        offset: state.currentPageFav * state.favouritesList.limit,
        page: state.currentPageFav,
      });
    }, payload);
  },
  deleteUserTracks({ commit, dispatch, state }, payload) {
    api.deleteUserTracks(() => {
      commit('setUserTrackinfo', [false]);
      dispatch('fetchFavourites', {
        offset: state.currentPageFav * state.favouritesList.limit,
        page: state.currentPageFav,
      });
    }, payload);
  },
  getPlaylists({ commit }) {
    api.getPlaylists((response) => {
      commit('savePlaylists', response);
      console.log(response);
    });
  },
};

// mutations
const mutations = {
  saveFavourites(state, payload) {
    payload.response.items.forEach((item) => {
      item.added_at = formatDistanceToNowStrict(new Date(item.added_at), {
        addSuffix: true,
        locale: pl,
      });
      item.track.duration = format(new Date(item.track.duration_ms), 'mm:ss');
    });
    state.favouritesList = payload.response;
    state.currentPageFav = payload.page;
  },
  setUserTrackinfo(state, payload) {
    state.currentUserTrack = payload[0];
  },
  savePlaylists(state, playlists) {
    state.playlists = playlists;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
