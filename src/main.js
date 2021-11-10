import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/700.css';
import axios from 'axios';
import { api, config } from './api';
import vuetify from '@/plugins/vuetify';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    if (this.$store.state.user.token) {
      axios.defaults.headers.common['Authorization'] =
        'Bearer ' + this.$store.state.user.token.access_token;
      this.$store.dispatch('player/initialization');
    }

    let VueInstance = this;
    // axios.interceptors.response.use(
    //   function (response) {
    //     return response;
    //   },
    //   function (error) {
    //     if (error.response.status === 401) {
    //       delete axios.defaults.headers.common['Authorization'];
    //       const urlParams = new URLSearchParams();
    //       urlParams.append('grant_type', 'refresh_token');
    //       urlParams.append(
    //         'refresh_token',
    //         VueInstance.$store.state.user.token.refresh_token,
    //       );
    //       urlParams.append('client_id', '57a795ef5d9a4ccca747877d47fbc61d');

    //       axios
    //         .post('https://accounts.spotify.com/api/token', urlParams, {
    //           headers: {
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //         })
    //         .then((response) => {
    //           console.log(response);
    //           axios.defaults.headers.common['Authorization'] =
    //             'Bearer ' + response.data.access_token;
    //           VueInstance.$store.commit('user/saveToken', response.data);
    //           this.$store.dispatch('player/initialization');
    //           console.log(error.config);
    //           return axios.request(error.config);
    //         })
    //         .catch((e) => {
    //           return Promise.reject(error);
    //         });
    //     } else if (error.response.status === 403)
    //       VueInstance.$store.dispatch('toastMessage/alert', {
    //         message: 'Musisz mieć konto premium aby używać tej aplikacji. 😔',
    //         type: 'warning',
    //       });
    //     else if (error.response.status === 404)
    //       VueInstance.$store.dispatch('toastMessage/alert', {
    //         message: 'Player nie jest jeszcze gotowy.',
    //         type: 'error',
    //       });
    //     else {
    //       return Promise.reject(error);
    //     }
    //   },
    // );
  },
}).$mount('#app');
