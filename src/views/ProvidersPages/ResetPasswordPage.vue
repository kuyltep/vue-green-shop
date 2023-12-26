<template>
  <div class="center">
    <div class="block" v-if="isSubmit">
      <p class="reseting">Redirecting</p>
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <form v-else @submit.prevent="resetPasswordSubmit">
      <h3 class="title">Reset your password</h3>
      <label for="new">New password</label>
      <input :class="{ error: newValidation }" placeholder="Input new password" v-model="newPassword" type="password"
        name="new" id="new">
      <span v-if="newValidation" class="error-text">Error password</span>
      <label for="confirm">Confirm password</label>
      <input :class="{ error: confirmValidation }" placeholder="Input new password" v-model="confirmPassword"
        type="password" name="confirm" id="confirm">
      <span v-if="confirmValidation" class="error-text">Error confirm</span>
      <button type="submit">Reset password</button>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
import axios from 'axios';
import successTost from '@/toasts-plugins/success.tost';
import errorTost from '@/toasts-plugins/error.tost';
export default {
  setup() {
    return { v$: useVuelidate(), }
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
    }
  },
  methods: {
    async resetPasswordSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.v$.$touch();
        return;
      }

      //TODO:Made reset-password method with Strapi
      axios
        .post('http://localhost:1337/api/auth/reset-password', {
          code: 'privateCode', // code contained in the reset link of step 3.
          password: this.newPassword,
          passwordConfirmation: this.confirmPassword,
        })
        .then(response => {
          console.log("Your user's password has been reset.");
        })
        .catch(error => {
          console.log('An error occurred:', error.response);
        });
    }
  },
  computed: {
    newValidation() {
      return this.v$.newPassword.$dirty && this.v$.newPassword.required.$invalid || this.v$.newPassword.$dirty && this.v$.newPassword.minLength.$invalid;
    },
    confirmValidation() {
      return this.v$.confirmPassword.$dirty && this.v$.confirmPassword.required.$invalid || this.v$.confirmPassword.$dirty && this.v$.confirmPassword.minLength.$invalid || this.v$.newPassword.$dirty && this.v$.confirmPassword.$dirty && this.newPassword !== this.confirmPassword;
    }
  },
  validations() {
    return {
      newPassword: { required, minLength: minLength(6) },
      confirmPassword: { required, minLength: minLength(6) },
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