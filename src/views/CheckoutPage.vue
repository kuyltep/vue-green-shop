<template>
  <div class="checkout-page">
    <form action="" class="checkout-form">
      <div class="main-content-sectioni">
        <SaveAddress :deliveryAddress="deliveryAddress"></SaveAddress>
        <ShippingAdress @addAddress="addAddress" :isProfilePage="false"></ShippingAdress>
      </div>
      <div class="sidebar-section">
        <CheckoutSidebar></CheckoutSidebar>
      </div>
    </form>
  </div>
</template>

<script>
import ShippingAdress from '@/components/ShippingAdress.vue';
import SaveAddress from '@/components/SaveAddress.vue';
import CheckoutSidebar from '@/components/CheckoutSidebar.vue';
export default {
  components: {
    ShippingAdress,
    CheckoutSidebar,
    SaveAddress,
  },
  data() {
    return {
      deliveryAddress: null,
    }
  },
  methods: {
    addAddress(address) {
      this.deliveryAddress = address;
    }
  }
}
</script>

<style scoped>
.checkout-page {
  padding-top: 40px;
  padding-bottom: 150px;
}

.checkout-form {
  display: grid;
  grid-gap: 70px;
  grid-template-columns: 1fr 405px;
}
</style>