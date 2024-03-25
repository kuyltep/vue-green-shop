<template>
  <div class="card">
    <div class="description-section">
      <img :src="'http://localhost:1337' + item.image.data[0].attributes.url" alt="" class="product-img">
      <div class="product-description">
        <h4 class="product-title">{{ item.name }}</h4>
        <p class="product-id"><span class="product-title-id">ID:</span> {{ item.id }}</p>
      </div>
    </div>
    <div class="price-section">
      <p v-if="!item.sale" class="product-price">{{ item.price }}$</p>
      <div v-else class="price-section_sale">
        <p class="product-price_sale">{{ (item.price * (100 - item.sale) / 100).toFixed(0) }}$</p>
        <p class="product-price product-price_no-sale">{{ item.price }}$</p>
      </div>
    </div>
    <div class="quantity-section">
      <button @click.prevent="changeProductCounter('decrement')" class="remove-product-button product-button">-</button>
      <p class="product-quantity">{{ productQuantity }}</p>
      <button @click.prevent="changeProductCounter('increment')" class="add-product-button product-button">+</button>
    </div>
    <div class="total-section">
      <p class="product-total">{{ item?.sale ? (item.price * (100 - item.sale) / 100).toFixed(0) * productQuantity :
        item.price *
        productQuantity }}$</p>
    </div>
    <button @click.prevent="deleteProductFromShoppingCart"
      :style="{ 'background': `url(${this.$store.getters.getCardIcons[3].image}) no-repeat` }"
      class="product-delete"></button>
  </div>
</template>

<script>
import errorTost from '@/toasts-plugins/error.tost';
export default {
  props: {
    item: Object
  },
  data() {
    return {
      productQuantity: 1,
    }
  },
  methods: {
    changeProductCounter(operation) {
      if (operation === 'decrement') {
        if (this.productQuantity > 1) {
          this.productQuantity -= 1;
          this.$store.dispatch('updateProductQuantityInShoppingCart', { id: this.item.id, qty: this.productQuantity });
        } else {
          errorTost('Counter must be more 0')
        }
      } else if (operation === 'increment') {
        if (this.productQuantity < 10) {
          this.productQuantity += 1;
          this.$store.dispatch('updateProductQuantityInShoppingCart', { id: this.item.id, qty: this.productQuantity });
        } else {
          errorTost('Counter must be less 11')
        }
      }
      //TODO: Made emit event to update prices on the shopping cart sidebar

    },
    async deleteProductFromShoppingCart() {
      const shoppingCartProductId = this.$store.getters.getterUserShoppingCartIndexes[this.$store.getters.getterUserShoppingCart.findIndex(product => product.id == this.item.id)]
      await this.$store.dispatch("deleteItemFromUserShoppingCart", { id: shoppingCartProductId });
    }
  },
  computed: {
    calcProductQty() {
      this.productQuantity = +this.$store.getters.getterUserShoppingCartProductsQuantitites[this.item.id];
    }
  },
  mounted() {
    setTimeout(() => {
      this.calcProductQty;
    }, 0)
  }
}
</script>

<style scoped>
.card {
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  height: 70px;
  margin-bottom: 10px;
  background: #fbfbfb;
}

.description-section {
  display: grid;
  grid-template-columns: 70px 1fr;
  grid-column-gap: 15px;
}

.product-description {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.product-img {
  width: 70px;
  height: 70px;
}

.product-title {
  font-size: 16px;
  color: #3D3D3D;
  font-weight: 500;
}

.product-id {
  font-size: 14px;
  color: #727272;
}

.product-title-id {
  font-size: 14px;
  color: #A5A5A5;
}

.price-section {
  display: flex;
  align-items: center;
}

.product-price {
  font-size: 16px;
  color: #727272;
  font-weight: 500;
}

.product-price_no-sale {
  text-decoration: line-through;
}

.product-price_sale {
  font-size: 16px;
  color: #46A358;
  font-weight: 500;
}

.total-section {
  display: flex;
  align-items: center;
}

.product-total {
  font-size: 16px;
  font-weight: 700;
  color: #46A358;
}

.quantity-section {
  display: flex;
  align-items: center;
}

.product-button {
  width: 25px;
  height: 25px;
  background: #46A358;
  color: #fff;
  font-weight: 700;
  border-radius: 50%;
  cursor: pointer;
}

.product-button:hover {
  transform: scale(1.1);
  transition: transform .2s ease-in-out;
}

.add-product-button {
  margin-left: 10px;
}

.remove-product-button {
  margin-right: 10px;
}

.product-delete {
  border: none;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 15px;
  bottom: 20px;
  cursor: pointer;
}

.product-delete:hover {
  transform: scale(1.1);
  transition: transform .2s ease-in-out;
}
</style>