<template>
  <div class="layout-for-forms">
    <div class="block-for-window">
      <button @click.prevent="closeLoginMenu" class="close-btn"></button>
      <div class="block-for-links">
        <button @click="changeShow" class="forms-header__link" :class="{ active: getLoginShow }">Login</button> |
        <button @click="changeShow" class="forms-header__link" :class="{ active: getRegisterShow }">Register</button>
      </div>
      <div class="block-for-forms">
        <login v-if="getLoginShow"></login>
        <register v-if="getRegisterShow"></register>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import { mapMutations, mapGetters } from 'vuex';
export default {
  data() {
    return {
    }
  },
  components: {
    Login, Register,
  },
  methods: {
    ...mapMutations(['changeShow', 'closeLoginMenu']),
  },
  computed: {
    ...mapGetters(['getRegisterShow', 'getLoginShow']),
  },
  mounted() {

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
  background: url("../assets/img/loginAndRegister/X.svg") no-repeat;
  background-size: 18px 18px;
  cursor: pointer;
}

.block-for-window {
  position: relative;
  width: 500px;
  background: #FFF;
  text-align: center;
  padding: 40px 0;
  border-bottom: 10px solid #46A358;
  ;
}

.block-for-links {
  z-index: 5;
  margin-bottom: 15px;
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