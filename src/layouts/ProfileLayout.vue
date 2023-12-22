<template>
  <Header></Header>
  <router-view></router-view>
</template>

<script>
import Header from '@/components/app/Header.vue';
export default {
  components: {
    Header,
  },
  mounted() {
    this.$store.commit('updateUser', window.localStorage.getItem('userData'))
    this.$store.commit('updateJwt', window.localStorage.getItem('jwt'))
  }
}
</script>

<style></style>