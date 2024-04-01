<template>
  <div class="spinner" v-show="!items.length">
    <PulseLoader :color="'#46A358'" :size="'30px'" :margin="'10px'"></PulseLoader>
  </div>
  <div v-show="items.length" class="">
    <Carousel></Carousel>
    <div class="filter-and-cards">
      <ShopSidebar :itemsProps="this.$store.getters.getProducts" @filterProductsBy="filterProducts"></ShopSidebar>
      <SectionWithCards @changePaginationPage="changePaginationPage" :filterByHeader="clearActiveElemet"
        :itemsProps="items"></SectionWithCards>
    </div>
    <BannerWithTwoCards></BannerWithTwoCards>
    <BlogPostsSection></BlogPostsSection>
  </div>
</template>

<script>
import CarouselWithItems from '@/components/CarouselWithItems.vue';
import BlogPostsSection from '@/components/BlogPostsSection.vue';
import BannerWithTwoCards from '@/components/BannerWithTwoCards.vue';
import Carousel from '@/components/Carousel.vue';
import ShopSidebar from '@/components/ShopSidebar.vue';
import SectionWithCards from '@/components/HomePage/SectionWithCards.vue';
import Paginate from "vuejs-paginate-next";
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
export default {
  components: {
    Carousel,
    BannerWithTwoCards,
    BlogPostsSection,
    ShopSidebar,
    SectionWithCards,
    CarouselWithItems,
    Paginate,
    PulseLoader
  },
  data() {
    return {
      items: [],
      pageSize: 3,
      pageNumber: 1,
    }
  },
  methods: {
    filterProducts(data) {
      this.items = data;
    },
    clearActiveElemet() {
      this.activeElement = null;
    },
    async changePaginationPage(page) {
      this.$store.commit('setProductsPageNumber', page);
      await this.$store.dispatch('fetchProducts');
      this.items = this.$store.getters.getFilteredProducts;
    }
  },
  async mounted() {
    setTimeout(() => {

      this.$store.dispatch('fetchProducts');
      this.items = this.$store.getters.getFilteredProducts;
    }, 1000)

  },
}
</script>

<style scoped>
.filter-and-cards {
  display: grid;
  grid-template-columns: 310px 1fr;
  grid-gap: 50px;
  margin-top: 45px;
}

.spinner {
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 10%;
}
</style>