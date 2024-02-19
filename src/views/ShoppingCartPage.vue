<template>
  <div class="shopping-cart-page">
    <form action="" class="shopping-cart-page__form">
      <div class="shopping-cart-page__main-section"></div>
      <div class="shopping-cart-page__sidebar">
        <ShoppingCartSidebar></ShoppingCartSidebar>
      </div>
    </form>
    <div class="intrested-section">
      <h3 class="title_h3">You may be interested in</h3>
      <CarouselWithItems></CarouselWithItems>
    </div>
  </div>
</template>

<script>
import ShoppingCartSidebar from '@/components/ShoppingCartSidebar.vue';
import CarouselWithItems from '@/components/CarouselWithItems.vue';
export default {
  components: {
    ShoppingCartSidebar,
    CarouselWithItems,
  }
}
</script>

<style scoped>
.shopping-cart-page {
  padding-top: 80px;
  padding-bottom: 80px;
}

.shopping-cart-page__form {
  margin-bottom: 90px;
  display: grid;
  grid-template-columns: 1fr 340px;
  grid-gap: 80px;
}

.title_h3 {
  margin-bottom: 55px;
  padding-bottom: 10px;
  border-bottom: 1px solid #46A358;
  font-size: 17px;
  color: #46A358;
  font-weight: 700;
}
</style>