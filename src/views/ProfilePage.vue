<template>
  <ProfileSidebar></ProfileSidebar>
  <router-view></router-view>
</template>

<script>
import ProfileSidebar from '@/components/ProfileSidebar.vue';
export default {
  components: {
    ProfileSidebar,
  }
}
</script>

<style></style>