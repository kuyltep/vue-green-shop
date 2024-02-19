<template>
  <Swiper :loop="true" :modules="modules" :pagination="true" :autoplay="{
    delay: 6000,
    disableOnInteraction: false,
  }">
    <SwiperSlide v-for="slide  in  dataForSlider" :key="slide">
      <div class="slide-block">
        <Card v-for="item in slide" :key="item.id" :item="item"></Card>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script>
import Card from "./HomePage/Card.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
export default {
  components: {
    Swiper,
    SwiperSlide,
    Card
  },
  setup() {
    return {
      modules: [Pagination, Autoplay]
    }
  },
  data() {
    return {
      dataForSlider: [],
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchAllProducts');
    console.log(this.$store.getters.getAllProducts)
    let buferArr = [];
    for (let i = 1; i <= this.$store.getters.getAllProducts.length; i++) {
      if (i % 3 === 0) {
        buferArr.push(this.$store.getters.getAllProducts[i - 1]);
        this.dataForSlider.push(buferArr);
        buferArr = [];
      } else {
        buferArr.push(this.$store.getters.getAllProducts[i - 1]);
      }
    }

  }
}
</script>

<style scoped>
.swiper {
  height: 400px;
  width: 1200px;
  background-color: transparent;
}

.swiper-wrapper {
  margin-bottom: 15px;
}

.slide-block {
  display: flex;
  justify-content: space-evenly;
}
</style>
<style>
.swiper-pagination-bullet-active {
  background-color: #46A358;
}
</style>