<template>
  <div class="search">
    <h1>Wyszukane utwory</h1>
    <v-text-field
      class="search"
      prepend-inner-icon="mdi-magnify"
      color="#1ed760"
      dense
      outlined
      v-model="search"
      placeholder="Wyszukaj utwór...."
    >
    </v-text-field>
    <div v-if="searchResult">
      <songsListSearch
        :tracks="searchResult.tracks"
        :currentUris="searchResultUris"
        @trackClicked="handleClick"
      ></songsListSearch>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import songsListSearch from '../components/songsListSearch.vue';
export default {
  name: 'Search',
  components: { songsListSearch },
  methods: {
    ...mapActions('spotify', ['getSearchResult']),
    ...mapActions('player', ['playSong']),
    handleClick(event, val) {
      this.playSong(val);
    },
    fetchEntriesDebounced() {
      // cancel pending call
      clearTimeout(this._timerId);

      // delay new call 500ms
      this._timerId = setTimeout(() => {
        this.getSearchResult(this.search);
      }, 500);
    },
  },
  data() {
    return {
      search: '',
      searchInp: false,
    };
  },
  watch: {
    search: function (val) {
      if (val) {
        this.fetchEntriesDebounced();
      }
    },
  },
  computed: {
    ...mapGetters('spotify', ['searchResult', 'searchResultUris']),
  },
};
</script>

<style scoped lang="scss">
.search {
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
</style>
