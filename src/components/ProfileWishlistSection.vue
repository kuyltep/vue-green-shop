<template>
  <div class="wish-cards">
    <transition-group tag="div" name="cards" class="wish-cards">
      <Card v-for="item in items" :key="item.id" :item="item" :icons="this.$store.getters.getCardIcons"></Card>
    </transition-group>
  </div>
</template>

<script>
import Card from '@/components/HomePage/Card.vue';

export default {
  components: { Card },
  data() {
    return {
      items: []
    }
  },
  methods: {

  },
  async mounted() {
    this.items = this.$store.getters.getterUserWishlistProfileProducts;
  }

}
</script>

<style scoped>
.wish-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 30px;
  grid-column-gap: 15px;
}
</style>