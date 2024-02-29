<template>
  <div class="layout-for-forms">
    <div class="block-for-window">
      <button @click.prevent="closeThankYouPage" class="close-btn"></button>
      <div class="content">
        <div class="thank-you-block">
          <img class="thank-you-image" src="../assets/img/loginAndRegister/thank-you.svg" alt="">
          <p class="thank-you-description">Your order has been received</p>
        </div>
        <div class="order-content">
          <div class="order-header">
            <div class="order-header-column">
              <p class="order-header__top-text">Order Number</p>
              <p class="order-header__bottom-text">{{ generateOrderNumber }}</p>
            </div>
            <div class="order-header-column">
              <p class="order-header__top-text">Date</p>
              <p class="order-header__bottom-text">{{ generateDate }}</p>
            </div>
            <div class="order-header-column">
              <p class="order-header__top-text">Total</p>
              <p class="order-header__bottom-text">{{ thankYouPageData.total }}</p>
            </div>
            <div class="order-header-column">
              <p class="order-header__top-text">Payment Method</p>
              <p class="order-header__bottom-text">{{ payMethods[thankYouPageData.payMethod] }}</p>
            </div>
          </div>
          <div class="order-body">
            <div class="body-header">
              <h4 class="header_h4">Order Details</h4>
              <div class="body-header__titles">
                <p class="body-header__title">Products</p>
                <p class="body-header__title title_qty">Qty</p>
                <p class="body-header__title title_subtotal">Subtotal</p>
              </div>
            </div>
            <div class="body-products" v-for="item in this.$store.getters.getterUserShoppingCartProducts" :key="item.id">
              <SmallProductCard :productData="item"></SmallProductCard>
            </div>
            <div class="body-total">
              <div class="shiping-section">
                <p class="shiping-text">Shiping</p>
                <p class="shiping-value">${{ thankYouPageData.shipping }}</p>
              </div>
              <div class="total-section">
                <p class="total-text">Total</p>
                <p class="total-value">${{ thankYouPageData.total }}</p>
              </div>
            </div>
          </div>
          <div class="order-end">
            <p class="thank-you-description">Your order is currently being processed. You will receive an order
              confirmation email shortly with the expected delivery date for your items.</p>
            <router-link to="/" class="track-button">Track your order</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SmallProductCard from '../components/SmallProductCard.vue';
import successTost from '@/toasts-plugins/success.tost';
export default {
  props: {
    thankYouPageData: Object,
  },
  data() {
    return {
      payMethods: {
        'card': 'Payment card',
        'bank': 'Online bank',
        'cash': 'Cash on delivery'
      },
      orderNumber: null,
    }
  },
  components: {
    SmallProductCard,
  },
  methods: {
    closeThankYouPage() {
      this.$emit('closeThankYouPage')
    }
  },
  computed: {
    calcSubtotal() {
      let subtotalSum = 0;
      this.$store.getters.getterUserShoppingCartProducts.forEach((element,) => {
        subtotalSum += element?.sale ? element.price * (100 - element?.sale) / 100 * this.$store.getters.getterUserShoppingCartProductsQuantitites[element.id] : element.price * this.$store.getters.getterUserShoppingCartProductsQuantitites[element.id];
      });
      this.subtotal = subtotalSum.toFixed(2);
      return subtotalSum.toFixed(2);
    },
    calcTotal() {
      this.total = (+this.subtotal - +this.discount + +this.shipping).toFixed(2);
      return this.total;
    },
    calcDiscount() {
      if (this.sale) {
        this.discount = (this.subtotal * this.sale / 100).toFixed(2);
        return this.discount;
      }
    },
    generateOrderNumber() {
      //TODO: Create order number function
      //TODO: Create order date function with format
      this.$store.dispatch("getOrders")
      return this.$store.getters.getOrdersLength + 1;
    },
    generateDate() {
      return new Intl.DateTimeFormat('en-US', {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }).format(new Date());
    }
  },
  mounted() {
    setTimeout(() => {
      this.$store.dispatch("clearUserShoppingCart");
      this.$emit('closeThankYouPage')
      this.$router.push('/');
    }, 10000)
    successTost("Success order!");
  }
}
</script>

<style scoped>
.layout-for-forms {
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

.thank-you-block {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0 15px 0;
  background: rgba(70, 163, 88, 0.06);
  border-bottom: 1px solid rgba(70, 163, 88, 0.20);

}

.thank-you-image {
  width: 80px;
  height: 80px;
  margin-bottom: 15px;
}

.thank-you-description {
  color: #727272;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
}

.order-content {
  padding: 0 42px 10px 42px;
}

.header_h4 {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 12px;
}

.order-header {
  padding: 15px 0;
  border-bottom: 1px solid rgba(70, 163, 88, 0.20);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.order-header__top-text {
  color: #727272;
  font-size: 14px;
  font-weight: 400;
}

.order-header__bottom-text {
  color: #727272;
  font-size: 15px;
  font-weight: 700;
}

.body-header {
  text-align: start;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.20);
}

.body-header__titles {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
}

.body-header__title {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
}

.title_qty {
  text-align: center;
}

.title_subtotal {
  text-align: right;
}

.order-header-column:not(:last-child) {
  border-right: 1px solid rgba(70, 163, 88, 0.20);
}

.order-body {
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.20);
}

.shiping-section,
.total-section {
  display: flex;
  justify-content: space-between;
}

.shiping-section {
  margin-bottom: 25px;
  padding-top: 20px;
}

.shiping-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.total-text {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 700;
}

.shiping-value {
  color: #3D3D3D;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
}

.total-value {
  color: #46A358;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}

.track-button {
  margin-top: 20px;
  color: #FFF;
  font-size: 16px;
  font-weight: 700;
  border-radius: 5px;
  background: #46A358;
  padding: 15px 18px;
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
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

.block-for-window {
  overflow: scroll;
  position: relative;
  width: 578px;
  height: 90%;
  background: #FFF;
  text-align: center;
  border-bottom: 5px solid #46A358;
}
</style>