<template>
  <form @submit.prevent="submitHandler" action="" class="register-form">
    <p class="register-form__text">Enter your email and password to register.</p>
    <div class="input-field">
      <input :class="{ invalid: isUsernameInvalid }" v-model="userUsername" placeholder="Username" type="text"
        id="register-username" class="register-form__username-input">
      <span v-if="isUsernameInvalid" class="invalid-text">Input your name</span>
    </div>
    <div class="input-field">
      <input :class="{ invalid: isEmailInvalid }" v-model="userEmail" placeholder="Enter yout email adress"
        id="register-email" type="text" class="register-form__email-input">
      <span v-if="isEmailInvalid" class="invalid-text">Input your email</span>
    </div>
    <div class="input-field">
      <input ref="passwordInput" :class="{ invalid: isPasswordInvalid }" v-model="userPassword" placeholder="Password"
        type="password" id="register-password" class="register-form__password-input">
      <span v-if="isPasswordInvalid" class="invalid-text">Input your password</span>
      <a @click.prevent="this.$refs.passwordInput.type = this.$refs.passwordInput.type === 'text' ? 'password' : 'text'"
        class="show-password"></a>
    </div>
    <div class="input-field">
      <input ref="confirmInput" :class="{ invalid: isConfirmPasswordInvalid }" v-model="userConfirmPassword"
        placeholder="Confirm password" type="password" id="register-confirm-password"
        class="register-form__confirm-password-input">
      <span v-if="isConfirmPasswordInvalid" class="invalid-text">Input your correct password</span>
      <a @click.prevent="this.$refs.confirmInput.type = this.$refs.confirmInput.type === 'text' ? 'password' : 'text'"
        class="show-password"></a>
    </div>

    <button class="register-form__btn">Register</button>
  </form>
  <div class="register-with">
    <p class="register-with__text">Or register with</p>
    <a href="http://localhost:1337/api/connect/google" class="register-with__google login-with__btn">Continue with
      Google</a>
    <a href="http://localhost:1337/api/connect/discord" class="register-with__discord login-with__btn">Continue with
      Discord</a>
  </div>
</template>

<script>
import errorToast from '@/toasts-plugins/error.tost';
import successToast from '@/toasts-plugins/success.tost';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      userUsername: '',
      userEmail: '',
      userPassword: '',
      userConfirmPassword: '',
    }
  },
  methods: {
    // async submitHandler() {
    //   const isFormCorrect = await this.v$.$validate();
    //   if (!isFormCorrect) {
    //     this.v$.$touch();
    //     errorToast("Error register");
    //     return;
    //   }
    //   await this.$store.dispatch('registerUser', { userUsername: this.userUsername, userEmail: this.userEmail, userPassword: this.userPassword });
    // },
    async submitHandler() {
      if (!this.isFormCorrect()) {
        errorToast("Error register");
        return;
      }
      await this.$store.dispatch('registerUser', { userUsername: this.userUsername, userEmail: this.userEmail, userPassword: this.userPassword });
    },
    isFormCorrect() {
      return !(this.isUsernameInvalid && this.isEmailInvalid && this.isPasswordInvalid && this.isConfirmPasswordInvalid);
    }
  },
  computed: {
    isUsernameInvalid() {
      const usernameRegExp = /\w{3,}/;
      return !usernameRegExp.test(this.userUsername) && this.userUsername.length;
    },
    isEmailInvalid() {
      const emailRegExp = /\w+@\w+\.[a-z]/;
      return !emailRegExp.test(this.userEmail) && this.userEmail.length;
    },
    isPasswordInvalid() {
      const passwordRegExp = /\w{6,}/;
      return !passwordRegExp.test(this.userPassword) && this.userPassword.length;
    },
    isConfirmPasswordInvalid() {
      return this.userConfirmPassword !== this.userPassword && this.userConfirmPassword.length;
    }
    // isUsernameInvalid() {
    //   return this.v$.userUsername.$dirty && this.v$.userUsername.required.$invalid || this.v$.userUsername.$dirty && this.v$.userUsername.minLength.$invalid;
    // },
    // isEmailInvalid() {
    //   return this.v$.userEmail.$dirty && this.v$.userEmail.required.$invalid || this.v$.userEmail.$dirty && this.v$.userEmail.email.$invalid;
    // },
    // isPasswordInvalid() {
    //   return this.v$.userPassword.$dirty && this.v$.userPassword.required.$invalid || this.v$.userPassword.$dirty && this.v$.userPassword.minLength.$invalid;
    // },
    // isConfirmPasswordInvalid() {
    //   return this.v$.userConfirmPassword.$dirty && this.v$.userConfirmPassword.required.$invalid || this.v$.userConfirmPassword.$dirty && this.v$.userConfirmPassword.minLength.$invalid || this.v$.userConfirmPassword.$dirty && this.userPassword !== this.userConfirmPassword;
    // }
  },
  // validations() {
  //   return {
  //     userUsername: { required, minLength: minLength(3) },
  //     userEmail: { required, email },
  //     userPassword: { required, minLength: minLength(6) },
  //     userConfirmPassword: { required, minLength: minLength(6) },
  //   }
  // }
}
</script>

<style scoped>
.register-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.register-form__text {
  color: #3D3D3D;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  /* 123.077% */
  margin-bottom: 14px;
}

.register-form__email-input,
.register-form__username-input,
.register-form__confirm-password-input,
.register-form__password-input {
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  padding: 12px 0 12px 15px;
  width: 280px;
}

.input-field {
  margin-bottom: 10px;
  position: relative;
}

.show-password {
  position: absolute;
  background: url("../assets/img/loginAndRegister/Hide.svg") center no-repeat;
  width: 20px;
  height: 20px;
  cursor: pointer;
  right: 10px;
  top: 12px;
}

.invalid {
  outline: 1px solid red;
}

.register-form__btn {
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

.register-form__email-input:focus,
.register-form__username-input:focus,
.register-form__confirm-password-input:focus,
.register-form__password-input:focus {
  outline: 1px solid #46A358;
}

.register-with {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-with__text {
  color: #3D3D3D;
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 25px;
}

.register-with__google {
  margin-bottom: 15px;
}

.register-with__google::before {
  content: url("../assets/img/loginAndRegister/google.svg");
  width: 20px;
  height: 20px;
  vertical-align: middle;
  padding-right: 5px;
}

.register-with__discord::before {
  content: url("../assets/img/loginAndRegister/discord.svg");
  width: 20px;
  height: 20px;
  vertical-align: middle;
  padding-right: 5px;
}

.register-with__btn {
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  width: 300px;
  color: #727272;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  padding: 12px 0;
  display: inline-block;
}
</style>