import api from '@/api';
import { formatDistanceToNowStrict } from 'date-fns';
import { format } from 'date-fns/esm';
import { pl } from 'date-fns/locale';
import router from '@/router';
// initial state
const state = {
  favouritesList: {},
  currentUserTrack: false,
  currentPageFav: 1,
  playlists: {},
  playlistSongs: [],
  currentPlaylist: {},
  featuredPlaylists: {},
  searchResult: false,
};

// getters
const getters = {
  getFavourites: (state) => state.favouritesList,
  getCurrentUris: (state) =>
    state.favouritesList.items.map((item) => item.track.uri),
  getCurrentPlaylistUris: (state) =>
    state.playlistSongs.items.map((item) => item.track.uri),
  currentUserTrack: (state) => state.currentUserTrack,
  currentPageFav: (state) => state.currentPageFav,
  playlists: (state) => state.playlists,
  playlistSongs: (state) => state.playlistSongs,
  currentPlaylist: (state) => state.currentPlaylist,
  featuredPlaylists: (state) => state.featuredPlaylists,
  searchResult: (state) => state.searchResult,
  searchResultUris: (state) => {
    if (state.searchResult) {
      return state.searchResult.tracks.items.map((item) => item.uri);
    } else return false;
  },
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
    });
  },
  getPlaylistSongs({ commit }, payload) {
    api.getPlaylistSongs((response) => {
      commit('savePlaylistSongs', response);
    }, payload);
  },
  setCurrentPlaylist({ commit }, id) {
    commit('setCurrentPlaylist', id);
  },
  getFeaturedPlaylists({ commit }) {
    api.getFeaturedPlaylists((response) => {
      commit('saveFeaturedPlaylists', response);
    });
  },

  getSearchResult({ commit }, query) {
    api.getSearchResult((response) => {
      commit('saveSearchResult', response);
      console.log(response);
    }, query);
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
  savePlaylistSongs(state, songs) {
    songs.items.forEach((item) => {
      item.added_at = formatDistanceToNowStrict(new Date(item.added_at), {
        addSuffix: true,
        locale: pl,
      });
      item.track.duration = format(new Date(item.track.duration_ms), 'mm:ss');
    });
    state.playlistSongs = songs;
  },
  setCurrentPlaylist(state, id) {
    const allPlaylists = [
      ...state.playlists?.items,
      ...state.featuredPlaylists?.playlists?.items,
    ];
    state.currentPlaylist = allPlaylists.find((item) => item.id == id);
  },
  saveFeaturedPlaylists(state, playlists) {
    state.featuredPlaylists = playlists;
  },
  saveSearchResult(state, searchResult) {
    searchResult.tracks.items.forEach((item) => {
      item.duration = format(new Date(item.duration_ms), 'mm:ss');
    });
    state.searchResult = searchResult;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
