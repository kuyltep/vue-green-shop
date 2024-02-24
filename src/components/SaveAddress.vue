<template>
  <div class="save-address">
    <h4 class="title_h4">Billing Address</h4>
    <p v-if="isProfilePage" class="descr-text">The following addresses will be used on the checkout page by default.</p>
    <form @submit.prevent="addAdressSubmit" class="add-address__form">
      <div class="firstname-div input-block">
        <label class="label-for-input" for="firstname">First Name <span class="required-symbol">*</span> </label>
        <input :class="{ error: firstnameValidate }" v-model="firstName" class="personal-input" type="text"
          name="firstname" id="firstname">
        <span class="error-text" v-if="firstnameValidate">Invalid first name</span>
      </div>
      <div class="lastname-div input-block">
        <label class="label-for-input" for="lastname">Last Name <span class="required-symbol">*</span> </label>
        <input :class="{ error: lastnameValidate }" v-model="lastName" class="personal-input" type="text" name="lastname"
          id="lastname">
        <span class="error-text" v-if="lastnameValidate">Invalid lastname</span>
      </div>
      <div class="country-div input-block">
        <label class="label-for-input" for="country">Country / Region <span class="required-symbol">*</span> </label>
        <input :class="{ error: countryValidate }" v-model="country" class="personal-input" type="text" name="country"
          id="country">
        <span class="error-text" v-if="countryValidate">Invalid county</span>
      </div>
      <div class="city-div input-block">
        <label class="label-for-input" for="city">City / Town <span class="required-symbol">*</span> </label>
        <input :class="{ error: cityValidate }" v-model="city" class="personal-input" type="text" name="city" id="city">
        <span class="error-text" v-if="cityValidate">Invalid city / town</span>
      </div>
      <div class="address-div input-block">
        <label class="label-for-input" for="address">Street Address <span class="required-symbol">*</span> </label>
        <input :class="{ error: addressValidate }" v-model="address" class="personal-input" type="text" name="address"
          id="address">
        <span class="error-text" v-if="addressValidate">Invalid address</span>
      </div>
      <div class="appartment-div input-block">
        <label class="label-for-input" for="appartment">Appartment</label>
        <input v-model="appartment" class="personal-input" type="text" name="appartment" id="appartment">
      </div>
      <div class="state-div input-block">
        <label class="label-for-input" for="state">State <span class="required-symbol">*</span> </label>
        <input :class="{ error: stateValidate }" v-model="state" class="personal-input" type="text" name="state"
          id="state">
        <span class="error-text" v-if="stateValidate">Invalid state</span>
      </div>
      <div class="zip-div input-block">
        <label class="label-for-input" for="zip">Zip <span class="required-symbol">*</span> </label>
        <input :class="{ error: zipValidate }" v-model="zip" class="personal-input" type="text" name="zip" id="zip">
        <span class="error-text" v-if="zipValidate">Invalid zip</span>
      </div>
      <div class="email-div input-block">
        <label class="label-for-input" for="email">Email address <span class="required-symbol">*</span> </label>
        <input :class="{ error: emailValidate }" v-model="email" class="personal-input" type="text" name="email"
          id="email">
        <span class="error-text" v-if="emailValidate">Invalid email</span>
      </div>
      <div class="phone-div input-block">
        <label class="label-for-input" for="phone">Phone Number <span class="required-symbol">*</span> </label>
        <input :class="{ error: phoneValidate }" v-model="phone" class="personal-input" type="tel" name="phone"
          id="phone">
        <span class="error-text" v-if="phoneValidate">Invalid phone</span>
      </div>
      <div v-if="!isProfilePage" class="order-description">
        <label for="descr" class="descr-title">Order description (optionaly)</label>
        <textarea v-model="orderDescription" class="order-textarea" name="descr" id="" cols="30" rows="10"></textarea>
      </div>
      <button v-if="isProfilePage" type="submit" class="submit-btn">Save Address</button>
    </form>
  </div>
</template>

<script>

