<template>
  <div class="shopping-cart-sidebar">
    <h4 class="title_h4">Cart Totals</h4>
    <p class="shopping-cart-sidebar__text">Coupon Apply</p>
    <CouponeApply></CouponeApply>
    <div class="subtotal-section">
      <p class="subtotal-text">Subtotal</p>
      <p class="subtotal-value">${{ }}</p>
    </div>
    <div class="discont-section">
      <p class="discont-text">Coupon Discount</p>
      <p class="discont-value">(-{{ sale ? sale + "%" : '' }}) {{ }}</p>
    </div>
    <div class="shiping-section">
      <p class="shiping-text">Shiping</p>
      <p class="shiping-value"></p>
    </div>
    <div class="total-section">
      <p class="total-text">Total</p>
      <p class="total-value">${{ }}</p>
    </div>
    <router-link to="/shop/checkout" class="checkout-page-button">Proceed To Checkout</router-link>
    <router-link to="/" class="shopping-page-button">Continue Shopping</router-link>
  </div>
</template>

<script>
import CouponeApply from './CouponeApply.vue';
export default {
  components: {
    CouponeApply,
  }
}
</script>

<style scoped>
.shopping-cart-sidebar {
  display: flex;
  flex-direction: column;
}

.title_h4 {
  font-size: 16px;
  color: #3D3D3D;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 1px solid #46a35965;
  margin-bottom: 10px;
}

.shopping-cart-sidebar__text {
  font-size: 14px;
  color: #3D3D3D;
  margin-bottom: 10px;
}

.subtotal-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.discont-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.total-section {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.shiping-section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.50);
}

.subtotal-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.subtotal-value {
  color: #3D3D3D;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
}

.shiping-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.shiping-value {
  color: #3D3D3D;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
}

.discont-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.discont-value {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.total-section {
  margin-bottom: 30px;
}

.total-text {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 700;
}

.total-value {
  color: #46A358;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}

.checkout-page-button {
  color: #fff;
  background: #46A358;
  border-radius: 3px;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 0;
  margin-bottom: 15px;
  text-decoration: none;
  text-align: center;
}

.shopping-page-button {
  text-align: center;
  color: #46A358;
  text-decoration: none;
  font-size: 15px;
}
</style>