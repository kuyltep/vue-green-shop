<template>
  <div class="profile-order-item">
    <div class="header-section">
      <p class="header-section__title header-section__products">Products</p>
      <p class="header-section__title header-section__address">Address</p>
      <p class="header-section__title header-section__create-data">Create</p>
      <p class="header-section__title header-section__price">Price</p>
    </div>
    <div class="order-section"></div>
  </div>
</template>

<script>
export default {
  props: {
    orderItem: Object,
  }
}
</script>

<style scoped>
.profile-order-item {
  position: relative;
  width: 100%;
  padding: 15px 25px;
  background: #FBFBFB;
  border-radius: 15px;
  margin-bottom: 20px;
}

.header-section {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.header-section__title {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
  padding: 15px 0;
  border-bottom: 1px solid rgba(70, 163, 88, 0.20);
}
</style>