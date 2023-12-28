<template>
  <h4 class="details-title">Personal Information</h4>
  <form @submit.prevent="personalInformationSubmit" class="personal-information__form" enctype="multipart/form-data"
    method="post">
    <div class="personal-information">
      <div class="firstname-div input-block">
        <label class="label-for-input" for="firstname">First Name <span class="required-symbol">*</span></label>
        <input :class="{ error: firstnameValidate }" v-model="firstname" class="personal-input" type="text"
          name="firstname" id="firstname">
        <span class="error-text" v-if="firstnameValidate">Invalid first name</span>
      </div>
      <div class="lastname-div input-block">
        <label class="label-for-input" for="lastname">Last Name <span class="required-symbol">*</span></label>
        <input :class="{ error: lastnameValidate }" v-model="lastname" class="personal-input" type="text" name="lastname"
          id="lastname">
        <span class="error-text" v-if="lastnameValidate">Invalid last name</span>
      </div>
      <div class="email-div input-block">
        <label class="label-for-input" for="email">Email address <span class="required-symbol">*</span></label>
        <input :class="{ error: emailValidate }" v-model="email" class="personal-input" type="text" name="email"
          id="email">
        <span class="error-text" v-if="emailValidate">Invalid email</span>
      </div>
      <div class="phone-div input-block">
        <label class="label-for-input" for="phone">Phone number <span class="required-symbol">*</span></label>
        <input :class="{ error: phoneValidate }" v-model="phone" class="personal-input" type="tel" name="phone"
          id="phone">
        <span class="error-text" v-if="phoneValidate">Invalid phone</span>
      </div>
      <div class="username-div input-block">
        <label class="label-for-input" for="username">Username <span class="required-symbol">*</span> </label>
        <input :class="{ error: usernameValidate }" v-model="username" class="personal-input" type="text" name="username"
          id="username">
        <span class="error-text" v-if="usernameValidate">Invalid username</span>
      </div>
      <div class="photo-div">
        <h4 class="label-for-input">Photo</h4>
        <div class="photo-div-grid">
          <label for="photo">
            <div class="circle-for-image">
              <img src="../assets/img/profile/photo.svg" class="photo-image" alt="">
            </div>
            <input @change="photo = this.$event" class="photo-input" type="file" name="photo" id="photo" accept="image/*">
          </label>
          <button type="submit" class="change-button">Change</button>
          <button @click.prevent="removeForm" class="remove-button">Remove</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';
import successTost from '@/toasts-plugins/success.tost';
import errorTost from '@/toasts-plugins/error.tost';
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, integer } from '@vuelidate/validators';
export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      //Personal information
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      username: '',
      photo: '',
    }
  },
  methods: {
    async personalInformationSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.v$.$touch();
        return;
      }
      axios.put(
        'http://localhost:1337/api/users/' + this.$store.getters.getUser.id,
        {
          username: this.username,
          firstName: this.firstname,
          lastName: this.lastname,
          phoneNumber: this.phone,
          email: this.email,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.getJwt,
          },
        }
      ).then((response => {
        successTost('Data was updated');
        this.$store.dispatch('updateData', {
          userId: this.$store.getters.getUser.id,
        });
      })).catch((error) => {
        errorTost('Error');
        console.log(error);
      });
    },
  },
  computed: {
    //Personal Information
    firstnameValidate() {
      return this.v$.firstname.$dirty && this.v$.firstname.required.$invalid || this.v$.firstname.$dirty && this.v$.firstname.minLength.$invalid;
    },
    lastnameValidate() {
      return this.v$.lastname.$dirty && this.v$.lastname.required.$invalid || this.v$.lastname.$dirty && this.v$.lastname.minLength.$invalid;
    },
    emailValidate() {
      return this.v$.email.$dirty && this.v$.email.required.$invalid || this.v$.email.$dirty && this.v$.email.email.$invalid;
    },
    phoneValidate() {
      return this.v$.phone.$dirty && this.v$.phone.required.$invalid || this.v$.phone.$dirty && this.v$.phone.integer.$invalid;
    },
    usernameValidate() {
      return this.v$.username.$dirty && this.v$.username.required.$invalid || this.v$.username.$dirty && this.v$.username.minLength.$invalid;
    },

  },
  validations() {
    return {
      //Personal Information
      firstname: { required, minLength: minLength(3) },
      lastname: { required, minLength: minLength(3) },
      email: { required, email },
      phone: { required, integer },
      username: { required, minLength: minLength(3) },
    }
  }
}
</script>

<style scoped>
.details-title {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
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

.personal-information {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 60px);
  grid-gap: 30px;
}

.personal-information__form {
  margin-bottom: 40px;
}

.personal-input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  padding: 8px 0 8px 10px;
}

.personal-input:focus {
  outline: 1px solid #46A358;
}

.photo-div-grid {
  display: flex;
}


.photo-input {
  display: none;
}

.circle-for-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #EAEAEA;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.change-button {
  margin-right: 20px;
  margin-left: 25px;
  border-radius: 3px;
  background: #46A358;
  padding: 12px 24px;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.remove-button {
  cursor: pointer;
  color: #3D3D3D;
  font-size: 14px;
  font-weight: 400;
}
</style>