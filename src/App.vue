<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>

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
  color: #fff;
  background-color: $background;
  font-family: 'Josefin Sans';
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
