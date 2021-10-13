import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@fontsource/josefin-sans/400.css';
import '@fontsource/josefin-sans/700.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
