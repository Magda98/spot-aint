import axios from 'axios';

axios.defaults.baseURL = 'https://api.spotify.com/v1/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const api = {
  clientID: '57a795ef5d9a4ccca747877d47fbc61d',
};

export const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
};

export default {
  getToken(cb, params) {
    delete axios.defaults.headers.common['Authorization'];
    const code_verifier = window.sessionStorage.getItem('code_verifier');
    const urlParams = new URLSearchParams();
    urlParams.append('grant_type', 'authorization_code');
    urlParams.append('code', params.code);
    urlParams.append('redirect_uri', process.env.BASE_URL);
    urlParams.append('client_id', api.clientID);
    urlParams.append('code_verifier', code_verifier);

    axios
      .post('https://accounts.spotify.com/api/token', urlParams, config)
      .then((response) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + response.data.access_token;
        cb(response.data);
      })
      .catch((e) => {
        cb(e.response.data.error);
      });
  },
  getUserInfo(cb) {
    axios
      .get('me')
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => {
        cb(e.response.data.error);
      });
  },

  getUserTracks(cb, payload) {
    axios
      .get('me/tracks', {
        params: {
          limit: 7,
          offset: payload,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => {
        cb(e.response.data.error);
      });
  },

  playSong(cb, data) {
    axios
      .put(`me/player/play?device_id=${data.id}`, {
        uris: data.track.uris,
        offset: {
          position: data.track.offset,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => cb(e.response.data.error));
  },
  checkIfUserTracks(cb, song) {
    axios
      .get(`me/tracks/contains`, {
        params: {
          ids: song,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => cb(e.response.data.error));
  },
  saveUserTracks(cb, song) {
    axios
      .put(`me/tracks`, [song])
      .then(() => {
        cb();
      })
      .catch((e) => cb(e.response.data.error));
  },
  deleteUserTracks(cb, song) {
    axios
      .delete(`me/tracks`, {
        params: {
          ids: song,
        },
      })
      .then(() => {
        cb();
      })
      .catch((e) => cb(e.response.data.error));
  },
  getPlaylists(cb, song) {
    axios
      .get(`me/playlists`)
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => cb(e.response.data.error));
  },
  getPlaylistSongs(cb, payload) {
    axios
      .get(`playlists/${payload.id}/tracks`, {
        params: {
          limit: payload.limit,
          offset: payload.offset,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => {
        cb(e.response.data.error);
      });
  },
  playPlaylist(cb, data) {
    console.log(data);
    axios
      .put(`me/player/play?device_id=${data.id}`, {
        context_uri: data.track.uris,
        offset: {
          position: data.track.offset,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => cb(e.response.data.error));
  },
  getFeaturedPlaylists(cb, song) {
    axios
      .get(`browse/featured-playlists`, {
        params: {
          locale: 'pl_PL',
          country: 'PL',
          limit: 50,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => cb(e.response.data.error));
  },
  getSearchResult(cb, query) {
    axios
      .get(`search`, {
        params: {
          q: query,
          type: 'track',
          include_external: 'audio',
          limit: 25,
          market: 'from_token',
          offset: 0,
        },
      })
      .then((response) => {
        cb(response.data);
      })
      .catch((e) => cb(e.response.data.error));
  },
};
