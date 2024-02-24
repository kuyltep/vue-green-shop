<template>
  <div class="checkout-sidebar">
    <div class="sidebar-order">
      <h4 class="title_h4">Your Order</h4>
      <div class="products-section">
        <div class="products-header">
          <p class="products-text">Products</p>
          <p class="total-header-text">Subtotal</p>
        </div>
        <div class="products-body" v-for="item in this.$store.getters.getterUserShoppingCartProducts" :key="item.id">
          <SmallProductCard :productData="item"></SmallProductCard>
        </div>
        <div class="products-total">
          <p class="coupone-text">Have a coupon code?<button @click.prevent="showCuponeComponent = !showCuponeComponent"
              class="coupone-link">Click here</button></p>
          <CouponeApply v-show="showCuponeComponent" @setSale="setSale"></CouponeApply>
          <div class="subtotal-section">
            <p class="subtotal-text">Subtotal</p>
            <p class="subtotal-value">${{ calcSubtotal }}</p>
          </div>
          <div class="discont-section">
            <p class="discont-text">Coupon Discount</p>
            <p class="discont-value">(-{{ sale ? sale + "%" : '' }}) {{ calcDiscount }}</p>
          </div>
          <div class="shiping-section">
            <p class="shiping-text">Shiping</p>
            <p class="shiping-value">{{ shipping }}$</p>
          </div>
          <div class="total-section">
            <p class="total-text">Total</p>
            <p class="total-value">${{ calcTotal }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-payment">
      <h4 class="title_h4">Payment Method</h4>
      <label ref="card" class="payment-method" for="card">
        <input @change="changeActiveElement($event)" value="card" class="method-input" type="radio" name="payment"
          id="card">
        <span class="checkmark"></span>
        <img src="../assets/img/footer/PaySystems.png" class="method method_card" />
      </label>
      <label ref="bank" class="payment-method" for="bank">
        <input @change="changeActiveElement($event)" value="bank" class="method-input" type="radio" name="payment"
          id="bank">
        <span class="checkmark"></span>
        <p class="method method_bank">Dorect bank transfer</p>
      </label>
      <label ref="cash" class="payment-method" for="cash">
        <input @change="changeActiveElement($event)" value="cash" class="method-input" type="radio" name="payment"
          id="cash">
        <span class="checkmark"></span>
        <p class="method method_cash">Cash on delivery</p>
      </label>
      <button :disabled="!canCreateOrder" @click.prevent="showThankYouPage" class="order-button" type="submit">Place
        Order</button>
    </div>
  </div>
</template>

<script>
import CouponeApply from './CouponeApply.vue';
import SmallProductCard from './SmallProductCard.vue';
export default {
  components: {
    SmallProductCard,
    CouponeApply,
  },
  props: {
    deliveryAddress: Object || null,
    canCreateOrder: Boolean,
  },
  data() {
    return {
      activeElement: null,
      showCuponeComponent: false,
      sale: 0,
      discount: 0,
      total: 0,
      subtotal: 0,
      shipping: 16,
      payMethod: '',
    }
  },
  methods: {
    changeActiveElement(event) {
      if (this.activeElement) {
        this.activeElement.classList.remove('active')
      }
      this.activeElement = this.$refs[event.target._value];
      this.activeElement.classList.add('active');
      this.payMethod = this.activeElement.querySelector(".method-input").value;
      console.log(this.payMethod)
    },
    setSale(sale) {
      this.sale = sale;
    },
    showThankYouPage() {
      if (this.payMethod.length > 0 && this.deliveryAddress !== null) {
        this.$emit('changeShowThankYouPage', { total: this.total, shipping: this.shipping, value: true, payMethod: this.payMethod });
      }
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
      this.total = Math.floor(+this.subtotal - +this.discount + +this.shipping).toFixed(2);
      return this.total;
    },
    calcDiscount() {
      if (this.sale) {
        this.discount = (this.subtotal * this.sale / 100).toFixed(2);
        return this.discount;
      }
    }
  }
}
</script>

<style scoped>
.payment-method {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  height: 45px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding-left: 10px;
  position: relative;
}

.order-button {
  margin-top: 35px;
  border-radius: 3px;
  background: #46A358;
  color: #FFF;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 0;
  width: 100%;
}

.active {
  border: 1px solid #46A358;
}

.method-input {
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 15px;
  left: 10px;
  height: 16px;
  width: 16px;
  outline: 1.2px solid #46A358;
  border-radius: 50%;
}

.payment-method .checkmark::after {
  content: "";
  display: none;
  position: absolute;
  top: 3px;
  left: 3px;
  width: 10px;
  height: 10px;
  background-color: #46A358;
  border-radius: 50%;
}

.method-input:hover~.checkmark {
  background-color: #eee;
}

.method-input:checked~.checkmark::after {
  display: block;
}

.method {
  margin-left: 15px;
}

.method_card {
  width: 224px;
  height: 26px;
}

.method_cash {
  color: #3D3D3D;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  /* 106.667% */
}

.method_bank {
  color: #3D3D3D;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  /* 106.667% */
}

.title_h4 {
  color: #3D3D3D;
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 20px;
}

.products-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.50);
}

.products-body {
  margin-bottom: 15px;
}

.products-text {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
}

.total-header-text {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
}



.coupone-text {
  color: #3D3D3D;
  text-align: right;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
}

.coupone-link {
  border: none;
  background: transparent;
  color: #46A358;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.products-total {
  margin-bottom: 50px;
}

.subtotal-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.discont-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.total-section {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

.shiping-section {
  display: flex;
  justify-content: space-between;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(70, 163, 88, 0.50);
}

.subtotal-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.subtotal-value {
  color: #3D3D3D;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
}

.shiping-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.shiping-value {
  color: #3D3D3D;
  text-align: right;
  font-size: 18px;
  font-weight: 500;
}

.discont-text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.discont-value {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.total-text {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 700;
}

.total-value {
  color: #46A358;
  text-align: right;
  font-size: 18px;
  font-weight: 700;
}
</style>