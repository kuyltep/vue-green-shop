<template>
  <Header></Header>
  <router-view></router-view>
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

}
</script>

<style></style>