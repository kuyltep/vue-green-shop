<template>
  <PersonalInformation></PersonalInformation>
  <ChangePassword></ChangePassword>
</template>

<script>
import PersonalInformation from '@/components/PersonalInformation.vue';
import ChangePassword from '@/components/ChangePassword.vue';
export default {
  components: {
    PersonalInformation,
    ChangePassword,
  }
}
</script>

<style scoped></style>