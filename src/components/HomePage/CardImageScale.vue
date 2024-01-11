<template>
  <div class="layout-for-forms">
    <div class="block-for-window">
      <button @click.prevent="closeImageScale" class="close-btn"></button>
      <img :src="image" alt="" class="card-image">
    </div>
  </div>
</template>

<script>
export default {
  props: ['image'],
  data() {
    return {

    }
  },
  methods: {
    closeImageScale() {
      this.$emit('closeImageScale')
    }
  }
}
</script>

<style scoped>
.layout-for-forms {
  z-index: 10;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background: rgba(10, 13, 18, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image {
  width: 100%;
  height: 100%;
}



.close-btn {
  position: absolute;
  top: 11px;
  right: 11px;
  width: 18px;
  height: 18px;
  background: url("../../assets/img/loginAndRegister/X.svg") no-repeat;
  background-size: 18px 18px;
  cursor: pointer;
}

.block-for-window {
  position: relative;
  width: 500px;
  background: #FFF;
  text-align: center;
  padding: 40px 0;
  border-bottom: 5px solid #46A358;
  ;
}
</style>