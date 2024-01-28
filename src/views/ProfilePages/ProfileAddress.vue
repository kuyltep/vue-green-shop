<template>
  <SaveAddress></SaveAddress>
  <ShippingAddress :isProfilePage="true"></ShippingAddress>
</template>

<script>
import ShippingAddress from "@/components/ShippingAdress.vue";
import SaveAddress from '@/components/SaveAddress.vue'
export default {
  components: {
    SaveAddress,
    ShippingAddress,
  },

}
</script>

<style scoped></style>