<template>
  <transition-group tag="div" name="cards" class="cards">
    <ProfileOrderItem v-for="item in this.$store.getters.getUserOrders" :key="item.id" :orderItem="item">
    </ProfileOrderItem>
    <!-- TODO!!:Create orders pagination pages for 5-10 orders on one page -->
    <!-- TODO!!:Create orders filtration by date or may be smth else -->
  </transition-group>
</template>

<script>
import ProfileOrderItem from '@/components/ProfileOrderItem.vue'
export default {
  components: {
    ProfileOrderItem,
  }
}
</script>

<style scoped>
.cards-enter-active,
.cards-leave-active {
  transition: all .8s ease-in-out;
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>