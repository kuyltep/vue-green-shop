<template>
  <Swiper :loop="true" :modules="modules" :pagination="true" :autoplay="{
    delay: 2500,
    disableOnInteraction: false,
  }">
    <SwiperSlide v-for=" slide  in  dataForSlider " :key="slide.id">
      <div class="slide-content">
        <div class="slide-content__text">
          <p class="welcome-title">{{ slide.welcome }}</p>
          <p class="main-title">{{ slide.mainTitle }} <span class="green-title">{{ slide.greenTitle }}</span></p>
          <p class="description-text">{{ slide.description }}</p>
          <button class="slide-btn" @click.prevent="this.$router.push(slide['router-link'])">{{ slide.linkText }}</button>
        </div>
        <div class="slide-content__image">
          <div class="big-image-wrapper">
            <img class="big-image" src="../assets/img/slider/sliderBig.png" alt="">
          </div>
          <div class="small-image-wrapper">
            <img src="../assets/img/slider/sliderSmall.png" alt="" class="small-image">
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
export default {
  components: {
    Swiper, SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay]
    }
  },
  data() {
    return {
      dataForSlider: null,
    }
  },
  async created() {
    await this.$store.dispatch('getDataForSlider');
    this.dataForSlider = this.$store.getters.getSliderData;
  }
}
</script>

<style >
.swiper {
  height: 450px;
  width: 1200px;
}

.swiper-slide {
  background: linear-gradient(98deg, rgba(245, 245, 245, 0.50) -23.46%, rgba(245, 245, 245, 0.50) 107.51%);
}


.swiper-pagination-bullet-active {
  background: #46A358;
}

.slide-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.slide-content__text {
  grid-column: 1/2;
  padding: 70px 0 0 43px;
}

.slide-content__image {
  grid-column: 2/3;
}

.main-title {
  color: #3D3D3D;
  font-size: 70px;
  font-weight: 700;
  line-height: 70px;
  /* 100% */
  text-transform: uppercase;
  margin-bottom: 5px;
}

.green-title {
  color: #46A358;
  font-size: 70px;
  font-style: normal;
  font-weight: 900;
  line-height: 70px;
  text-transform: uppercase;
}

.welcome-title {
  color: #3D3D3D;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.description-text {
  color: #727272;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 44px;
}

.slide-btn {
  border-radius: 6px;
  background: #46A358;
  color: #FFF;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  text-transform: uppercase;
  padding: 10px 26px;
  cursor: pointer;
}

.slide-content__image {
  padding-left: 70px;
  position: relative;
  /* display: flex;
  align-items: flex-end;
  justify-content: flex-end; */
}

/* .image-wrapper {
  position: relative;
} */
.small-image-wrapper {
  position: absolute;
  bottom: 30px;
  left: 70px;
}

.big-image {
  z-index: 1;
  width: 450px;
  height: 450px;
  object-fit: cover;
}

.small-imgae {
  z-index: 3;
}
</style>