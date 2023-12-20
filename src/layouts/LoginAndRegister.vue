<template>
  <div class="layout-for-forms">
    <div class="block-for-window">
      <button class="close-btn"></button>
      <div class="block-for-links">
        <button class="forms-header__link" :class="{ active: isLoginOpen }">Login</button> |
        <button class="forms-header__link" :class="{ active: isRegisterOpen }">Register</button>
      </div>
      <div class="block-for-forms">
        <login v-if="isLoginOpen"></login>
        <register v-if="isRegisterOpen"></register>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
export default {
  data() {
    return {
      isLoginOpen: true,
      isRegisterOpen: false,
    }
  },
  components: {
    Login, Register,
  }
}
</script>

<style scoped>
.layout-for-forms {
  position: absolute;
  z-index: 4;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(10, 13, 18, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 11px;
  right: 11px;
  width: 18px;
  height: 18px;
  background: url("../assets/img/header/X.svg") no-repeat;
  background-size: 18px 18px;
  cursor: pointer;
}

.block-for-window {
  position: relative;
  width: 500px;
  background: #FFF;
  padding: 50px 100px 60px 100px;
  text-align: center;
}

.block-for-links {
  z-index: 5;
  margin-bottom: 53px;
}

.active {
  color: #46A358;
  font-size: 20px;
  font-weight: 500;
  line-height: 16px;
  /* 80% */
}

.forms-header__link {
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  line-height: 16px;
  /* 80% */
}

.block-for-forms {
  z-index: 2;
}
</style>