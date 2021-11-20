import api from '@/api';
import router from '@/router';
import queryString from 'query-string';

// initial state
const state = {
  token: false,
  userInfo: false,
  logged_in: false,
};

// getters
const getters = {
  getRefreshToken: (state) => state.token.refresh_token,
  getToken: (state) => state.token.access_token,
  token: (state) => state.token.access_token,
  userInfo: (state) => state.userInfo,
  isLogged: (state) => state.logged_in,
};

function randomBytes(size) {
  return crypto.getRandomValues(new Uint8Array(size));
}

function base64url(bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function generateCodeChallenge(code_verifier) {
  const codeVerifierBytes = new TextEncoder().encode(code_verifier);
  const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes);
  return base64url(new Uint8Array(hashBuffer));
}

// actions
const actions = {
  async login() {
    const baseUrl = 'https://accounts.spotify.com/authorize';
    const clientId = '57a795ef5d9a4ccca747877d47fbc61d';
    // const redirectUri = 'http://localhost:8080/callback';
    const redirectUri = 'https://magda98.github.io/spot-aint/';
    const code_verifier = base64url(randomBytes(96));
    let code = await generateCodeChallenge(code_verifier);

    //
    let scopes = new Array(
      'user-read-private',
      'user-read-email',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-modify-playback-state',
      'streaming',
      'user-library-modify',
      'user-library-read',
      'user-top-read',
    );

    const scope = scopes.join('%20');
    const responseType = 'code';

    window.sessionStorage.setItem('code_verifier', code_verifier);
    window.location.href = `${baseUrl}?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=${responseType}&code_challenge_method=S256&code_challenge=${code}`;
  },

  getToken({ commit, state, dispatch }) {
    const params = queryString.parse(location.search);

    api.getToken((token) => {
      commit('saveToken', { token });
      dispatch('getUserInfo');
    }, params);
  },
  getUserInfo({ commit, dispatch }) {
    return api.getUserInfo((userInfo) => {
      commit('saveUserInfo', { userInfo });
    });
  },

  logout({ commit }) {
    commit('logout');
  },
};

// mutations
const mutations = {
  saveToken(state, { token }) {
    state.token = token;
    state.logged_in = true;
  },
  saveUserInfo(state, { userInfo }) {
    state.userInfo = userInfo;
    state.logged_in = true;
    setTimeout(function () {
      window.location.href = process.env.BASE_URL;
    }, 200);
  },
  logout(state) {
    state.token = '';
    state.userInfo = false;
    state.logged_in = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
