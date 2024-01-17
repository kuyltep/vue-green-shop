<template>
  <Swiper :loop="true" :modules="modules" :pagination="true" :autoplay="{
    delay: 2500,
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
}

.slide-block {
  justify-content: center;
  display: grid;
  grid-template-columns: repeat(3, 250px);
  grid-gap: 50px;
}


.swiper-pagination-bullet-active {
  background: #46A358;
}
</style>