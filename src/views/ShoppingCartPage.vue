<template>
  <div class="shopping-cart-page">
    <form action="" class="shopping-cart-page__form">
      <div class="shopping-cart-page__main-section">
        <div class="products-cards-header">
          <p class="product-products">Products</p>
          <p class="product-price">Price</p>
          <p class="product-quantity">Quantity</p>
          <p class="product-total">Total</p>
        </div>
        <transition-group tag="div" class="cards" name="cards">
          <ShoppingCartPageProductCard v-for="item in this.$store.getters.getterUserShoppingCartProducts" :key="item.id"
            :item="item"></ShoppingCartPageProductCard>
        </transition-group>
      </div>
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
import ShoppingCartPageProductCard from '@/components/ShoppingCartPageProductCard.vue';
export default {
  components: {
    ShoppingCartSidebar,
    CarouselWithItems,
    ShoppingCartPageProductCard,
  }
}
</script>

<style scoped>
.shopping-cart-page {
  padding-top: 80px;
  padding-bottom: 80px;
}

.cards-enter-active,
.cards-leave-active {
  transition: all 0.8s ease-in-out;
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.shopping-cart-page__form {
  margin-bottom: 90px;
  display: grid;
  grid-template-columns: 1fr 340px;
  grid-gap: 80px;
}

.products-cards-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: .5px solid #46A358;
}

.product-products,
.product-price,
.product-quantity,
.product-total {
  font-size: 16px;
  color: #3d3d3d;
  font-weight: 700;
}

.title_h3 {
  margin-bottom: 55px;
  padding-bottom: 10px;
  border-bottom: 1px solid #46A358;
  font-size: 17px;
  color: #46A358;
  font-weight: 700;
}</style>