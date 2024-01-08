<template>
  <div class="card">
    <div class="card-image-wrapper">
      <img :src="'http://localhost:1337' + item.image.data[0].attributes.url" alt="" class="card-image">
    </div>
    <h4 class="card-title">{{ item.name }}</h4>
    <p class="card-price">${{ item.price.toFixed(2) }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    }
  }
}
</script>

<style scoped>
.card:hover {
  border-top: 1px solid #46A358;
  cursor: pointer;
}

.card-image-wrapper {
  margin-bottom: 12px;
  padding: 20px 4px 30px 4px;
  background: #FBFBFB;
  display: flex;
  justify-content: center;
}

.card-title {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
}

.card-price {
  color: #46A358;
  font-size: 18px;
  font-weight: 700;
}
</style>