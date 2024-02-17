<template>
  <div @mouseenter="showIcons = true" @mouseleave="showIcons = false" class="card">
    <transition name="image-scale">
      <card-image-scale :image="'http://localhost:1337' + item.image.data[0].attributes.url" v-if="isOpenImageScale"
        @closeImageScale="toogleImageScale"></card-image-scale>
    </transition>
    <div class="card-image-wrapper">
      <div v-if="item.sale" class="sale-flag">{{ item.sale }}% OFF</div>
      <img :src="'http://localhost:1337' + item.image.data[0].attributes.url" alt="" class="card-image">
      <transition name="icons">
        <div v-if="icons" v-show="showIcons" class="card-icons">
          <div :style="{ 'background-color': shoppingCartIconColor }" class="card-icon-wrapper">
            <button @click.prevent="addChunkTovar(item.id)" class="card-icon chunk"
              :style="{ background: `url(${icons[0].image}) center no-repeat`, backgroundSize: '20px 20px' }"></button>
          </div>
          <div :style="{ 'background-color': wishIconColor }" class="card-icon-wrapper">
            <button @click.prevent="addWishTovar(item.id)" class="card-icon hearth"
              :style="{ background: `url(${icons[1].image}) center no-repeat`, backgroundSize: '20px 20px' }"></button>
          </div>
          <div class="card-icon-wrapper">
            <button @click.prevent="toogleImageScale" class="card-icon search"
              :style="{ background: `url(${icons[2].image}) center no-repeat`, backgroundSize: '20px 20px' }"></button>
          </div>
        </div>
      </transition>

    </div>
    <h4 class="card-title">{{ item.name }}</h4>
    <div v-if="item.sale" class="price-sale-block">
      <p class="card-sale-block-price">${{ calcSale(item.price, item.sale).toFixed(2) }}</p>
      <p class="card-sale-price">${{ item.price.toFixed(2) }}</p>
    </div>
    <p v-else class="card-price">${{ item.price.toFixed(2) }}</p>
  </div>
</template>

<script>
import errorTost from '@/toasts-plugins/error.tost';
import CardImageScale from './CardImageScale.vue';
export default {
  components: {
    CardImageScale,
  },
  props: {
    item: {
      type: Object,
    },
    icons: {
      type: Array,
    }
  },
  data() {
    return {
      showIcons: false,
      isOpenImageScale: false,
      wishIconColor: "#fff",
      shoppingCartIconColor: "#fff"
    }
  },
  methods: {
    calcSale(price, sale) {
      return Math.floor(price / 100 * (100 - sale));
    },
    toogleImageScale() {
      this.isOpenImageScale = !this.isOpenImageScale;
    },
    async addChunkTovar(id) {
      if (this.$store.getters.getUser?.id) {
        const shoppingCartProductId = this.$store.getters.getterUserShoppingCartIndexes[this.$store.getters.getterUserShoppingCart.findIndex(product => product.id == id)]
        const isItemInShippingCart = this.$store.getters.getterUserShoppingCart.some((product) => {
          return product.id == id;
        });
        if (isItemInShippingCart) {
          await this.$store.dispatch("deleteItemFromUserShoppingCart", { id: shoppingCartProductId })
          this.shoppingCartIconColor = "#fff";
        } else {
          await this.$store.dispatch("addItemInUserShoppingCart", { id: id });
          this.shoppingCartIconColor = "#46A358";
        }
        await this.$store.dispatch("getUserShoppingCart", this.$store.getters.getUser.id);
      } else {
        errorTost("You must be authorize")
      }
    },
    async addWishTovar(id) {
      if (this.$store.getters.getUser?.id) {

        const wishId = this.$store.getters.getterUserWishlistIndexes[this.$store.getters.getterUserWishlist.findIndex(product => product.id == id)]
        const isItemInWishlist = this.$store.getters.getterUserWishlist.some((product) => {
          return product.id == id;
        });
        if (isItemInWishlist) {
          await this.$store.dispatch("deleteItemFromUserWishlist", { id: wishId })
          this.wishIconColor = "#fff";
        } else {
          await this.$store.dispatch("addItemInUserWishlist", { id: id });
          this.wishIconColor = "#46A358";
        }
        await this.$store.dispatch("getUserWishlist", this.$store.getters.getUser.id);
      } else {
        errorTost("You must be authorize")
      }

    }
  },
  computed: {
    wishIconColorComputed() {
      this.wishIconColor = this.$store.getters.getterUserWishlist.some((product) => {
        return product.id == this.item.id;
      }) ? "#46A358" : "#fff";
    },
    shoppingCartIconColorComputed() {
      this.shoppingCartIconColor = this.$store.getters.getterUserShoppingCart.some((product) => {
        return product.id == this.item.id;
      }) ? "#46A358" : "#fff";
    },
  },
  mounted() {
    setTimeout(() => {
      this.wishIconColorComputed;
      this.shoppingCartIconColorComputed;
    }, 0)

  }
}
</script>

<style scoped>
.image-scale-enter-active,
.image-scale-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.image-scale-enter-from,
.image-scale-leave-to {
  opacity: 0;
}

.icons-enter-active,
.icons-leave-active {
  transition: all 0.5s ease-in-out;
}

.icons-enter-from,
.icons-leave-to {
  opacity: 0;
}

.card-icon-wrapper {
  transition: background-color 0.3s ease-in-out;
  background: #FFF;
  margin-right: 15px;
  width: 35px;
  height: 35px;
}

.card-icons {
  position: absolute;
  display: flex;
  bottom: 2px;
}

.card-icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
}

.card-icon:hover {
  border-top: 1px solid #46A358;
}

.card-icon-wrapper:last-child {
  margin-right: 0;
}

.card:hover {
  border-top: 1px solid #46A358;
  cursor: pointer;
}

.sale-flag {
  position: absolute;
  color: #FFF;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  /* 100% */
  padding: 7px 9px;
  background: #46A358;
  top: 15px;
  left: 0;
  z-index: 5;
}

.card-image {
  width: 250px;
  height: 250px;
  object-fit: contain;
}

.price-sale-block {
  display: flex;
  align-items: center;
}

.card-sale-price {
  color: #A5A5A5;
  font-size: 18px;
  font-weight: 400;
  text-decoration: line-through;
}

.card-sale-block-price {
  margin-right: 15px;
}

.card-image-wrapper {
  margin-bottom: 12px;
  padding: 20px 4px 30px 4px;
  background: #FBFBFB;
  display: flex;
  justify-content: center;
  position: relative;
}

.card-title {
  color: #3D3D3D;
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 6px;
}

.card-price,
.card-sale-block-price {
  color: #46A358;
  font-size: 18px;
  font-weight: 700;
}
</style>