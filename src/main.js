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
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response.status === 401) {
          this.$store.dispatch('user/logout');
        }
      },
    );
  },
}).$mount('#app');
