<template>
  <form @submit.prevent="submitForm" class="login-form">
    <p class="login-form__text">Enter your username and password to login.</p>
    <div class="input-field">
      <input :class="{ invalid: isEmailInvalid }" v-model="userEmail" placeholder="almamun_uxui@outlook.com" type="text"
        name="" id="login-email" class="login-form__email-input">
      <span v-if="isEmailInvalid" class="invalid-text">Input your email</span>
    </div>
    <div class="input-field">
      <input :class="{ invalid: isPasswordInvalid }" v-model="userPassword" placeholder="123456789" type="password"
        name="" id="login-pas" class="login-form__password-input">
      <span v-if="isPasswordInvalid" class="invalid-text">Input your password</span>
    </div>

    <a href="" class="login-form__forgot-password">Forgot Password?</a>
    <button class="login-form__btn" type="submit">Login</button>
  </form>
  <div class="login-with">
    <p class="login-with__text">Or login with</p>
    <a href="http://localhost:1337/api/connect/google" class="login-with__google login-with__btn">Login
      with
      Google</a>
    <a href="http://localhost:1337/api/connect/discord" class="login-with__discord login-with__btn">Login with
      Discord</a>
  </div>
</template>

<script>
import errorToast from '@/toasts-plugins/error.tost';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      userEmail: "",
      userPassword: "",
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.v$.$touch();
        errorToast("Error login")
        return;
      }
      await this.$store.dispatch('loginUser', { userEmail: this.userEmail, userPassword: this.userPassword });
      setTimeout(() => this.clearInputs(), 0);
    },
    clearInputs() {
      this.userEmail = '';
      this.userPassword = '';
    },
  },
  computed: {
    isEmailInvalid() {
      return this.v$.userEmail.$dirty && this.v$.userEmail.required.$invalid || this.v$.userEmail.$dirty && this.v$.userEmail.email.$invalid;
    },
    isPasswordInvalid() {
      return this.v$.userPassword.$dirty && this.v$.userPassword.required.$invalid || this.v$.userPassword.$dirty && this.v$.userPassword.minLength.$invalid;
    }
  },
  validations() {
    return {
      userEmail: { required, email },
      userPassword: { required, minLength: minLength(6) },
    }
  }
}
</script>

<style>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.login-form__text {
  color: #3D3D3D;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  /* 123.077% */
  margin-bottom: 14px;
}

.invalid {
  outline: 1px solid red;
}

.input-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;

}

.invalid-text {
  color: red;
  font-size: 10px;
}

.login-form__email-input,
.login-form__password-input {
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  padding: 12px 0 12px 15px;
  width: 280px;
}

.login-form__forgot-password {
  text-decoration: none;
  color: #46A358;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 27px;
  /* 114.286% */
}

.login-form__btn {
  border-radius: 5px;
  background: #46A358;
  width: 300px;
  color: #FFF;
  font-size: 16px;
  font-weight: 700;
  padding: 15px 0;
  text-align: center;
  cursor: pointer;
}

.login-form__email-input:focus,
.login-form__password-input:focus {
  outline: 1px solid #46A358;
}

.login-with {
  display: flex;
  flex-direction: column;
  align-items: center;
}


.login-with__text {
  color: #3D3D3D;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 25px;
}

.login-with__google {
  margin-bottom: 15px;

}

.login-with__google::before {
  content: url("../assets/img/loginAndRegister/google.svg");
  width: 20px;
  height: 20px;
  vertical-align: middle;
  padding-right: 5px;
}

.login-with__discord::before {
  content: url("../assets/img/loginAndRegister/discord.svg");
  width: 20px;
  height: 20px;
  vertical-align: middle;
  padding-right: 5px;
}

.login-with__btn {
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  width: 300px;
  color: #727272;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  padding: 12px 0;
  text-decoration: none;
  display: inline-block;
}
</style>