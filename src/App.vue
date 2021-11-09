<template>
  <v-app>
    <div id="app">
      <div id="nav"><sidebar></sidebar></div>
      <router-view />
    </div>
    <player v-if="userInfo"></player>
    <v-snackbar
      class="sp-snackbar"
      @input="hideAlert"
      :value="showAlert"
      :multi-line="true"
      :timeout="timeout"
    >
      <div
        style="display: flex; align-items: center; margin: auto"
        v-bind:class="[alertType + '--text']"
      >
        <v-icon
          style="margin-right: 20px"
          color="white"
          v-bind:class="[alertType + '--text']"
          >{{ alertIcon }}</v-icon
        >
        {{ message }}
      </div>
      <v-btn icon text @click="hideAlert"
        ><v-icon color="white">mdi-close</v-icon></v-btn
      >
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import sidebar from '@/components/sidebar.vue';
import player from '@/components/player.vue';
export default {
  components: {
    sidebar,
    player,
  },
  computed: {
    ...mapGetters('toast', [
      'timeout',
      'alertType',
      'alertIcon',
      'message',
      'showAlert',
    ]),
    ...mapGetters('user', ['userInfo']),
  },
  methods: {
    ...mapActions('toast', ['hideAlert']),
  },
  created() {},
};
</script>
<style lang="scss">
@import './styles/variables';
body {
  margin: 0;
}

.btn {
  background-color: $primary;
  border: 4px solid $primary;
  border-radius: 50px;
  color: #fff;
  padding: 18px 60px;
  font-family: 'Josefin Sans';
  font-size: 30px;
  transition: background-color 0.3s;

  &:hover {
    background-color: transparent;
  }
}

#app {
  text-align: center;
  display: flex;
  color: #fff;
  background-color: $background;
  font-family: 'Josefin Sans' !important;
  min-height: 100vh;

  .title {
    font-family: 'Josefin Sans' !important;
  }

  .pagination {
    ul li button {
      background: transparent;
      box-shadow: none;
      color: #fff;
      transition: background-color 0.3s;
      i {
        color: #fff;
      }

      &.v-pagination__item--active {
        background-color: $background-2 !important;
      }
      &:hover {
        background-color: $background-2 !important;
      }
    }
  }
}

#nav {
  padding: 30px;
  width: 307px;
  min-height: 100vh;
  background-color: $background-2;
  a {
    font-weight: bold;
    color: #fff;
  }
}
.sp-snackbar {
  .v-snack__content {
    position: relative;
  }
  button.v-btn {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
