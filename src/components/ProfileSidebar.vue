<template>
  <div class="sidebar">
    <h4 class="title_h4">My Account</h4>
    <!-- <ul class="sidebar__links">
      <li class="sidebar__links-item profile-details">
        <router-link to="/profile/details">Account Details</router-link>
      </li>
      <li class="sidebar__links-item profile-address">
        <router-link to="/profile/address">Address</router-link>
      </li>
      <li class="sidebar__links-item profile-orders">
        <router-link to="/profile/orders">Orders</router-link>
      </li>
      <li class="sidebar__links-item profile-wishlist">
        <router-link to="/profile/wishlist">Wishlist</router-link>
      </li>
      <li class="sidebar__links-item profile-reports">
        <router-link to="/profile/reports">Reports</router-link>
      </li>
      <li class="sidebar__links-item profile-downloads">
        <router-link to="/profile/downloads">Downloads</router-link>
      </li>
      <li class="sidebar__links-item profile-support">
        <router-link to="/profile/support">Support</router-link>
      </li>
    </ul> -->
    <div class="sidebar__links">
      <router-link class="sidebar__links-item profile-details" to="/profile/details">Account Details</router-link>
      <router-link class="sidebar__links-item profile-address" to="/profile/address">Address</router-link>
      <router-link class="sidebar__links-item profile-orders" to="/profile/orders">Orders</router-link>
      <router-link class="sidebar__links-item profile-wishlist" to="/profile/wishlist">Wishlist</router-link>
      <router-link class="sidebar__links-item profile-reports" to="/profile/reports">Reports</router-link>
      <router-link class="sidebar__links-item profile-downloads" to="/profile/downloads">Downloads</router-link>
      <router-link class="sidebar__links-item profile-support" to="/profile/support">Support</router-link>

    </div>
    <div class="profile-logout">
      <button @click.prevent="logout" class="logout-btn">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logoutUser');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.sidebar {
  background: #FBFBFB;
  padding: 20px 0 0 0;
  height: 430px;
}

.title_h4 {
  color: #3D3D3D;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 18px;
  padding-left: 20px;
}

.sidebar__links {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.sidebar__links-item {
  padding: 10px 0 10px 20px;
}

a {
  text-decoration: none;
  font-size: 15px;
  color: #3D3D3D;
}

.router-link-active {
  color: #46A358;
  font-size: 15px;
  font-weight: 700;
  /* line-height: 45px; */
  border-left: 5px solid #46A358;
}

.profile-details::before {
  content: url("data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M9 2.65385C7.61038 2.65385 6.48387 3.77313 6.48387 5.15385C6.48387 6.53456 7.61038 7.65385 9 7.65385C10.3896 7.65385 11.5161 6.53456 11.5161 5.15385C11.5161 3.77313 10.3896 2.65385 9 2.65385ZM5.32258 5.15385C5.32258 3.13588 6.96902 1.5 9 1.5C11.031 1.5 12.6774 3.13588 12.6774 5.15385C12.6774 7.17181 11.031 8.80769 9 8.80769C6.96902 8.80769 5.32258 7.17181 5.32258 5.15385Z' fill='%23727272'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M7.09963 11.5C5.47683 11.5 4.16129 12.8071 4.16129 14.4195C4.16129 14.5042 4.17686 14.5639 4.19319 14.5987C4.20697 14.6281 4.21879 14.6365 4.22865 14.6418C4.67991 14.8858 5.94511 15.3462 9 15.3462C12.0549 15.3462 13.3201 14.8858 13.7713 14.6418C13.7812 14.6365 13.793 14.6281 13.8068 14.5987C13.8231 14.5639 13.8387 14.5042 13.8387 14.4195C13.8387 12.8071 12.5232 11.5 10.9004 11.5H7.09963ZM3 14.4195C3 12.1699 4.83547 10.3462 7.09963 10.3462H10.9004C13.1645 10.3462 15 12.1699 15 14.4195C15 14.8325 14.8495 15.3725 14.3264 15.6553C13.6335 16.03 12.1469 16.5 9 16.5C5.85311 16.5 4.36654 16.03 3.67359 15.6553C3.15048 15.3725 3 14.8325 3 14.4195Z' fill='%23727272'/%3E%3C/svg%3E%0A");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}


.profile-address::before {
  content: url("../assets/img/profile/Location.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}



.profile-orders::before {
  content: url("../assets/img/profile/shopping.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}

.profile-wishlist::before {
  content: url("../assets/img/profile/heart.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}

.profile-reports::before {
  content: url("../assets/img/profile/Activity.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}

.profile-downloads::before {
  content: url("../assets/img/profile/Download.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}

.profile-support::before {
  content: url("../assets/img/profile/Danger.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}

.logout-btn {
  color: #46A358;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.logout-btn::before {
  content: url("../assets/img/profile/Logout.svg");
  vertical-align: middle;
  margin-right: 7px;
  width: 20px;
  height: 20px;
}

.profile-logout {
  border-top: 0.3px solid rgba(70, 163, 88, 0.50);
  padding: 22px 0 0 20px;
}
</style>