import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, integer } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  props: {
    isProfilePage: {
      type: Boolean,
    },
    deliveryAddress: {
      type: Object,
    }
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      address: "",
      appartment: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
      orderDescription: '',
    }
  },
  methods: {
    // async addAdressSubmit() {
    //   const isFormCorrect = await this.v$.$validate();
    //   if (!isFormCorrect) {
    //     return;
    //   }
    //   //TODO: Made request to add new address to Strapi
    //   this.$store.dispatch('saveAddress', {
    //     firstName: this.firstname,
    //     lastName: this.lastname,
    //     country: this.country,
    //     city: this.city,
    //     address: this.address,
    //     state: this.state,
    //     email: this.email,
    //     phone: this.phone,
    //     appartment: this.appartment,
    //     zip: this.zip,
    //   })
    // }
    async addAdressSubmit() {
      if (!this.isFormCorrect()) {
        return;
      }
      //TODO: Made request to add new address to Strapi
      this.$store.dispatch('saveAddress', {
        firstName: this.firstName,
        lastName: this.lastMame,
        country: this.country,
        city: this.city,
        address: this.address,
        state: this.state,
        email: this.email,
        phone: this.phone,
        appartment: this.appartment,
        zip: this.zip,
      })
    },
    isFormCorrect() {
      return !(this.firstnameValidate && this.lastnameValidate && this.countryValidate && this.cityValidate && this.addressValidate && this.stateValidate && this.zipValidate && this.emailValidate && this.phoneValidate);
    },
    isFormReadyToSend() {
      if (this.zipValidate && this.emailValidate && this.phoneValidate && this.addressValidate && this.stateValidate && this.addressValidate && this.cityValidate && this.countryValidate && this.firstnameValidate && this.lastnameValidate) {
        const addressData = {
          firstName: this.firstName,
          lastName: this.lastName,
          country: this.country,
          city: this.city,
          state: this.state,
          zip: this.zip,
          email: this.email,
          phone: this.phone,
        };
        this.$emit("sendAddressData", addressData);
      }
    }
  },
  computed: {
    firstnameValidate() {
      const firstnameRegExp = /^[а-яА-ЯёЁa-zA-Z]{3,}$/;
      return !firstnameRegExp.test(this.firstname) && this.firstName.length;
    },
    lastnameValidate() {
      const lastnameRegExp = /^[а-яА-ЯёЁa-zA-Z]{3,}$/;
      return !lastnameRegExp.test(this.lastname) && this.lastName.length;
    },
    countryValidate() {
      const countryRegExp = /^[а-яА-ЯёЁa-zA-Z]{3,}$/;
      return !countryRegExp.test(this.country) && this.country.length;
    },
    cityValidate() {
      const cityRegExp = /^[а-яА-ЯёЁa-zA-Z]{3,}$/;
      return !cityRegExp.test(this.city) && this.city.length;
    },
    addressValidate() {
      const addressRegExp = /^[а-яА-ЯёЁa-zA-Z]{3,}$/;
      return !addressRegExp.test(this.address) && this.address.length;
    },
    stateValidate() {
      const stateRegExp = /^[а-яА-ЯёЁa-zA-Z]{3,}$/;
      return !stateRegExp.test(this.state) && this.state.length;
    },
    zipValidate() {
      const zipRegExp = /^\d{6}$/;
      return !zipRegExp.test(this.zip) && this.zip.length;
    },
    emailValidate() {
      const emailRegExp = /\w+@\w+\.[a-zA-Z]+$/;
      return !emailRegExp.test(this.email) && this.email.length;
    },
    phoneValidate() {
      const phoneRegExp = /^\d{5,}$/;
      return !phoneRegExp.test(this.phone) && this.phone.length;
    },

    // firstnameValidate() {
    //   return this.v$.firstname.$dirty && this.v$.firstname.required.$invalid || this.v$.firstname.$dirty && this.v$.firstname.minLength.$invalid;
    // },
    // lastnameValidate() {
    //   return this.v$.lastname.$dirty && this.v$.lastname.required.$invalid || this.v$.lastname.$dirty && this.v$.lastname.minLength.$invalid;
    // },
    // countryValidate() {
    //   return this.v$.country.$dirty && this.v$.country.required.$invalid || this.v$.country.$dirty && this.v$.country.minLength.$invalid;
    // },
    // cityValidate() {
    //   return this.v$.city.$dirty && this.v$.city.required.$invalid || this.v$.city.$dirty && this.v$.city.minLength.$invalid;
    // },
    // addressValidate() {
    //   return this.v$.address.$dirty && this.v$.address.required.$invalid || this.v$.address.$dirty && this.v$.address.minLength.$invalid;
    // },
    // stateValidate() {
    //   return this.v$.state.$dirty && this.v$.state.required.$invalid || this.v$.state.$dirty && this.v$.state.minLength.$invalid;
    // },
    // zipValidate() {
    //   return this.v$.zip.$dirty && this.v$.zip.required.$invalid || this.v$.zip.$dirty && this.zip.length !== 6 || this.v$.zip.$dirty && this.v$.zip.integer.$invalid;
    // },
    // emailValidate() {
    //   return this.v$.email.$dirty && this.v$.email.required.$invalid || this.v$.email.$dirty && this.v$.email.email.$invalid;
    // },
    // phoneValidate() {
    //   return this.v$.phone.$dirty && this.v$.phone.required.$invalid || this.v$.phone.$dirty && this.v$.phone.integer.$invalid;
    // }
  },
  // validations() {
  //   return {
  //     firstname: { required, minLength: minLength(3) },
  //     lastname: { required, minLength: minLength(3) },
  //     country: { required, minLength: minLength(3) },
  //     city: { required, minLength: minLength(3) },
  //     address: { required, minLength: minLength(5) },
  //     state: { required, minLength: minLength(4) },
  //     zip: { required, integer },
  //     email: { required, email },
  //     phone: { required, integer },
  //   }
  // }
  watch: {
    deliveryAddress() {
      this.firstName = this.deliveryAddress.firstName || '';
      this.lastName = this.deliveryAddress.lastName || '';
      this.country = this.deliveryAddress.country || '';
      this.city = this.deliveryAddress.city || '';
      this.address = this.deliveryAddress.address || '';
      this.state = this.deliveryAddress.state || '';
      this.email = this.deliveryAddress.email || '';
      this.phone = this.deliveryAddress.phone || '';
      this.appartment = this.deliveryAddress.appartment || '';
      this.zip = this.deliveryAddress.zip || '';
    },
    orderDescription() {
      this.$emit('changeOrderDescription', this.orderDescription);
    }
  }
}
</script>

<style scoped>
.order-textarea {
  width: 100%;
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  padding: 5px-;
  resize: none;
  margin-top: 10px;
}

.order-textarea:focus {
  outline: 1px solid #46A358;
}

.descr-title {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
}

.save-address {
  margin-bottom: 65px;
}

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
  margin-bottom: 30px;
}

.error {
  outline: 1px solid red;
}

.error-text {
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
}

.required-symbol {
  color: #F03800;
  font-size: 22px;
  font-weight: 400;
}

.input-block {
  display: flex;
  flex-direction: column;
}

.label-for-input {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  margin-bottom: 10px;
}

.personal-input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  padding: 8px 0 8px 10px;
}

.personal-input:focus {
  outline: 1px solid #46A358;
}

.add-address__form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 60px);
  grid-gap: 30px;
}

.submit-btn {
  width: 140px;
  border-radius: 3px;
  background: #46A358;
  padding: 12px 24px;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>