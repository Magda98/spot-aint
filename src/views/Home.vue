<template>
  <div v-if="featuredPlaylists && isLogged" class="home">
    <h1>Polecane</h1>
    <div class="playlists">
      <div
        v-for="playlist in featuredPlaylists.playlists.items"
        :key="playlist.id"
      >
        <router-link :to="{ name: 'Playlist', params: { id: playlist.id } }">
          <div class="playlist">
            <img :src="playlist.images[0].url" />
            <h5>{{ playlist.name }}</h5>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  methods: {
    ...mapActions('spotify', ['getFeaturedPlaylists']),
  },
  created() {
    if (this.isLogged) {
      this.getFeaturedPlaylists();
    }
  },
  computed: {
    ...mapGetters('spotify', ['featuredPlaylists']),
    ...mapGetters('user', ['isLogged']),
  },
};
</script>

<style scoped lang="scss">
.home {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}
h1 {
  text-align: left;
  width: 100%;
  padding: 0 20px;
  margin: 0px 0 20px 0;
  font-size: 26px;
  font-weight: 700;
}

.playlists {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 50px;
  margin-top: 25px;
  padding: 0 50px;
  max-height: 65vh;
  overflow-y: auto;

  a {
    text-decoration: none;
  }
  div.playlist {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    h5 {
      text-decoration: none;
      color: #fff;
      text-align: left;
      font-size: 25px;
      margin-top: 20px;
    }
  }
  img {
    width: 100%;
  }
}
</style>
