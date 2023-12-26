<template>
  <div class="center">
    <div class="block" v-if="isSubmit">
      <p class="reseting">We are sending link on your email</p>
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <form v-else @submit.prevent="forgotPasswordSubmit">
      <h3 class="title">Reset your password</h3>
      <label for="email">Email address</label>
      <input :class="{ error: isFormCorrect }" placeholder="Input your email adress" v-model="email" type="text" name=""
        id="">
      <span v-if="isFormCorrect" class="error-text">Error email</span>
      <button type="submit">Reset password</button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import axios from 'axios';
import successTost from '@/toasts-plugins/success.tost';
import errorTost from '@/toasts-plugins/error.tost';
export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      isSubmit: false,
      email: '',
    }
  },
  methods: {
    async forgotPasswordSubmit() {
      const isformCorrect = await this.v$.$validate();
      if (!isformCorrect) {
        this.v$.$touch();
        return;
      }
      this.isSubmit = true;
      //TODO:Made forgot-password method with Strapi
      axios
        .post('http://localhost:1337/api/auth/forgot-password', {
          email: this.email, // user's email
          url:
            'http:/localhost:1337/admin/plugins/users-permissions/auth/reset-password',
        })
        .then(response => {
          console.log('Your user received an email');
          successTost('Check your email');
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
          errorTost('Error');
        });
    }
  },
  computed: {
    isFormCorrect() {
      return this.v$.email.$dirty && this.v$.email.required.$invalid || this.v$.email.$dirty && this.v$.email.email.$invalid;
    }
  },
  validations() {
    return {
      email: { required, email },
    }
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
}

.error {
  outline: 1px solid red;
}

.error-text {
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
}

.title {
  margin-bottom: 10px;
  font-size: 28px;
  font-weight: 700;
  color: #3D3D3D;
  margin-bottom: 20px;
}

form {
  padding: 40px 70px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.reseting {
  font-size: 28px;
  font-weight: 700;
  color: #3D3D3D;
  margin-bottom: 20px;
}

.block {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
  line-height: 15px;
  margin-bottom: 15px;
}

input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  padding: 8px 0 8px 10px;
  width: 250px;
  margin-bottom: 10px;
}

button {
  border-radius: 3px;
  background: #46A358;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  cursor: pointer;
  width: 150px;
}

input:focus {
  outline: 1px solid #46A358;
}
</style>