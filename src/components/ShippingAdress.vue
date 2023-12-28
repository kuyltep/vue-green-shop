<template>
  <div class="shipping-adress">
    <h4 class="title_h4">Shipping Address</h4>
    <p class="descr-text">You have not set up this type of address yet.</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted() {
    axios.get(`http://localhost:1337/api/adresses?populate=*`, {
      headers: {
        Authorization: "Bearer " + this.$store.getters.getJwt,
      }
    }).then((response) => {
      console.log(response);
    })
  }
}
</script>

<style scoped>
.title_h4 {
  color: #3D3D3D;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
}

.descr-text {
  color: #727272;
  font-size: 14px;
  font-weight: 400;
}
</style>