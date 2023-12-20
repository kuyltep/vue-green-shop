<template>
  <form action="" class="register-form">
    <p class="register-form__text">Enter your email and password to register.</p>
    <input placeholder="Username" type="text" id="register-username" class="register-form__username-input">
    <input placeholder="Enter yout email adress" id="register-email" type="text" class="register-form__email-input">
    <input placeholder="Password" type="password" id="register-password" class="register-form__password-input">
    <input placeholder="Confirm password" type="password" id="register-confirm-password"
      class="register-form__confirm-password-input">
    <button class="register-form__btn">Register</button>
  </form>
  <div class="register-with">
    <p class="register-with__text">Or register with</p>
    <button class="register-with__google login-with__btn">Continue with Google</button>
    <button class="register-with__facebook login-with__btn">Continue with Facebook</button>
  </div>
</template>

<script>
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
  validations() {
    return {
      userUsername: { required, minLength: minLength(3) },
      userEmail: { required, email },
      userPassword: { required, minLength: minLength(6) },
      userConfirmPassword: { required, minLength: minLength(6) },
    }
  }
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
  margin-bottom: 10px;
}

.register-form__forgot-password {
  text-decoration: none;
  color: #46A358;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  margin-bottom: 27px;
  /* 114.286% */
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

.register-with__facebook::before {
  content: url("../assets/img/loginAndRegister/facebook.svg");
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
}
</style>