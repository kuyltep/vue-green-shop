<template>
  <Header></Header>
  <router-view></router-view>
  <login-and-register></login-and-register>
  <Footer></Footer>
</template>

<script>
import LoginAndRegister from './LoginAndRegister.vue';
import Footer from '@/components/app/Footer.vue';
import Header from '@/components/app/Header.vue';
export default {
  components: {
    Header,
    Footer,
    LoginAndRegister,
  },
  data() {
    return {
      isLoginMenuOpen: false,
    }
  }
}
</script>

<style></style>