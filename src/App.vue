<template>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>
<style>
@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Bold.woff');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Medium.woff');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Regular.woff');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'CeraPro';
  src: url('./fonts/CeraPro-Thin.woff');
  font-weight: 300;
  font-style: normal;
}

* {
  font-family: 'CeraPro';
  font-weight: 400;
}

ul,
li,
p,
a,
img,
html {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
