<template>
  <div id="app">
    <div id="nav"><sidebar></sidebar></div>
    <router-view />
  </div>
</template>

<script>
import sidebar from '@/components/sidebar.vue';
export default {
  components: {
    sidebar,
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
</style>
