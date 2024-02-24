<template>
  <div class="checkout-page">
    <ThankYouPage @closeThankYouPage="showThankYouPage = !showThankYouPage" :thankYouPageData="thankYouPageData"
      v-if="showThankYouPage"></ThankYouPage>
    <form action="" class="checkout-form">
      <div class="main-content-sectioni">
        <SaveAddress @changeOrderDescription="changeOrderDescription" @sendAddressData="sendAddressData"
          :deliveryAddress="deliveryAddress"></SaveAddress>
        <ShippingAdress @addAddress="addAddress" :isProfilePage="false"></ShippingAdress>
      </div>
      <div class="sidebar-section">
        <CheckoutSidebar :canCreateOrder="canCreateOrder" :deliveryAddress="deliveryAddress"
          @changeShowThankYouPage="changeShowThankYouPage">
        </CheckoutSidebar>
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
      console.log(this.deliveryAddress);
    },
    sendAddressData(data) {
      console.log(data)
    },
    changeShowThankYouPage(obj) {
      console.log(obj)
      this.thankYouPageData["total"] = obj['total'];
      this.thankYouPageData["shipping"] = obj['shipping'];
      this.thankYouPageData.payMethod = obj.payMethod;
      this.thankYouPageData.address = this.deliveryAddress;
      setTimeout(() => {
        this.showThankYouPage = obj.value;
      }, 1000)
      this.$store.dispatch('createOrder', this.thankYouPageData);
      //TODO:AFTER CREATING ORDER USER SHOPPING CART MUST BE EMPTY
    },
    changeOrderDescription(data) {
      this.thankYouPageData.orderDescription = data;
    }
  },
  computed: {
    canCreateOrder() {
      return this.deliveryAddress !== null;
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