<template>
  <v-app>
    <div id="app">
      <div id="nav"><sidebar></sidebar></div>
      <div class="main">
        <router-view />
        <div v-if="loader" class="loader">
          <v-progress-circular
            class="progress-circular"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </div>
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
    ...mapGetters('loader', ['loader']),
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
.main {
  position: relative;
  flex: 1;
  .loader {
    background-color: $background;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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
  .v-input__slot {
    margin: 0;
  }
  .v-slider__track-container {
    height: 5px;
    .primary.lighten-3 {
      background-color: #fff !important;
      border-color: #fff !important;
    }
  }
  .v-slider__track {
    height: 5px;
  }
  .v-input.search {
    border-radius: 10px;
    max-height: 40px;
    max-width: 100%;
    width: 100%;
    padding: 0 50px;
    .v-input__slot {
      background-color: #fff;
    }
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
  width: 310px;
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
