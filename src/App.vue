<template>
  <div class="container">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import ShopLayout from './layouts/ShopLayout.vue';
import ProfileLayout from './layouts/ProfileLayout.vue';
import EmptyLayout from './layouts/EmptyLayout.vue';
export default {
  components: {
    ShopLayout,
    ProfileLayout,
    EmptyLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout;
    }
  },
  async mounted() {
    this.$store.commit('updateUser', JSON.parse(window.localStorage.getItem('userData')))
    this.$store.commit('updateJwt', window.localStorage.getItem('jwt'))
    await this.$store.dispatch('fetchAllProducts');
    await this.$store.dispatch('fetchProducts');
    this.$store.dispatch('getCardIcons');
    if (this.$store.getters.getUser?.id) {
      this.$store.dispatch("getUserWishlist", this.$store.getters.getUser.id);
      this.$store.dispatch("loadWishlistInProfilePage")
      this.$store.dispatch("getUserShoppingCart", this.$store.getters.getUser.id)
      this.$store.dispatch("getOrders");
      this.$store.dispatch("getUserOrders");
    }
  },
}
</script>

<style>
@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Bold.woff');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Medium.woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Regular.woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Thin.woff');
  font-weight: 300;
  font-style: normal;
}

* {
  font-family: 'CeraPro';
  font-weight: 400;
  box-sizing: border-box;
}

ul,
li,
p,
a,
img,
h1,
h2,
h3,
h4,
html {
  margin: 0;
  padding: 0;
}

button {
  border: none;
  outline: none;
  background: none;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto minmax(500px, 1fr) auto;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 8px;
}

::-webkit-scrollbar-thumb:hover {
  background: #46A358;
}
</style>
