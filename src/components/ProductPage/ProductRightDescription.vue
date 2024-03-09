<template>
  <h2 class="product-title">{{ product.name }}</h2>
  <div class="product__price-and-reviews">
    <div v-if="product.sale" class="price-and-reviews__price-section">
      <p class="price-section__price">{{ calcPriceWithSale(priceWithSize, product.sale) }}$</p>
      <p class="price-section__price-sale">{{ (priceWithSize) }}.00$</p>
    </div>
    <p v-else class="price-section__price">{{ (priceWithSize) }}.00$</p>
    <div class="price-and-reviews__reviews-section"></div>
  </div>
  <p class="product-description__title">Short Description:</p>
  <p class="product-description__text">{{ product.shortDescription }}</p>
  <p class="product-description__size-title">Size:</p>
  <div v-if="product.prices" class="product-description__size-section">
    <p @click.prevent="changeActiveSizeItem(item)" v-for="item in Object.keys(product?.prices)" :ref="item" :key="item"
      class="product-description__size-item">
      {{ item }}</p>
  </div>
  <div class="product-buttons"></div>
  <div class="product-links">
    <p class="product-links__sku">SKU: <span class="products-links__gray-text">{{ product.id }}</span></p>
    <p class="product-links__categories">Categories: <span class="products-links__gray-text">{{
    productCategories }}</span></p>
    <p class="product-links__tags">Tags: <span class="products-links__gray-text">{{ product.tags }}</span></p>
    <div class="product-links__links">
      <p class="product-links__text-link">Share this products:</p>
      <a href="#" class="product-links__link-item instagram"></a>
      <a href="#" class="product-links__link-item facebook"></a>
      <a href="#" class="product-links__link-item twitter"></a>
      <a href="#" class="product-links__link-item linkedin"></a>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    product: Object,
  },
  data() {
    return {
      activeSizeItem: null,
      priceWithSize: null,
      productCategories: "",
    }
  },
  methods: {
    calcPriceWithSale(price, sale) {
      return Math.floor(price * (100 - sale) / 100).toFixed(2);
    },
    changeActiveSizeItem(item) {
      this.activeSizeItem.classList.remove("product-description__size-item_active");
      this.activeSizeItem = this.$refs[item][0];
      this.activeSizeItem.classList.add("product-description__size-item_active")
      this.priceWithSize = this.product.prices[item];
    },
    mapProductCategories() {
      return this.product.categories.map(item => {
        const [firstWord, secondWord] = item.split('-');
        return `${firstWord[0].toUpperCase() + firstWord.slice(1)} ${secondWord[0].toUpperCase() + secondWord.slice(1)}`;
      }).join(", ");
    }
  },
  mounted() {
    setTimeout(() => {
      this.priceWithSize = this.product.price;
      this.activeSizeItem = this.$refs[Object.keys(this.$refs)[0]][0];
      this.activeSizeItem.classList.add("product-description__size-item_active")
      this.productCategories = this.mapProductCategories();
    }, 10)
  }
}
</script>

<style scoped>
.product-title {
  font-weight: 700;
  font-size: 28px;
  margin-bottom: 20px;
}

.product__price-and-reviews {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #46a35974;
  margin-bottom: 15px;
}

.price-and-reviews__price-section {
  display: flex;
  align-items: center;

}

.price-section__price-sale {
  margin-left: 30px;
  font-size: 18px;
  color: #727272;
  font-weight: 500;
  text-decoration: line-through;
}

.price-section__price {
  color: #46A358;
  font-size: 22px;
  font-weight: 700;
}

.product-description__title {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 10px;
}

.product-description__text {
  font-size: 14px;
  color: #727272;
  margin-bottom: 25px;
  line-height: 24px;
}

.product-description__size-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
}

.product-description__size-section {
  display: flex;
  margin-bottom: 25px;
}

.product-description__size-item:not(:last-child) {
  margin-right: 10px;
}

.product-description__size-item {
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #727272;
  color: #727272;
  font-size: 18px;
  transition: transform .3s ease;
}

.product-description__size-item:hover {
  transform: scale(1.03);
}

.product-description__size-item_active {
  color: #46A358;
  font-weight: 700;
  border: 2px solid #46A358;
}

.product-links__sku,
.product-links__tags,
.product-links__categories {
  margin-bottom: 10px;
  font-size: 15px;
  color: #A5A5A5;
  font-weight: 300;
}

.products-links__gray-text {
  font-size: 15px;
  color: #727272;
  font-weight: 400;
}

.product-links__links {
  margin-top: 20px;
  display: flex;
}

.product-links__text-link {
  font-size: 15px;
  font-weight: 700;
  margin-right: 15px;
}

.product-links__link-item {
  display: inline-block;
  margin-right: 30px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: transform .3s ease;
}

.product-links__link-item:hover {
  transform: scale(1.05);
}

.instagram {
  background: url("../../assets/img/footer/social-icons/Instagram.svg") center/cover no-repeat;
}

.facebook {
  height: 20px;
  width: 10px;
  background: url("../../assets/img/footer/social-icons/Facebook.svg") center/cover no-repeat;
}

.twitter {
  background: url("../../assets/img/footer/social-icons/Twitter.svg") center/cover no-repeat;
}

.linkedin {
  background: url("../../assets/img/footer/social-icons/Linkedin.svg") center/cover no-repeat;
}
</style>