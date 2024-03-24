<template>
  <transition name="scale">
    <CardImageScale @closeImageScale="closeProductImageScale" :image="productImage" v-if="isCardImageScaleOpen">
    </CardImageScale>
  </transition>
  <div class="top-section">
    <div class="top-section__left">
      <ProductImages @openProductImageScale="openProductImageScale" :productImages="product?.image"></ProductImages>
    </div>
    <div class="top-section__right">
      <ProductRightDescription :product="product"></ProductRightDescription>
    </div>
  </div>
  <div class="bottom-section">
    <product-description :productId="product.id" :fullDescription="this.product.fullDescription"></product-description>
  </div>
  <div class="carousel-section">
    <h3 class="title_h3 carousel-section__title">Releated Products</h3>
    <CarouselWithItems></CarouselWithItems>
  </div>
</template>

<script>
import CardImageScale from '@/components/HomePage/CardImageScale.vue';
import ProductImages from '@/components/ProductPage/ProductImages.vue';
import ProductRightDescription from '@/components/ProductPage/ProductRightDescription.vue';
import CarouselWithItems from '@/components/CarouselWithItems.vue';
import ProductDescription from '@/components/ProductPage/ProductDescription.vue';
export default {
  components: {
    CarouselWithItems,
    ProductDescription,
    ProductRightDescription,
    ProductImages,
    CardImageScale,
  },
  data() {
    return {
      product: {
      },
      isCardImageScaleOpen: false,
      productImage: null,
    }
  },
  methods: {
    openProductImageScale(image) {
      this.isCardImageScaleOpen = true;
      this.productImage = image;
    },
    closeProductImageScale() {
      this.isCardImageScaleOpen = false;
    }
  },
  created() {
    setTimeout(() => {
      this.product = [...this.$store.getters.getAllProducts].find(item => {
        return item.id == this.$route.params.id;
      });
      console.log(this.product);
      this.$store.dispatch("getProductCommentsFromServer", { id: this.product.id });
    }, 30)
    if (this.$store.getters.getUser.id) {
      this.$store.dispatch('getUserShoppingCart', this.$store.getters.getUser.id)
    }
  }
}
</script>

<style scoped>
.top-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
  margin-bottom: 90px;
  margin-top: 40px;
}

.bottom-section {
  margin-bottom: 130px;
}





.title_h3 {
  color: #46A358;
  font-size: 16px;
  font-weight: 600;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: .5px solid #46A358;
}



.carousel-section {
  margin-bottom: 50px;
}

.carousel-section__title {
  margin-bottom: 50px;
}

.scale-enter-active {
  transition: all .3s ease;
}

.scale-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.scale-enter,
.scale-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
</style>