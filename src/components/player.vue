<template>
  <div class="player">
    <v-slider v-model="slider" :max="max"></v-slider>
    <button class="paly">
      <svg
        @click="playerResume"
        v-if="!getPlayerState"
        viewBox="0 0 26 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.917 1.75L24.083 16 1.917 30.25V1.75z"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        @click="playerPause"
        v-if="getPlayerState"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="prefix__feather prefix__feather-pause"
      >
        <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {},
  computed: {
    ...mapGetters('player', ['getPlayerState', 'max', 'sliderVal']),
    slider: {
      get() {
        return this.sliderVal;
      },
      set(val) {
        this.playerSeek(val);
      },
    },
  },
  methods: {
    ...mapActions('player', ['playerPause', 'playerResume', 'playerSeek']),
  },
  data() {
    return {
      min: -50,
    };
  },
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
