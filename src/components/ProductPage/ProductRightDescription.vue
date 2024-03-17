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
  <div class="product-buttons">
    <div class="product-buttons__count-buttons">
      <button @click.prevent="changeProductCounter('decrement')"
        class="prdouct-buttons__count-button decrement-button">-</button>
      <p class="product-buttons__product-counter">{{ productCounter }}</p>
      <button @click.prevent="changeProductCounter('increment')"
        class="prdouct-buttons__count-button increment-button">+</button>
    </div>
    <!-- TODO!!:Add button click logic -->
    <button @click.prevent="buyNowProduct" class="product-button__buy-now">buy now</button>
    <button @click.prevent="addProductInTheShoppingCart" :class="{ 'active-cart-button': isItemInCart }"
      class="product-button__add-to-cart">add to
      cart</button>
    <button @click.prevent="addProductInTheWishList" :class="{ 'active-wish-button': isItemInWishlts }"
      class="product-button__add-wish"></button>
  </div>
  <div class="product-links">
    <p class="product-links__sku">SKU: <span class="products-links__gray-text">{{ product.id }}</span></p>
    <p class="product-links__categories">Categories: <span class="products-links__gray-text">{{
    productCategories }}</span></p>
    <p class="product-links__tags">Tags: <span class="products-links__gray-text">{{ product.tags }}</span></p>
    <div class="product-links__links">
      <p class="product-links__text-link">Share this products:</p>
      <a href="https://instagram.com" class="product-links__link-item instagram"></a>
      <a href="https://facebook.com" class="product-links__link-item facebook"></a>
      <a href="https://twitter.com" class="product-links__link-item twitter"></a>
      <a href="https://linkedin.com" class="product-links__link-item linkedin"></a>
    </div>
  </div>
</template>

<script>
import errorTost from '@/toasts-plugins/error.tost';
import successTost from '@/toasts-plugins/success.tost';


export default {
  props: {
    product: Object,
  },
  data() {
    return {
      activeSizeItem: null,
      priceWithSize: null,
      productCategories: "",
      productCounter: 1,
      isItemInCart: false,
      isItemInWishlts: false,
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
    changeProductCounter(operation) {
      if (operation === 'decrement') {
        if (this.productCounter > 1) {
          this.productCounter -= 1;
          this.$store.commit("setUserShoppingCartCurrentProductQuantity", { productId: this.product.id, quantity: -1 });
        } else {
          errorTost('Counter must be more 0')
        }
      } else if (operation === 'increment') {
        if (this.productCounter < 10) {
          this.productCounter += 1;
          this.$store.commit("setUserShoppingCartCurrentProductQuantity", { productId: this.product.id, quantity: 1 });
        } else {
          errorTost('Counter must be less 11')
        }
      }
    },
    mapProductCategories() {
      if (this.product.categories.length) {
        return this.product.categories.map(item => {
          if (item.includes("-")) {
            const [firstWord, secondWord] = item.split('-');
            return `${firstWord[0].toUpperCase() + firstWord.slice(1)} ${secondWord[0].toUpperCase() + secondWord.slice(1)}`;
          } else {
            return (item[0].toUpperCase() + item.slice(1));
          }
        }).join(", ");
      }
    },
    buyNowProduct() {
      if (this.$store.getters.getUser.id) {
        this.$store.dispatch("clearUserShoppingCart");
        this.$store.dispatch('addItemInUserShoppingCart', { id: this.product.id });
        this.$store.commit('setUserShoppingCartCurrentProductQuantity', { productId: this.product.id, quantity: this.productCounter });
        successTost("Now you are going to the checkout page");
        setTimeout(() => {
          console.log(this.$router.push('/shop/checkout'))
          // this.$router.route("shop/checkout")
        }, 1000)
      }
    },
    async addProductInTheShoppingCart() {
      if (this.$store.getters.getUser.id) {
        if (!this.isItemInCart) {
          this.$store.dispatch('addItemInUserShoppingCart', { id: this.product.id });
          this.isItemInCart = true;
        } else {
          const shoppingCartProductId = this.$store.getters.getterUserShoppingCartIndexes[this.$store.getters.getterUserShoppingCart.findIndex(product => product.id === this.product.id)];
          await this.$store.dispatch('deleteItemFromUserShoppingCart', { id: shoppingCartProductId });
          document.querySelector(".product-button__add-to-cart").classList.remove('active-cart-button');
          this.isItemInCart = false;
        }
      } else {
        errorTost("User must be authorized");
      }
    },
    addProductInTheWishList() {
      if (this.$store.getters.getUser.id) {
        if (!this.isItemInWishlts) {
          this.$store.dispatch('addItemInUserWishlist', { id: this.product.id });
          this.isItemInWishlts = true;
        } else {
          const wishId = this.$store.getters.getterUserWishlistIndexes[this.$store.getters.getterUserWishlist.findIndex(product => product.id == this.product.id)];
          this.$store.dispatch("deleteItemFromUserWishlist", { id: wishId });
          this.isItemInWishlts = false;
        }
      } else {
        errorTost("User must authorized")
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.priceWithSize = this.product.price;
      this.activeSizeItem = this.$refs[Object.keys(this.$refs)[0]][0];
      this.activeSizeItem.classList.add("product-description__size-item_active")
      this.productCategories = this.mapProductCategories();
      console.log(this.$store.getters.getterUserShoppingCart)
      this.isItemInCart = this.$store.getters.getterUserShoppingCart.some(item => item.id === this.product.id);
      this.isItemInWishlts = this.$store.getters.getterUserWishlist.some(item => item.id === this.product.id);
      console.log(this.isItemInWishlts);
      if (this.isItemInWishlts) {
        document.querySelector(".product-button__add-wish").classList.add("active-wish-button");
      }
      if (this.isItemInCart) {
        document.querySelector(".product-button__add-to-cart").classList.add('active-cart-button');
      }
    }, 100)
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

.active-cart-button {
  background: #46A358 !important;
  color: #fff !important;
}

.active-wish-button {
  background-color: #419c53 !important;
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

.product-buttons {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.product-buttons__count-buttons {
  display: grid;
  grid-template-columns: 35px 50px 35px;
  margin-right: 30px;
}

.product-buttons__product-counter {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.prdouct-buttons__count-button {
  width: 35px;
  height: 35px;
  background: #46A358;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: transform .2s ease;
}

.product-button__add-wish:hover,
.product-button__add-to-cart:hover,
.product-button__buy-now:hover,
.prdouct-buttons__count-button:hover {
  transform: scale(1.05);
}

.product-button__buy-now {
  text-transform: uppercase;
  width: 130px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  background: #46A358;
  border-radius: 5px;
  margin-right: 20px;
  transition: transform .2s ease;
  cursor: pointer;
}

.product-button__add-to-cart {
  color: #46A358;
  font-size: 16px;
  background: transparent;
  width: 130px;
  font-weight: 500;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #46A358;
  text-transform: uppercase;
  transition: all .2s ease;
  margin-right: 20px;
  cursor: pointer;

}

.product-button__add-wish {
  width: 40px;
  height: 40px;
  border: 2px solid #46A358;
  border-radius: 5px;
  background: url("../../assets/img/cards/heartGreen.svg") center/cover no-repeat;
  background-size: 20px 20px;
  transition: all .2s ease;
  cursor: pointer;

}
</style>