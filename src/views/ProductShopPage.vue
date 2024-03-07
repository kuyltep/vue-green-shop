<template>
  <div class="top-section"></div>
  <div class="bottom-section">
    <div class="bottom-section__title-section">
      <h4 @click.prevent="changeActiveElement" ref="description" class="bottom-section__title description">
        Product
        description</h4>
      <h4 @click.prevent="changeActiveElement" ref="reviews" class="bottom-section__title reviews">Reviews ()</h4>
    </div>
    <div v-for="description in this.product.fullDescription" :key="description.children"
      class="bottom-section__description-block">
      <p v-if="description.type === 'paragraph'" class="bottom-section__description">{{ description.children[0].text }}
      </p>
      <p v-else class="bottom-section__title-description">{{ description.children[0].text }}</p>
    </div>
  </div>
  <div class="carousel-section">
    <h3 class="title_h3 carousel-section__title">Releated Products</h3>
    <CarouselWithItems></CarouselWithItems>
  </div>
</template>

<script>
import CarouselWithItems from '@/components/CarouselWithItems.vue';
export default {
  components: {
    CarouselWithItems,
  },
  data() {
    return {
      product: {
      },
      activeElement: null,
    }
  },
  methods: {
    changeActiveElement(event) {
      if (this.activeElement) {
        this.activeElement.classList.remove('active');
        this.activeElement = null;
      }
      this.activeElement = event.target;
      this.activeElement.classList.add('active');
      console.log(this.activeElement);
    }
  },
  mounted() {
    setTimeout(() => {

      this.activeElement = this.$refs["description"];
      this.activeElement.classList.add('active');
      this.product = [...this.$store.getters.getAllProducts].find(item => {
        return item.id == this.$route.params.id;
      });
      console.log(this.product);
    }, 10)
  }
}
</script>

<style scoped>
.bottom-section {
  margin-bottom: 130px;
}

.active {
  color: #46A358;
  font-size: 18px;
  font-weight: 700;
  border-bottom: 3px solid #46A358;
  opacity: 1;
  transition: opacity .5s ease-in-out;
}



.title_h3 {
  color: #46A358;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: .5px solid #46A358;
}

.bottom-section__title-section {
  display: flex;
  border-bottom: .5px solid #46A358;
  margin-bottom: 10px;

}

.bottom-section__title {
  font-size: 16px;
  cursor: pointer;
  padding-bottom: 10px;
  transition: transform .5s ease;
}

.bottom-section__title:hover {
  transform: scale(1.03);
}

.bottom-section__title:not(:last-child) {
  margin-right: 30px;
}

.bottom-section__description {
  font-size: 14px;
  color: #727272;
  font-weight: 400;
  margin-bottom: 30px;
}

.bottom-section__title-description {
  font-size: 14px;
  color: #3d3d3d;
  font-weight: 700;
  margin-bottom: 10px;
}

.carousel-section {
  margin-bottom: 50px;
}

.carousel-section__title {
  margin-bottom: 50px;
}
</style>