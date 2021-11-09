<template>
  <div class="songsList">
    <div class="header">
      <div class="id">#</div>
      <div class="title">Tytuł</div>
      <div class="album">Album</div>
      <div class="date">Data dodania</div>
      <div class="time">
        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M11 5v6l4 2"
            stroke="#fff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>
    <div
      v-for="(track, index) in tracks.items"
      :key="track.track.id"
      class="track"
      @click="playSong({ uris: currentUris, offset: index })"
    >
      <span class="id">{{ index + 1 + tracks.offset }}</span>
      <div class="song-info">
        <img :src="track.track.album.images[0].url" />
        <div class="title-section">
          <h3 class="title">{{ track.track.name }}</h3>
          <p class="sub-title">{{ track.track.artists[0].name }}</p>
        </div>
      </div>
      <div class="album sub-title">{{ track.track.album.name }}</div>
      <div class="add-date">{{ track.added_at }}</div>
      <div class="duration">{{ track.track.duration }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    tracks: {},
    currentUris: [],
  },
  methods: {
    ...mapActions('player', ['playSong']),
  },
  created() {},
};
</script>
<style lang="scss" scoped>
@import '../styles/variables';

.songsList {
  padding: 10px 10px;
  margin-bottom: 20px;
  width: 100%;
}
.header {
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 2fr 1fr;
  padding: 10px 0px;
  margin: 0px 20px 20px 20px;
  border-bottom: 1px solid rgba(30, 215, 96, 0.6);
  .time {
    svg {
      width: 24px;
    }
  }
  .id,
  .time {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title,
  .album,
  .date {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
.track {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 3fr 2fr 2fr 1fr;
  padding: 5px 20px;
  border-radius: 10px;

  .album,
  .add-date {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .id,
  .duration {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    background-color: $background-2;
  }
  img {
    width: 40px;
  }
  .song-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .title-section {
      margin-left: 10px;
    }
    .title {
      font-size: 18px;
      margin: 0;
      font-weight: 400;
      text-align: left;
    }

    .sub-title {
      color: rgba(255, 255, 255, 0.6);
      font-size: 16px;
      font-weight: 400;
      text-align: left;
      margin-bottom: 0;
    }
  }
}
</style>
