<template>
  <div class="detail-order-item__background">
    <div class="detail-order-item">
      <h3 class="title_h3">Detail order item</h3>
      <button @click.prevent="closeDetailOrderPage" class="close-btn"></button>
      <div class="detail-order-item__main-section">
        <div class="products-section">
          <h4 class="title_h4">Products:</h4>
          <SmallProductCard v-for="product in products" :key="product.id" :productData="product"></SmallProductCard>
          <h4 class="title_h4 product__id-section">Order id: <span class="product__id">{{ orderItem.id }}</span></h4>
          <h4 class="title_h4 product__create-section">Created at: <span class="product__create">{{
            calcCreateDate(orderItem.attributes.createdAt) }}</span></h4>
          <h4 class="title_h4 product__description-section">Order description:</h4>
          <p class="product__description">{{ orderItem.attributes.description ? orderItem.attributes.description :
            "Without description" }}</p>
          <h4 class="title_h4 product__pay-method-section">Pay method: <span class="product__pay-method">{{
            payMethod(orderItem.attributes.payMethod) }}</span></h4>
          <h4 class="title_h4 product__shipping-section">Order shipping: <span class="product__shipping">{{
            orderItem.attributes.shipping }}</span></h4>
          <h4 class="title_h4 product__total-section">Order total: <span class="product__total">{{
            orderItem.attributes.total }}</span></h4>
        </div>
        <div class="address-section">
          <h4 class="title_h4">Address:</h4>
          <h4 class="title_h4 address__section">Country: <span class="address__description">{{
            orderItem.attributes.address.data.attributes.country }}</span></h4>
          <h4 class="title_h4 address__section">City: <span class="address__description">{{
            orderItem.attributes.address.data.attributes.city }}</span></h4>
          <h4 class="title_h4 address__section">Zip: <span class="address__description">{{
            orderItem.attributes.address.data.attributes.zip }}</span></h4>
          <h4 class="title_h4 address__section">Address: <span class="address__description">{{
            orderItem.attributes.address.data.attributes.address }} {{
    orderItem.attributes.address.data.attributes.appartment }}</span></h4>
          <h4 class="title_h4 address__section">People: <span class="address__description">{{
            orderItem.attributes.address.data.attributes.firstName }} {{
    orderItem.attributes.address.data.attributes.lastName }}</span></h4>
          <h4 class="title_h4 address__section">Email: <span class="address__description address_email">{{
            orderItem.attributes.address.data.attributes.email }}</span></h4>
          <h4 class="title_h4 address__section">Phone: <span class="address__description address_phone">+{{
            orderItem.attributes.address.data.attributes.phone }}</span></h4>
        </div>
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
    },
    calcCreateDate(date) {
      const formatDate = Date.parse(date);
      return new Intl.DateTimeFormat("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(formatDate);
    },
    payMethod(method) {
      const methods = {
        card: "Payment card",
        bank: "Bank transfer",
        cash: "Cash on delivery"
      }
      return methods[method];
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

.title_h4 {
  font-size: 18px;
  font-weight: 500;
  color: #3D3D3D;
  margin-bottom: 15px;
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
  height: 90%;
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

.product__id-section {
  padding-bottom: 25px;
  margin-top: 30px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__id {
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #46A358;
  margin-left: 10px;
}

.product__create-section {
  padding-bottom: 25px;
  margin-top: 30px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__create {
  font-size: 18px;
  font-weight: 400;
  margin-left: 10px;
}

.product__description-section {
  margin-top: 30px;

}

.product__description {
  font-size: 16px;
  color: #3D3D3D;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__pay-method-section {
  padding-bottom: 25px;
  margin-top: 30px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__pay-method {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #46A358;
}

.product__shipping-section {
  padding-bottom: 25px;
  margin-top: 30px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__shipping {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
}

.product__total-section {
  padding-bottom: 25px;
  margin-top: 30px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__total {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
  color: #46A358;
  font-weight: 700;
}

.address-section {
  padding-right: 10px;
}

.address__section {
  margin-top: 30px;
  padding-bottom: 25px;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.address__description {
  display: inline-block;
  margin-left: 10px;
  font-size: 18px;
}
</style>