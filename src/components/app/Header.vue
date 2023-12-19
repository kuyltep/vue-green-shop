<template>
  <header class="header">
    <img src="../../assets/img/header/Logo.svg" alt="Logo" class="header__logo">
    <ul class="header__menu">
      <li class="header__menu-item"><router-link class="header__menu-link" to="/home">Home</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/shop">Shop</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/plant-care">Plant Care</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/blogs">Blogs</router-link></li>
    </ul>
    <div class="header__right-menu">
      <img src="../../assets/img/header/Search.svg" alt="" class="header__search">
      <img src="../../assets/img/header/Chunk.svg" alt="" class="header__chunk">
      <router-link class="header__login-link" to="/login">Login</router-link>
    </div>
  </header>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: minmax(210px, 33%);
  padding-top: 26px;
  padding-bottom: 18px;
  border-bottom: 3px solid rgba(70, 163, 88, 0.50);
}

.header__logo {
  grid-column: 1/2;
  width: 150px;
  height: 34.3px;
  vertical-align: middle;
}

.header__menu {
  grid-column: 2/3;
  list-style: none;
  display: flex;
  align-items: center;
}

.header__menu-link {
  text-decoration: none;
  font-size: 16px;
  color: #3D3D3D;
}

.header__menu-item {
  display: inline-block;
  margin-right: 50px;
}

.header__menu-item:last-child {
  margin-right: 0;
}

.header__right-menu {
  grid-column: 3/4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.header__search {
  margin-right: 30px;
}

.header__chunk {
  margin-right: 35px;
}

.header__login-link {
  color: #FFF;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  background: #46A358;
  padding: 8px 17px 7px 17px;
  text-decoration: none;
}

.header__login-link::before {
  content: url(../../assets/img/header/Logout.svg);
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
}
</style>