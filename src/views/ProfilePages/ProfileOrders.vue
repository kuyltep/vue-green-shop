<template>
  <transition-group tag="div" name="cards" class="cards">
    <Card :item="item" v-for="item in this.$store.getters.getterUserShoppingCartProducts" :key="item.id"
      :icons="this.$store.getters.getCardIcons"></Card>
  </transition-group>
</template>

<script>
import Card from '@/components/HomePage/Card.vue';
export default {
  components: {
    Card,
  }
}
</script>

<style scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 15px;
}

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