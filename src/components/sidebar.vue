<template>
  <div class="sidebar">
    <div class="sidebar-title">
      <div class="title">
        <svg viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M33 0C14.775 0 0 14.775 0 33c0 18.226 14.775 33 33 33 18.227 0 33-14.774 33-33C66 14.776 51.227.002 33 .002V0zm15.133 47.596a2.056 2.056 0 01-2.83.682c-7.747-4.733-17.5-5.805-28.988-3.18a2.058 2.058 0 01-.915-4.012c12.57-2.873 23.353-1.636 32.052 3.68.969.595 1.276 1.86.681 2.83zm4.04-8.987a2.572 2.572 0 01-3.54.85c-8.87-5.454-22.39-7.033-32.883-3.849a2.576 2.576 0 01-3.21-1.714 2.577 2.577 0 011.715-3.209c11.985-3.636 26.884-1.875 37.07 4.385a2.572 2.572 0 01.847 3.537zm.346-9.357c-10.636-6.317-28.183-6.898-38.338-3.816a3.086 3.086 0 11-1.791-5.907c11.656-3.539 31.034-2.855 43.28 4.414a3.083 3.083 0 011.079 4.23 3.084 3.084 0 01-4.228 1.08h-.002z"
            fill="#fff"
          />
        </svg>
        <h1 class="title-inner">Spotify AINT</h1>
      </div>
    </div>
    <div v-if="userInfo" class="sidebar-user-info">
      <img class="user-image" :src="userInfo.images[0].url" />
      <p>{{ userInfo.display_name }}</p>
    </div>

    <div class="sidebar-actions">
      <router-link v-if="userInfo" to="/" class="btn-sidebar home">
        <span class="icon icon-home" v-html="home"></span>
        Strona główna
      </router-link>
      <router-link v-if="userInfo" to="/search" class="btn-sidebar search">
        <span class="icon icon-search" v-html="search"></span>
        Wyszukiwanie
      </router-link>
      <router-link
        v-if="userInfo"
        to="/favourites"
        class="btn-sidebar favourites"
      >
        <span class="icon icon-favourites" v-html="favourites"></span>
        Ulubione
      </router-link>
      <router-link v-if="userInfo" to="/Logout" class="btn-sidebar logout">
        <span class="icon icon-logout" v-html="logout"></span>
        Wyloguj
      </router-link>
      <router-link v-if="!userInfo" to="/Login" class="btn-sidebar logout">
        <span class="icon icon-logout" v-html="logout"></span>
        Zaloguj
      </router-link>
    </div>

    <div v-if="playlists && userInfo" class="plylists">
      <div v-for="playlist in playlists.items" :key="playlist.id">
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
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'sidebar',
  data() {
    return {
      home: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22V12h6v10" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      search:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      favourites:
        '<svg viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20.291 2.612a5.5 5.5 0 00-7.78 0l-1.06 1.06-1.06-1.06a5.501 5.501 0 00-7.78 7.78l1.06 1.06 7.78 7.78 7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78v0z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      logout:
        '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    };
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    ...mapGetters('spotify', ['playlists']),
  },
  methods: {
    ...mapActions('spotify', ['getPlaylists']),
  },
  created() {
    if (this.userInfo) {
      this.getPlaylists();
    }
  },
};
</script>

<style scoped lang="scss">
@import '../styles/variables';
.sidebar-user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 15px;
  p {
    margin-bottom: 0;
  }
}
.user-image {
  width: 30px;
  border-radius: 10px;
  margin-right: 20px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  .title-inner {
    margin-left: 20px;
    font-size: 26px;
    font-weight: 700;
    margin-bottom: 0;
    margin-top: 0;
  }

  svg {
    max-width: 27px;
  }
}

.sidebar-actions {
  margin-top: 40px;
  .btn-sidebar {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    margin-bottom: 10px;
    color: #fff;
    text-decoration: none;
    border-radius: 10px;
    transition: background 0.3s;

    &:hover {
      background-color: $background;
    }
    &.router-link-exact-active {
      background-color: $background;
    }
  }
  .icon {
    width: 24px;
    margin-right: 20px;
    display: block;
  }
}

.plylists {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-top: 50px;

  a {
    text-decoration: none;
  }
  div.playlist {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    h5 {
      text-decoration: none;
    }
  }
  img {
    width: 35px;
    margin-right: 15px;
  }
}
</style>
