<template>
  <div class="favourites">
    <h1>Ulubione utwory</h1>
    <songsList
      :tracks="getFavourites"
      :currentUris="getCurrentUris"
    ></songsList>
    <div class="pagination">
      <v-pagination
        flat
        v-model="page"
        :length="Number.parseInt(getFavourites.total / getFavourites.limit)"
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
    ...mapActions('spotify', ['fetchFavourites']),
  },
  created() {
    this.page = this.currentPageFav;
  },

  data() {
    return {
      page: 1,
    };
  },
  computed: {
    ...mapGetters('spotify', [
      'getFavourites',
      'getCurrentUris',
      'currentPageFav',
    ]),
  },
  watch: {
    page: function (val) {
      console.log(val);
      this.fetchFavourites({
        offset: (val - 1) * this.getFavourites.limit,
        page: val,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.favourites {
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
