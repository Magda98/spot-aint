<template>
  <v-app>
    <div id="app">
      <div id="nav"><sidebar></sidebar></div>
      <router-view />
    </div>

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
export default {
  components: {
    sidebar,
  },
  computed: {
    ...mapGetters('toast', [
      'timeout',
      'alertType',
      'alertIcon',
      'message',
      'showAlert',
    ]),
  },
  methods: {
    ...mapActions('player', ['initialization']),
    ...mapActions('toast', ['hideAlert']),
  },
  created() {
    this.initialization();
  },
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
  font-family: 'Josefin Sans';
  min-height: 100vh;
}

#nav {
  padding: 30px;
  width: 307px;
  height: 100vh;
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
