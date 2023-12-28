<template>
  <header class="header">
    <router-link :style="{ background: this.logoBackground }" alt="Logo" class="header__logo" to="/"></router-link>
    <ul class="header__menu">
      <!-- TODO: Make a router-links for this items -->
      <li class="header__menu-item"><router-link class="header__menu-link" to="/">Home</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/shop">Shop</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/plant-care">Plant Care</router-link></li>
      <li class="header__menu-item"><router-link class="header__menu-link" to="/blogs">Blogs</router-link></li>
    </ul>
    <div class="header__right-menu">
      <div class="search__block">
        <!-- <input placeholder="Search..." type="text" class="search__input"> -->
        <button :style="{ background: this.searchBackground }" alt="" class="header__search"></button>
      </div>
      <router-link :style="{ background: this.chunkBackground }" alt="" class="header__chunk" to="/chunk"></router-link>
      <button v-if="!this.$store.getters.getJwt" @click.prevent="showLoginMenu" class="header__login-link">Login</button>
      <!-- TODO: Make a router-link for profile page -->
      <router-link v-else to="/profile/details" class="header__profile-link">Profile</router-link>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      images: {},
      searchBackground: "",
      logoBackground: "",
      chunkBackground: "",
      logoutBackground: "",
      profileBackground: "",
    }
  },
  methods: {
    ...mapMutations(['showLoginMenu'])
  },
  created() {
    axios.get('http://localhost:1337/api/icons?populate=*').then((response) => {
      return response.data.data;
    }).then((data) => {
      data.forEach(item => {
        const name = item.attributes.name;
        const image = item.attributes.icon.data.attributes.url;
        this.images[name] = 'http://localhost:1337' + image;
      })
      this.searchBackground = `url(${this.images.search}) no-repeat`;
      this.logoBackground = `url(${this.images.logo}) no-repeat`;
      this.chunkBackground = `url(${this.images.chunk}) no-repeat`;
      this.logoutBackground = `url(${this.images.logout})`;
      this.profileBackground = `url(${this.images.user})`;
      //TODO: Delete this console.log()
      console.log(this.images);
    }).catch((err) => {
      console.log(err);
    })
  }
}
</script>

<style scoped>
.header {
  padding: 0 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 18px;
  padding-bottom: 18px;
  border-bottom: 0.3px solid rgba(70, 163, 88, 0.50);
}

.header__logo {
  grid-column: 1/2;
  vertical-align: middle;
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

.header__profile-link {
  color: #FFF;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  background: #46A358;
  padding: 8px 17px 7px 17px;
  text-decoration: none;
  cursor: pointer;
}

.header__profile-link::before {
  content: url("../../assets/img/header/User.svg");
  width: 20px;
  height: 20px;
  margin-right: 4px;
  vertical-align: middle;
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