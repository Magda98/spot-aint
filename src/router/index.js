import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Search from '../views/Search.vue';
import Favourites from '../views/Favourites.vue';
import Logout from '../views/Logout.vue';
import Playlist from '../views/Playlist.vue';
import Callback from '../views/Callback.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/callback',
    name: 'Callback',
    component: Callback,
  },

  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: Playlist,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
