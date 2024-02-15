<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script>
import axios from "axios";
import Header from '@/components/app/Header.vue';
export default {
  components: {
    Header,
  },
  async created() {
    this.$store.commit('updateUser', JSON.parse(window.localStorage.getItem('userData')))
    this.$store.commit('updateJwt', window.localStorage.getItem('jwt'))
    await this.$store.dispatch("loadWishlistInProfilePage");
  },

}
</script>

<style></style>