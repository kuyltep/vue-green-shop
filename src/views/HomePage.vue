<>
<Carousel></Carousel>
<div class="filter-and-cards">
    <ShopSidebar :itemsProps="this.$store.getters.getProducts" @filterProductsBy="filterProducts"></ShopSidebar>
    <SectionWithCards @changePaginationPage="changePaginationPage" :filterByHeader="clearActiveElemet"
      :itemsProps="items"></SectionWithCards>
  </div>
<BannerWithTwoCards></BannerWithTwoCards>
<BlogPostsSection></BlogPostsSection>
</>

<script>
import CarouselWithItems from '@/components/CarouselWithItems.vue';
import BlogPostsSection from '@/components/BlogPostsSection.vue';
import BannerWithTwoCards from '@/components/BannerWithTwoCards.vue';
import Carousel from '@/components/Carousel.vue';
import ShopSidebar from '@/components/ShopSidebar.vue';
import SectionWithCards from '@/components/HomePage/SectionWithCards.vue';
import Paginate from "vuejs-paginate-next";
export default {
  components: {
    Carousel,
    BannerWithTwoCards,
    BlogPostsSection,
    ShopSidebar,
    SectionWithCards,
    CarouselWithItems,
    Paginate,
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
      this.pageNumber = page;
      await this.$store.dispatch('fetchProducts', { pageSize: this.pageSize, page: this.pageNumber });
      this.items = this.$store.getters.getFilteredProducts;
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProducts', { pageSize: this.pageSize, page: this.pageNumber });
    this.items = this.$store.getters.getFilteredProducts;
    console.log(this.items);
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