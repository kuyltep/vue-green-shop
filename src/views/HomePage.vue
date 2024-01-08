<template>
  <Carousel></Carousel>
  <div class="filter-and-cards">
    <ShopSidebar></ShopSidebar>
    <SectionWithCards :itemsProps="items"></SectionWithCards>
  </div>
  <BannerWithTwoCards></BannerWithTwoCards>
  <BlogPostsSection></BlogPostsSection>
</template>

<script>
import BlogPostsSection from '@/components/BlogPostsSection.vue';
import BannerWithTwoCards from '@/components/BannerWithTwoCards.vue';
import Carousel from '@/components/Carousel.vue';
import ShopSidebar from '@/components/ShopSidebar.vue';
import SectionWithCards from '@/components/HomePage/SectionWithCards.vue';
export default {
  components: {
    Carousel,
    BannerWithTwoCards,
    BlogPostsSection,
    ShopSidebar,
    SectionWithCards,
  },
  data() {
    return {
      items: [],
    }
  },
  methods: {
    updatePage() {
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProducts');
    this.items = this.$store.getters.getFilteredProducts;
    console.log(this.items)
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
</style>