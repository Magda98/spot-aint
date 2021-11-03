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
    const code_verifier = window.sessionStorage.getItem('code_verifier');
    const urlParams = new URLSearchParams();
    urlParams.append('grant_type', 'authorization_code');
    urlParams.append('code', params.code);
    urlParams.append('redirect_uri', 'http://localhost:8080/callback');
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
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
        cb(e.response.data.error);
      });
  },
};
