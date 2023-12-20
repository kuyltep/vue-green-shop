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
h1,
h2,
h3,
h4,
html {
  margin: 0;
  padding: 0;
}

button {
  border: none;
  outline: none;
  background: none;
}

html {
  height: 100%;
}

body {
  min-height: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto minmax(500px, 1fr) auto;
}
</style>
