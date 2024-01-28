<template>
  <div class="shipping-adress">
    <h4 class="title_h4">Shipping Address</h4>
    <h5 v-if="!isProfilePage" class="title_h5">Click to address to choose it</h5>
    <transition-group tag="div" name="address" v-if="this.$store.getters.getAddresses.length" class="addresses-block">
      <div @click="addAddress(address.id)" class="address" data-id="{{address.id}}"
        v-for="address in this.$store.getters.getAddresses" :key="address.id">
        <button v-if="isProfilePage" @click.prevent="deleteAddress(address.id)" class="close"></button>
        <div class="name-block">
          <p class="title-text">Name</p>
          <p class="text">{{ address.firstName }}</p>
          <p class="text">{{ address.lastName }}</p>
        </div>
        <div class="country-block">
          <p class="title-text">Country and city</p>
          <p class="text">{{ address.country }}</p>
          <p class="text">{{ address.city }}</p>
        </div>
        <div class="address-block">
          <p class="title-text">Address</p>
          <p class="text">{{ address.state }}</p>
          <p class="text">{{ address.address }}</p>
        </div>
        <div class="contacts-block">
          <p class="title-text">Contacts</p>
          <p class="text">{{ address.email }}</p>
          <p class="text">{{ address.phone }}</p>
        </div>
      </div>
    </transition-group>
    <p v-else class="descr-text">You have not set up this type of address yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // addresses: [],
    }
  },
  props: {
    isProfilePage: {
      type: Boolean,
    }
  },
  methods: {
    deleteAddress(id) {
      this.$store.dispatch('deleteAddress', { id: id })
    },
    addAddress(id) {
      if (this.isProfilePage) {
        return;
      }
      const currentAddress = this.$store.getters.getAddresses.find(item => item.id === id);
      this.$emit('addAddress', currentAddress);
      console.log(currentAddress);
    }
  },

  mounted() {
    this.$store.dispatch('getAddresses');
  }
}
</script>

<style scoped>
.address-enter-active,
.address-leave-active {
  transition: all 1s ease;
}

.address-enter-from,
.address-leave-to {
  opacity: 0;
  transform: translateX(70px);
}

.title_h4 {
  color: #3D3D3D;
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 10px;
}

.title_h5 {
  color: #46A358;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 10px;
}

.descr-text {
  color: #727272;
  font-size: 14px;
  font-weight: 400;
}

.text {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  margin-bottom: 15px;
}

.title-text {
  color: #3D3D3D;
  font-size: 17px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 15px;
}

.address {
  position: relative;
  width: 100%;
  padding: 15px 25px;
  background: #FBFBFB;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin-bottom: 20px;
}

.close {
  position: absolute;
  top: 10px;
  right: 15px;
  cursor: pointer;
  border: none;
  outline: none;
  background: url("../assets/img/loginAndRegister/X.svg") center no-repeat;
  width: 20px;
  height: 20px;
}
</style>