<template>
  <div class="detail-order-item__background">
    <div class="detail-order-item">
      <h3 class="title_h3">Detail order item</h3>
      <button @click.prevent="closeDetailOrderPage" class="close-btn"></button>
      <div class="detail-order-item__main-section">
        <div class="products-section">
          <SmallProductCard v-for="product in products" :key="product.id" :productData="product"></SmallProductCard>
        </div>
        <div class="address-section"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SmallProductCard from './SmallProductCard.vue';
export default {
  components: { SmallProductCard },
  props: {
    orderItem: Object,
  },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    closeDetailOrderPage() {
      this.$emit('closeDetailOrderPage');
    }
  },
  mounted() {
    [...this.$store.getters.getAllProducts].forEach((item) => {
      this.orderItem.attributes.products.data.forEach(element => {
        if (element.id === item.id) {
          this.products.push(item);
        }
      });
    });
  }
}
</script>

<style scoped>
.title_h3 {
  font-size: 24px;
  font-weight: 500;
  color: #3D3D3D;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.detail-order-item__background {
  z-index: 10;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background: rgba(10, 13, 18, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail-order-item {
  box-sizing: border-box;
  width: 80%;

  overflow: scroll;
  position: relative;
  background: #FFF;
  border-bottom: 5px solid #46A358;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-top: 20px;
}

.detail-order-item__main-section {
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-column-gap: 30px;
}

.close-btn {
  position: absolute;
  top: 11px;
  right: 11px;
  width: 18px;
  height: 18px;
  background: url("../assets/img/loginAndRegister/X.svg") no-repeat;
  background-size: 18px 18px;
  cursor: pointer;
}
</style>