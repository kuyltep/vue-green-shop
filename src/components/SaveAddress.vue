<template>
  <div class="save-address">
    <h4 class="title_h4">Billing Address</h4>
    <p class="descr-text">The following addresses will be used on the checkout page by default.</p>
    <form @submit.prevent="addAdressSubmit" class="add-address__form">
      <div class="firstname-div input-block">
        <label class="label-for-input" for="firstname">First Name <span class="required-symbol">*</span> </label>
        <input :class="{ error: firstnameValidate }" v-model="firstname" class="personal-input" type="text"
          name="firstname" id="firstname">
        <span class="error-text" v-if="firstnameValidate">Invalid first name</span>
      </div>
      <div class="lastname-div input-block">
        <label class="label-for-input" for="lastname">Last Name <span class="required-symbol">*</span> </label>
        <input :class="{ error: lastnameValidate }" v-model="lastname" class="personal-input" type="text" name="lastname"
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
      <button type="submit" class="submit-btn">Save Address</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import successTost from '@/toasts-plugins/success.tost';
import errorTost from '@/toasts-plugins/error.tost';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, integer } from '@vuelidate/validators';
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      firstname: "",
      lastname: "",
      country: "",
      city: "",
      address: "",
      appartment: "",
      state: "",
      zip: "",
      email: "",
      phone: "",
    }
  },
  methods: {
    async addAdressSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        return;
      }
      //TODO: Made request to add new address to Strapi
      axios.post('http://localhost:1337/api/adresses', {
        firstName: this.firstname,
        lastName: this.lastname,
        country: this.country,
        city: this.city,
        address: this.address,
        appartment: this.appartment,
        state: this.state,
        email: this.email,
        phone: this.phone,
        zip: this.zip,
        // users: this.$store.getters.getUser.name,
      },
        {
          headers: {
            Authorization: `Bearer ${this.$store.getters.getJwt}`,
          }
        }).then((response) => {
          console.log(response);
          successTost('Success address add');
        }).catch((error) => {
          console.log(error);
          errorTost('Error address add');
        })
    }
  },
  computed: {
    firstnameValidate() {
      return this.v$.firstname.$dirty && this.v$.firstname.required.$invalid || this.v$.firstname.$dirty && this.v$.firstname.minLength.$invalid;
    },
    lastnameValidate() {
      return this.v$.lastname.$dirty && this.v$.lastname.required.$invalid || this.v$.lastname.$dirty && this.v$.lastname.minLength.$invalid;
    },
    countryValidate() {
      return this.v$.country.$dirty && this.v$.country.required.$invalid || this.v$.country.$dirty && this.v$.country.minLength.$invalid;
    },
    cityValidate() {
      return this.v$.city.$dirty && this.v$.city.required.$invalid || this.v$.city.$dirty && this.v$.city.minLength.$invalid;
    },
    addressValidate() {
      return this.v$.address.$dirty && this.v$.address.required.$invalid || this.v$.address.$dirty && this.v$.address.minLength.$invalid;
    },
    stateValidate() {
      return this.v$.state.$dirty && this.v$.state.required.$invalid || this.v$.state.$dirty && this.v$.state.minLength.$invalid;
    },
    zipValidate() {
      return this.v$.zip.$dirty && this.v$.zip.required.$invalid || this.v$.zip.$dirty && this.zip.length !== 6 || this.v$.zip.$dirty && this.v$.zip.integer.$invalid;
    },
    emailValidate() {
      return this.v$.email.$dirty && this.v$.email.required.$invalid || this.v$.email.$dirty && this.v$.email.email.$invalid;
    },
    phoneValidate() {
      return this.v$.phone.$dirty && this.v$.phone.required.$invalid || this.v$.phone.$dirty && this.v$.phone.integer.$invalid;
    }
  },
  validations() {
    return {
      firstname: { required, minLength: minLength(3) },
      lastname: { required, minLength: minLength(3) },
      country: { required, minLength: minLength(3) },
      city: { required, minLength: minLength(3) },
      address: { required, minLength: minLength(5) },
      state: { required, minLength: minLength(4) },
      zip: { required, integer },
      email: { required, email },
      phone: { required, integer },
    }
  }
}
</script>

<style scoped>
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