<template>
  <div class="search">
    <h1>Wyszukane utwory</h1>
    <v-text-field
      class="search"
      prepend-inner-icon="mdi-magnify"
      dense
      outlined
      v-model="search"
    >
    </v-text-field>
    <div v-if="searchResult">
      <songsList :tracks="searchResult" @trackClicked="handleClick"></songsList>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import songsList from '../components/songsList.vue';
export default {
  name: 'Search',
  components: { songsList },
  methods: {
    ...mapActions('spotify', ['getSearchResult']),
    ...mapActions('player', ['playSong']),
    handleClick(event, val) {
      this.playSong(val);
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
      this.getSearchResult(val);
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
  margin: 30px 0 20px 0;
  font-size: 26px;
  font-weight: 700;
}
</style>
