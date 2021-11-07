<template>
  <div class="player">
    <button class="paly">
      <svg viewBox="0 0 26 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.917 1.75L24.083 16 1.917 30.25V1.75z"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  created() {},
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-color: $background-2;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 23px;
  }
}
</style>
