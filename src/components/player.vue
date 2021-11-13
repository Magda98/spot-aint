<template>
  <div class="player">
    <v-slider
      class="player-slider"
      color="#1ed760"
      v-on:change="playerSeek"
      v-model="sliderModel"
      :max="max"
      :min="0"
    ></v-slider>
    <div class="song-info-section">
      <div class="song-info">
        <div v-if="songInfo.track_window">
          <img :src="songInfo.track_window.current_track.album.images[0].url" />
          <div class="title-section">
            <h3>{{ songInfo.track_window.current_track.name }}</h3>
            <p>{{ songInfo.track_window.current_track.artists[0].name }}</p>
          </div>
          <button class="save-track">
            <svg
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.26 6.915a8.25 8.25 0 00-11.67 0L18 8.505l-1.59-1.59a8.252 8.252 0 00-11.67 11.67l1.59 1.59L18 31.845l11.67-11.67 1.59-1.59a8.25 8.25 0 000-11.67v0z"
                stroke="#fff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="player-actions">
        <button
          :disabled="playerDisallowsPrev"
          @click="playerPrevSong"
          class="prev"
        >
          <svg
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.833 36.833L13 26l10.833-10.833M39 36.833L28.167 26 39 15.167"
              stroke="#fff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
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
        <button
          @click="playerNextSong"
          :disabled="playerDisallowsNext"
          class="next"
        >
          <svg
            viewBox="0 0 52 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.167 36.833L39 26 28.167 15.167M13 36.833L23.833 26 13 15.167"
              stroke="#fff"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div class="volume-slider-section">
        <button class="vol-min">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 5L6 9H2v6h4l5 4V5zM15.54 8.46a5 5 0 010 7.07"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <v-slider
          v-on:change="playerSetVolume"
          v-model="sliderVolumeModel"
          class="volume-slider"
          hint="Regulacja głośności"
          max="1.0"
          step="0.1"
          min="0.0"
          color="#1ed760"
        ></v-slider>
        <button class="vol-max">
          <svg
            viewBox="0 0 22 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 1.07l-5 4H1v6h4l5 4v-14zM18.07 1a10 10 0 010 14.14M14.54 4.53a5 5 0 010 7.07"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  created() {},
  computed: {
    ...mapGetters('player', [
      'getPlayerState',
      'max',
      'sliderSong',
      'songInfo',
      'sliderVolume',
      'playerDisallowsPrev',
      'playerDisallowsNext',
    ]),
    sliderModel: {
      get() {
        return this.sliderSong;
      },
      set(val) {},
    },
    sliderVolumeModel: {
      get() {
        return this.sliderVolume;
      },
      set(val) {},
    },
  },
  methods: {
    ...mapActions('player', [
      'playerPause',
      'playerResume',
      'playerSeek',
      'playerSetVolume',
      'playerNextSong',
      'playerPrevSong',
    ]),
  },
};
</script>

<style scoped lang="scss">
@import '../styles/variables';

.player {
  bottom: 0;
  width: 100%;
  left: 0;
  right: 0;
  padding-left: 293px;
  padding-right: 20px;
  height: 150px;
  background-color: $background-2;
  display: flex;
  justify-content: center;
  position: absolute;

  .player-slider {
    position: absolute;
    top: -14px;
    left: 263px;
    right: 0;
  }
  .volume-slider {
    max-width: 200px;
  }
  flex-direction: column;

  svg {
    width: 23px;
  }
  .song-info-section {
    display: flex;
    justify-content: space-between;
  }
  .player-actions {
    display: flex;
    align-items: center;

    button {
      margin: 0 15px;
    }
  }
  .song-info {
    width: 100%;
    max-width: 310px;
  }
  .song-info > div {
    display: flex;
    align-items: center;
    .save-track {
      margin-left: 20px;
    }
    .title-section {
      margin-left: 10px;

      h3 {
        font-size: 20px;
        margin: 0;
        font-weight: 400;
        text-align: left;
      }
      p {
        margin: 0;
        color: rgba(255, 255, 255, 0.6);
        font-size: 16px;
        font-weight: 400;
        text-align: left;
        margin-bottom: 0;
      }
    }
    img {
      width: 100px;
    }
  }
  .volume-slider-section {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 250px;
    button {
      margin: 0 10px;
    }
  }
}
</style>
