<template>
  <div v-if="playlistSongs" class="playlist">
    <h1>{{ currentPlaylist.name }}</h1>
    <songsList
      :tracks="playlistSongs"
      :currentUris="getCurrentPlaylistUris"
      @trackClicked="handleClick"
    ></songsList>
    <div class="pagination">
      <v-pagination
        flat
        v-if="{}"
        v-model="page"
        :length="Number.parseInt(playlistSongs.total / playlistSongs.limit) + 1"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import songsList from '../components/songsList.vue';
export default {
  name: 'Playlist',
  components: { songsList },
  methods: {
    ...mapActions('spotify', ['getPlaylistSongs', 'setCurrentPlaylist']),
    ...mapActions('player', ['playPlaylist']),
    handleClick(event, val) {
      val.uris = this.currentPlaylist.uri;
      val.offset = val.offset + (this.page - 1) * 7;
      this.playPlaylist(val);
    },
  },
  mounted() {
    this.setCurrentPlaylist(this.$route.params.id);
    this.page = 1;
    this.getPlaylistSongs({ id: this.$route.params.id, offset: 0, limit: 7 });
  },

  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapGetters('spotify', [
      'playlistSongs',
      'getCurrentPlaylistUris',
      'currentPlaylist',
    ]),
  },
  watch: {
    page: function (val) {
      this.getPlaylistSongs({
        id: this.$route.params.id,
        offset: (this.page - 1) * 7,
        limit: 7,
      });
    },
    '$route.params.id': function (id) {
      this.setCurrentPlaylist(id);
      this.page = 1;
      this.getPlaylistSongs({ id: id, offset: 0, limit: 7 });
    },
  },
};
</script>

<style scoped lang="scss">
.playlist {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
.pagination {
  max-width: 500px;
}
h1 {
  text-align: left;
  width: 100%;
  padding: 0 20px;
  margin: 30px 0 20px 0;
  font-size: 26px;
  font-weight: 700;
}
</style>
