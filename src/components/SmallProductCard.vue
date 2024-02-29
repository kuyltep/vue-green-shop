<template>
  <div class="small-card">
    <div class="product-section">
      <img class="product-img" :src="'http://localhost:1337' + productData.image.data[0].attributes.url" alt="">
      <div class="product-description">
        <p class="product-title">{{ productData.name }}</p>
        <p class="product-sku">SKU: <span class="product-sku_bold">{{ productData.id }}</span></p>
      </div>
    </div>
    <div class="qty-section">
      <p class="qty-text">(x {{ this.$store.getters.getterUserShoppingCartProductsQuantitites[productData.id] }})</p>
    </div>
    <div class="total-section">
      <p class="total-text">${{ calcProductPrice().toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    productData: {
      type: Object,
    }
  },
  methods: {
    calcProductPrice() {
      return Math.floor(this.productData.sale ? this.productData.price / 100 * (100 - this.productData.sale) : this.productData.price);
    }
  }
}
</script>

<style scoped>
.small-card {
  background: #FBFBFB;
  height: 70px;
  margin-top: 10px;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
}

.product-section {
  display: flex;
  align-items: center;
}

.product-img {
  width: 70px;
  height: 70px;
}

.product-description {
  text-align: left;
  padding-left: 10px;
}

.product-name {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.product-sku {
  color: #A5A5A5;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.product-sku_bold {
  color: #727272;
  font-size: 14px;
  font-weight: 400;
}

.qty-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-text {
  color: #727272;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
}

.total-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.total-text {
  color: #46A358;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}
</style>