<template>
  <div class="profile-page">
    <ProfileSidebar></ProfileSidebar>
    <div class="profile-page-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import ProfileSidebar from '@/components/ProfileSidebar.vue';
export default {
  components: {
    ProfileSidebar,
  }
}
</script>

<style>
.profile-page {
  padding-top: 60px;
  display: grid;
  grid-template-columns: 310px 1fr;
  grid-gap: 30px;
}

ProfileSidebar {
  grid-column: 1/2;
}

.profile-page-content {
  grid-column: 2/3;
}
</style>