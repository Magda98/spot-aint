import api from '@/api';
import router from '@/router';
import queryString from 'query-string';

// initial state
const state = {
  getToken: false,
  token: String,
  userInfo: false,
};

// getters
const getters = {
  getRefreshToken: (state) => state,
  getToken: (state) => state.token.access_token,
  userInfo: (state) => state.userInfo,
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
    const redirectUri = 'http://localhost:8080/callback';
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
      console.log(token);
      commit('saveToken', { token });
      router.push('/');
      dispatch('getUserInfo');
    }, params);
  },
  getUserInfo({ commit, dispatch }) {
    api.getUserInfo((userInfo) => {
      if (userInfo.status === 401) {
        // dispatch('user/login');
      } else {
        commit('saveUserInfo', { userInfo });
      }
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
  },
  saveUserInfo(state, { userInfo }) {
    state.userInfo = userInfo;
    state.logged_in = true;
  },
  logout(state) {
    state.token = '';
    state.userInfo = false;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
