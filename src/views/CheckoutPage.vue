<template>
  <div class="checkout-page">
    <ThankYouPage :thankYouPageData="thankYouPageData" v-if="showThankYouPage"></ThankYouPage>
    <form action="" class="checkout-form">
      <div class="main-content-sectioni">
        <SaveAddress @sendAddressData="sendAddressData" :deliveryAddress="deliveryAddress"></SaveAddress>
        <ShippingAdress @addAddress="addAddress" :isProfilePage="false"></ShippingAdress>
      </div>
      <div class="sidebar-section">
        <CheckoutSidebar @changeShowThankYouPage="changeShowThankYouPage"></CheckoutSidebar>
      </div>
    </form>
  </div>
</template>

<script>
import ShippingAdress from '@/components/ShippingAdress.vue';
import SaveAddress from '@/components/SaveAddress.vue';
import CheckoutSidebar from '@/components/CheckoutSidebar.vue';
import ThankYouPage from '@/views/ThankYouPage.vue';
export default {
  components: {
    ShippingAdress,
    CheckoutSidebar,
    SaveAddress,
    ThankYouPage
  },
  data() {
    return {
      deliveryAddress: null,
      showThankYouPage: false,
      thankYouPageData: {}
    }
  },
  methods: {
    addAddress(address) {
      this.deliveryAddress = address;
      console.log(this.deliveryAddress)
    },
    sendAddressData(data) {
      console.log(data)
    },
    changeShowThankYouPage(obj) {
      console.log(obj)
      this.thankYouPageData["total"] = obj['total'];
      this.thankYouPageData["shipping"] = obj['shipping'];
      this.thankYouPageData.payMethod = obj.payMethod;
      setTimeout(() => {
        this.showThankYouPage = obj.value;
      }, 1000)
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