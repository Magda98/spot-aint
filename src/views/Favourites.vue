<template>
  <div class="favourites">
    <songsList :tracks="getFavourites"></songsList>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import songsList from '../components/songsList.vue';
export default {
  name: 'Favourites',
  components: { songsList },
  methods: {
    ...mapActions('spotify', ['fetchFavourites']),
  },
  created() {
    this.fetchFavourites();
  },
  computed: {
    ...mapGetters('spotify', ['getFavourites']),
  },
};
</script>

<style scoped lang="scss">
.favourites {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
