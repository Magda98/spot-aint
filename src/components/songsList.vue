<template>
  <div class="songsList">
    <div
      v-for="(track, index) in tracks.items"
      :key="track.track.id"
      class="track"
    >
      <span class="id">{{ index + 1 }}</span>
      <div @click="playSong(track.track.uri)" class="song-info">
        <img :src="track.track.album.images[0].url" />
        <div class="title-section">
          <h3 class="title">{{ track.track.name }}</h3>
          <p class="sub-title">{{ track.track.album.name }}</p>
        </div>
      </div>
      <div class="add-date">{{ track.added_at }}</div>
      <div class="duration">{{ track.track.duration_ms }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    tracks: {},
  },
  methods: {
    ...mapActions('player', ['playSong']),
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.songsList {
  width: 90%;
  padding: 50px;
}
.track {
  display: flex;
  width: 100%;
  justify-content: space-between;

  img {
    width: 40px;
  }
  .song-info {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 400px;
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
    }
  }
}
</style>
