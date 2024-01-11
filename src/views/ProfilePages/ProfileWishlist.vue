<template>
  <div>Profile wishlist</div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('getUserWishlist');
  }
}
</script>

<style></style>