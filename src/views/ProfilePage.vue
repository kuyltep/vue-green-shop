<template>
  <div class="profile-page">
    <ProfileSidebar></ProfileSidebar>
    <router-view></router-view>
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

router-view {
  grid-column: 2/3;
}
</style>