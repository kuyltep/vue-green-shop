<template>
  <transition-group tag="div" name="cards" class="cards">
    <DetailOrderItem @closeDetailOrderPage="closeDetailOrderPage" v-if="isShowDetailOrderItem" :orderItem="orderItem">
    </DetailOrderItem>
    <ProfileOrderItem @clickOnProfileOrderItem="showDetailOrderItem"
      v-for="item in  this.$store.getters.getPaginationUserOrders[paginationPage - 1]" :key="item.id" :orderItem="item">
    </ProfileOrderItem>
    <!-- TODO!!:Create orders pagination pages for 5-10 orders on one page -->
    <!-- TODO!!:Create orders filtration by date or may be smth else -->
  </transition-group>
  <Pagination @changePage="changePaginationPage" :pageCount="this.$store.getters.getOrdersPagesCounter"></Pagination>
</template>

<script>
import Pagination from '@/components/app/Pagination.vue';
import ProfileOrderItem from '@/components/ProfileOrderItem.vue';
import DetailOrderItem from '@/components/DetailOrderItem.vue';
export default {
  components: {
    ProfileOrderItem,
    DetailOrderItem,
    Pagination,
  },
  data() {
    return {
      orderItem: {},
      orderItems: [],
      isShowDetailOrderItem: false,
      paginationPage: 1,
    }
  },
  methods: {
    showDetailOrderItem(orderItem) {
      this.orderItem = orderItem;
      setTimeout(() => {
        this.isShowDetailOrderItem = true;
      }, 500);
    },
    closeDetailOrderPage() {
      this.isShowDetailOrderItem = false;
    },


    changePaginationPage(value) {
      this.paginationPage = value;
    }
  },

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