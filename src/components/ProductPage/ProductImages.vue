<template>
  <div class="product-images-section">
    <div class="product-swiper">
      <swiper v-show="images.length" :slidesPerView="4" class="swiper-product">
        <swiper-slide v-for="image in images" :key="image.id">
          <img class="swiper-product__img" :src="'http://localhost:1337' + image.attributes?.url" alt="">
        </swiper-slide>
      </swiper>
    </div>
    <div class="product-image"></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {};
  },
  props: {
    productImages: Array,
  },
  data() {
    return {
      images: [],
    }
  },
  watch: {
    productImages() {
      this.images = this.productImages.data;
      console.log(this.images)
    }
  },
  mounted() {
  }
};
</script>

<style>
.product-images-section {
  height: 100%;
}

.product-swiper {
  height: 100%;
}

.swiper-product {
  height: 100%;
}

.product-images-section {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-column-gap: 30px;
}

.swiper-product .swiper-wrapper {
  flex-direction: column;
  justify-content: space-between;
}

.swiper-product .swiper-slide {
  width: 100px;
  height: 100px;
}

.swiper-product .swiper-slide-active {
  width: 100% !important;
  border: 2px solid #46A358;
}

.swiper-product__img {
  height: 96px;
  width: 96px;
  object-fit: cover;
}
</style>