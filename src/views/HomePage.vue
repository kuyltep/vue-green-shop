<template>
  <Carousel></Carousel>
  <BannerWithTwoCards></BannerWithTwoCards>
  <BlogPostsSection></BlogPostsSection>
</template>

<script>
import BlogPostsSection from '@/components/BlogPostsSection.vue';
import BannerWithTwoCards from '@/components/BannerWithTwoCards.vue';
import Carousel from '@/components/Carousel.vue';
export default {
  components: {
    Carousel,
    BannerWithTwoCards,
    BlogPostsSection,
  },

}
</script>

<style></style>