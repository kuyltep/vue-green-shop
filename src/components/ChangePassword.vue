<template>
  <h4 class="details-title">Change password</h4>
  <form @submit.prevent="changePasswordSubmit" class="change-password">
    <div class="grid-wrapper">
      <div class="current-div input-block">
        <label class="label-for-input" for="current">Current password</label>
        <input :class="{ error: currentValidation }" v-model="currentPassword" class="personal-input" type="text"
          name="current" id="current">
        <span v-if="currentValidation" class="error-text">Invalid password</span>
      </div>
      <div class="new-div input-block">
        <label class="label-for-input" for="new">New password</label>
        <input :class="{ error: newValidation }" v-model="newPassword" class="personal-input" type="text" name="new"
          id="new">
        <span v-if="newValidation" class="error-text">Invalid password</span>
      </div>
      <div class="confirm-div input-block">
        <label class="label-for-input" for="confirm">Confirm new password</label>
        <input :class="{ error: confirmValidation }" v-model="confirmNewPassword" class="personal-input" type="text"
          name="confirm" id="confirm">
        <span v-if="confirmValidation" class="error-text">Invalid password</span>
      </div>
      <button type="submit" class="save-change-btn">Save change</button>
    </div>
  </form>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'
export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      //Password
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }
  },
  methods: {
    async changePasswordSubmit() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) {
        this.v$.$touch();
        return;
      }

    }
  },
  computed: {
    //User password
    currentValidation() {
      return this.v$.currentPassword.$dirty && this.v$.currentPassword.required.$invalid || this.v$.currentPassword.$dirty && this.v$.currentPassword.minLength.$invalid;
    },
    newValidation() {
      return this.v$.newPassword.$dirty && this.v$.newPassword.required.$invalid || this.v$.newPassword.$dirty && this.v$.newPassword.minLength.$invalid;
    },
    confirmValidation() {
      return this.v$.confirmNewPassword.$dirty && this.v$.confirmNewPassword.required.$invalid || this.v$.confirmNewPassword.$dirty && this.v$.confirmNewPassword.minLength.$invalid || this.v$.newPassword.$dirty && this.v$.confirmNewPassword.$dirty && this.newPassword !== this.confirmNewPassword;
    }

  },
  validations() {
    return {
      //User password
      currentPassword: { required, minLength: minLength(6) },
      newPassword: { required, minLength: minLength(6) },
      confirmNewPassword: { required, minLength: minLength(6) }
    }
  }
}
</script>

<style scoped>
.grid-wrapper {
  display: grid;
  grid-template-columns: 50%;
  grid-gap: 30px;
}

.error {
  outline: 1px solid red;
}

.details-title {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}

.error-text {
  font-size: 10px;
  color: red;
  margin-bottom: 10px;
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

.save-change-btn {
  width: 131px;
  border-radius: 3px;
  background: #46A358;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
  padding: 12px 22px;
  cursor: pointer;
}

.personal-input {
  border-radius: 3px;
  border: 1px solid #EAEAEA;
  padding: 8px 0 8px 10px;
}

.personal-input:focus {
  outline: 1px solid #46A358;
}
</style>