<template>
  <header class="header">
    <router-link alt="Logo" class="header__logo" to="/"></router-link>
    <ul class="header__menu">
      <li class="header__menu-item"><router-link class="header__menu-link" to="/">Home</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/shop">Shop</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/plant-care">Plant Care</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/blogs">Blogs</router-link></li>
    </ul>
    <div class="header__right-menu">
      <div class="search__block">
        <!-- <input placeholder="Search..." type="text" class="search__input"> -->
        <button alt="" class="header__search"></button>
      </div>
      <router-link alt="" class="header__chunk" to="/chunk"></router-link>
      <button @click.prevent="showLoginMenu" class="header__login-link">Login</button>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(['showLoginMenu'])
  }
}
</script>

<style scoped>
.header {
  padding: 0 10px;
  display: grid;
  grid-template-columns: minmax(210px, 33%);
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 0.3px solid rgba(70, 163, 88, 0.50);
}

.header__logo {
  grid-column: 1/2;
  vertical-align: middle;
  background: url('../../assets/img/header/Logo.svg') no-repeat;
  background-size: 150px 34.3px;
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

.search__block {
  align-items: center;
}

.header__search {
  margin-right: 30px;
  width: 20px;
  height: 20px;
  background: url("../../assets/img/header/Search.svg") no-repeat;
  border: none;
  outline: none;
}

.search__input {
  border-radius: 10px;
  background: #F8F8F8;
  padding: 5px 0px 5px 10px;
  margin-right: 7px;
}

.header__search:hover {
  cursor: pointer;
}

.header__chunk {
  margin-right: 35px;
  background: url("../../assets/img/header/Chunk.svg") no-repeat;
  width: 25px;
  height: 25px;
}

.header__login-link {
  color: #FFF;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  background: #46A358;
  padding: 8px 17px 7px 17px;
  text-decoration: none;
  cursor: pointer;
}

.header__login-link::before {
  content: url(../../assets/img/header/Logout.svg);
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
}

li .router-link-active {
  padding-bottom: 25px;
  font-weight: 700;
  border-bottom: 3px solid #46A358;
}
</style>