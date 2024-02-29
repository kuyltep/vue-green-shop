<template>
  <div @click.prevent="clickOnProfileOrderItem" class="profile-order-item">
    <div class="header-section">
      <p class="header-section__title header-section__products">Products</p>
      <p class="header-section__title header-section__address">Address</p>
      <p class="header-section__title header-section__create-data">Create</p>
      <p class="header-section__title header-section__price">Price</p>
    </div>
    <div class="order-section">
      <div class="order-section__products">
        <p v-for="product in orderItem.attributes.products.data" :key="product.id" class="product__data">
          {{ product.attributes.name }} <span class="product__quantity">(x{{ calcProductQty(product.id) }})</span></p>
      </div>
      <div class="order-section__address">
        <p class="address__content">{{ orderItem.attributes.address.data.attributes.city }}</p>
        <p class="address__content">{{ orderItem.attributes.address.data.attributes.address }}</p>
        <p class="address__content">{{ orderItem.attributes.address.data.attributes.email }}</p>
        <p class="address__content">{{ orderItem.attributes.address.data.attributes.phone }}</p>
      </div>
      <div class="order-section__create-data">{{ calcCreateDate(orderItem.attributes.createdAt) }}</div>
      <div class="order-section__price">
        <p class="price__shipping">Shipping: {{ orderItem.attributes.shipping }}$</p>
        <p class="price__total"> Total: {{ orderItem.attributes.total }}$</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderItem: Object,
  },
  methods: {
    calcProductQty(id) {
      return this.orderItem.attributes.quantities[id];
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
    clickOnProfileOrderItem() {
      this.$emit("clickOnProfileOrderItem", this.orderItem);
    }
  }
}
</script>

<style scoped>
.profile-order-item {
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 15px 25px;
  background: #FBFBFB;
  border-radius: 15px;
  margin-bottom: 20px;
}

.profile-order-item:hover {
  transition: transform .6s ease-in-out;
  transform: scale(1.02);
}

.header-section {
  display: grid;
  grid-template-columns: repeat(3, 2fr) 1fr;
}

.order-section {
  display: grid;
  grid-template-columns: repeat(3, 2fr) 1fr;

}

.header-section__title {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
  padding: 15px 0;
  border-bottom: 2px solid rgba(70, 163, 88, 0.20);
}

.product__data {
  margin-bottom: 15px;
  font-size: 14px;
  color: #3D3D3D;
  font-weight: 500;
}

.product__quantity {
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  color: grey;
}

.order-section__create-data {
  font-size: 14px;
  font-weight: 500;
  color: #3D3D3D;

}

.address__content {
  font-size: 14px;
  color: #3D3D3D;
  font-weight: 500;
  margin-bottom: 15px;
}

.price__shipping {
  font-size: 14px;
  color: #3D3D3D;
  font-weight: 500;
  margin-bottom: 15px;
}

.price__total {
  font-size: 14px;
  color: #46A358;
  font-weight: 700;
}
</style>