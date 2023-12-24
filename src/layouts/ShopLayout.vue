<template>
  <Header></Header>
  <main class="main">
    <router-view></router-view>
  </main>
  <login-and-register v-if="getLoginMenuOpen"></login-and-register>
  <Footer></Footer>
</template>

<script>
import LoginAndRegister from './LoginAndRegister.vue';
import Footer from '@/components/app/Footer.vue';
import Header from '@/components/app/Header.vue';
import { mapGetters, mapMutations } from 'vuex';
export default {
  components: {
    Header,
    Footer,
    LoginAndRegister,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['getLoginMenuOpen']),
  },
  mounted() {
    this.$store.commit('updateUser', window.localStorage.getItem('userData'))
    this.$store.commit('updateJwt', window.localStorage.getItem('jwt'))
  },
}
</script>

<style></style>