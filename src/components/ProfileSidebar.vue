<template>
  <div class="sidebar">
    <h4 class="title_h4">My Account</h4>
    <ul class="sidebar__links">
      <li class="sidebar__links-item">
        <router-link to="/profile/details">Account Details</router-link>
      </li>
      <li class="sidebar__links-item">
        <router-link to="/profile/address">Address</router-link>
      </li>
      <li class="sidebar__links-item">
        <router-link to="/profile/orders">Orders</router-link>
      </li>
      <li class="sidebar__links-item">
        <router-link to="/profile/wishlist">Wishlist</router-link>
      </li>
      <li class="sidebar__links-item">
        <router-link to="/profile/reports">Reports</router-link>
      </li>
      <li class="sidebar__links-item">
        <router-link to="/profile/downloads">Downloads</router-link>
      </li>
      <li class="sidebar__links-item">
        <router-link to="/profile/support">Support</router-link>
      </li>
    </ul>
    <button class="logout-btn">Logout</button>
  </div>
</template>

<script>
export default {

}
</script>

<style></style>