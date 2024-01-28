<template>
  <transition name="coupone">
    <div class="coupone-component">
      <div class="coupone-apply-section">
        <input :class="{ error: isErrorCoupone }" v-model="coupone" placeholder="Enter coupon code here..." type="text"
          class="coupone-input">
        <button @click.prevent="checkCoupone" class="check-coupone">Apply</button>
      </div>
      <span v-if="isErrorCoupone" class="error-text">Invalid coupone...</span>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      coupone: '',
      sale: 0,
      coupones: {},
      isErrorCoupone: false,
    }
  },
  methods: {
    async checkCoupone() {
      this.isErrorCoupone = false;
      if (!this.coupone.length) {
        this.isErrorCoupone = true;
        this.coupone = '';
        return;
      }
      await this.$store.dispatch('getCoupones');
      this.coupones = this.$store.getters.getCoupones;
      if (!this.coupones[this.coupone.toUpperCase()]) {
        this.isErrorCoupone = true;
        this.coupone = '';
        return;
      }
      this.sale = this.coupones[this.coupone.toUpperCase()];
      this.$emit('setSale', this.sale);
    }
  }
}
</script>

<style scoped>
.coupone-component {
  display: flex;
  flex-direction: column;
  align-items: end;
  margin-bottom: 30px;
}

.coupone-apply-section {
  justify-content: end;
  display: flex;
  margin-bottom: 10px;
}

.coupone-enter-active {
  transition: all 0.5s ease-in-out;
}

.coupone-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.coupone-enter-from,
.coupone-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

.error-text {
  font-size: 12px;
  color: red;
  margin-bottom: 10px;
}

.coupone-input {
  width: 230px;
  border-radius: 3px 0 0 3px;
  border: 1px solid #46A358;
  padding: 12px 0 12px 10px;
}

.error {
  border: 1px solid red;
}

.coupone-input::placeholder {
  color: #A5A5A5;
  font-size: 14px;
  font-weight: 400;
}

.coupone-input:focus {
  outline: none;
}

.check-coupone {
  color: #FFF;
  font-size: 15px;
  font-weight: 700;
  padding: 12px 25px 12px 35px;
  border-radius: 0px 3px 3px 0px;
  background: #46A358;
}
</style>