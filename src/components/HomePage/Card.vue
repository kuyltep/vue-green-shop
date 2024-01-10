<template>
  <div @mouseenter="showIcons = true" @mouseleave="showIcons = false" class="card">
    <div v-if="item.sale" class="sale-flag">{{ item.sale }}% OFF</div>
    <div class="card-image-wrapper">
      <img :src="'http://localhost:1337' + item.image.data[0].attributes.url" alt="" class="card-image">
      <transition name="icons">
        <div v-show="showIcons" class="card-icons">
          <div class="card-icon-wrapper">
            <button @click.prevent="" class="card-icon chunk"
              :style="{ background: `url(${icons[0].image}) center no-repeat`, backgroundSize: '20px 20px' }"></button>
          </div>
          <div class="card-icon-wrapper">
            <button @click.prevent="" class="card-icon hearth"
              :style="{ background: `url(${icons[1].image}) center no-repeat`, backgroundSize: '20px 20px' }"></button>
          </div>
          <div class="card-icon-wrapper">
            <button @click.prevent="" class="card-icon search"
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
export default {
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
    }
  },
  methods: {
    calcSale(price, sale) {
      return Math.floor(price / 100 * (100 - sale));
    }
  },

}
</script>

<style scoped>
.card {
  position: relative;
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