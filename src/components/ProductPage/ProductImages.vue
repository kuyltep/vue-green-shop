<template>
  <div class="product-images-section">
    <div class="product-swiper">
      <swiper v-show="images.length" :slidesPerView="4" class="swiper-product">
        <swiper-slide @click.prevent="changeSwiperSlide($event)" v-for="image in images" :key="image.id">
          <img :ref="image.id" class="swiper-product__img" :src="'http://localhost:1337' + image.attributes?.url"
            alt="">
        </swiper-slide>
      </swiper>
    </div>
    <div class="product-image">
      <img :src="this.activeProductImage" alt="" class="product-image__img">
      <button @click.prevent="openProductImageScale" class="show-big-image__button"></button>
    </div>
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
      swiperSlideActive: null,
      activeProductImage: null,
    }
  },
  methods: {
    changeSwiperSlide(event) {
      console.log(event.target);
      this.swiperSlideActive.classList.remove('swiper-slide-active');
      this.swiperSlideActive = event.target.closest('.swiper-slide');
      this.swiperSlideActive.classList.add('swiper-slide-active');
      this.activeProductImage = event.target.src;
      console.log(this.swiperSlideActive);
      console.log(this.activeProductImage);
    },
    openProductImageScale() {
      this.$emit("openProductImageScale", this.activeProductImage);
    }
  },
  watch: {
    productImages() {
      this.images = this.productImages.data;
    }
  },
  mounted() {
    setTimeout(() => {
      const image = this.$refs[Object.keys(this.$refs)[0]][0]
      this.activeProductImage = image.src;
      console.log(this.activeProductImage)
      this.swiperSlideActive = image.closest(".swiper-slide");
    }, 30)

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
  width: 100%;

}

.product-swiper .swiper {
  width: 100px !important;
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

.swiper-product .swiper-slide:hover {
  transform: scale(1.03);
}

.swiper-product .swiper-slide,
.swiper-product .swiper-slide-active {
  cursor: pointer;
  transition: transform .3s ease;
  width: 100px !important;
  height: 100px;
}


.swiper-product .swiper-slide-active .swiper-product__img {
  border: 2px solid #46A358;
}

.swiper-product__img {
  height: 96px;
  width: 96px;
  object-fit: cover;
}

.product-image {
  position: relative;
}

.product-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.show-big-image__button {
  width: 20px;
  height: 20px;
  background: url("../../assets/img/header/Search.svg") center/cover no-repeat;
  background-size: 20px 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: transform .4s ease-in-out;
}

.show-big-image__button:hover {
  transform: scale(1.05);
}
</style>