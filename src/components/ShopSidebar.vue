<template>
  <div class="sidebar">
    <div class="categories">
      <h4 class="sidebar-title">Categories</h4>
      <div class="btns-section">
        <div class="btn-item " v-for="category in categories" :key="category.name">
          <button @click="filterCardsByCategories(category.name, $event)" class="sidebar-btn">{{ category.name
          }}</button>
          <p class="counter">({{ category.counter }})</p>
        </div>
      </div>
    </div>
    <div class="price">
      <h4 class="sidebar-title">Price Range</h4>
      <input v-model="price" step="2" min="0" :max="max" class="price-range " type="range" name="" id="">
      <span class="sidebar-descr">Price:</span><span class="price-numbers">{{ "$" + price }} - {{ "$" + max }}</span>
      <button @click.prevent="filtreCardsByPrice(price)" class="filter-btn">Filter</button>
    </div>
    <div class="size">
      <h4 class="sidebar-title">Size</h4>
      <div class="btn-item base" :ref="size.size" v-for="size in sizes" :key="size.size">
        <button @click="filterCardsBySizes(size.size, $event)" class="sidebar-btn">{{ size.size }}</button>
        <p class="counter">({{ size.counter }})</p>
      </div>
    </div>
    <div class="banner">
      <p class="first-title">Super Sale</p>
      <p class="second-title">UP TO 75% OFF</p>
      <div :style="{ background: bannerBackgroundImage }" class="image"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: ['itemsProps', 'clearActiveElement'],
  data() {
    return {
      activeElement: null,
      bannerBackgroundImage: "",
      categories: [
        {
          name: "House Plants",
        },
        {
          name: "Potter Plants",
        },
        {
          name: "Seeds",
        },
        {
          name: "Small Plants",
        },
        {
          name: "Big Plants",
        },
        {
          name: "Succulents",
        },
        {
          name: "Trerrariums",
        },
        {
          name: "Gardening",
        },
        {
          name: "Accessories",
        }
      ],
      sizes: [
        {
          size: "Small",
        },
        {
          size: "Medium",
        },
        {
          size: "Large"
        },
      ],
      price: 0,
      max: 2000
    }
  },
  methods: {
    filterCardsByCategories(name, event) {
      if (this.activeElement) {
        this.activeElement.classList.remove('active')
      }
      this.activeElement = event.target;
      this.activeElement.classList.add('active');
      const categoryName = name.replace(' ', '-').toLowerCase();
      const filteredProducts = [...this.itemsProps].filter(item => item.categories.includes(categoryName));
      this.$emit('filterProductsBy', filteredProducts);
    },
    filterCardsBySizes(title, event) {
      if (this.activeElement) {
        this.activeElement.classList.remove('active')
      }
      this.activeElement = event.target;
      this.activeElement.classList.add('active');
      const filteredProducts = [...this.itemsProps].filter(item => item.sizes.includes(title.toLowerCase()));
      this.$emit('filterProductsBy', filteredProducts);
    },
    filtreCardsByPrice() {
      const filteredProducts = [...this.itemsProps].filter(item => item.price >= this.price);
      this.$emit('filterProductsBy', filteredProducts);
      this.price = 0;
    }
  },
  mounted() {
    axios.get('http://localhost:1337/api/banners/3?populate=*').then(response => {
      this.bannerBackgroundImage = `url(http://localhost:1337${response.data.data.attributes.image.data[0].attributes.url}) center no-repeat`;
    }).catch(error => {
      console.log(error);
    })
    axios.get('http://localhost:1337/api/categories?populate=*').then(response => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.categories[i]['counter'] = response.data.data[i].attributes.products.data.length;
      }
    }).catch(error => {
      console.log(error);
    });
    axios.get('http://localhost:1337/api/sizes?populate=*').then(response => {
      for (let i = 0; i < response.data.data.length; i++) {
        this.sizes[i]['counter'] = response.data.data[i].attributes.products.data.length;
      }
    }).catch(error => {
      console.log(error);
    })
  }
}
</script>

<style scoped>
.sidebar {
  background: #FBFBFB;
}

.banner {
  background: linear-gradient(180deg, rgba(70, 163, 88, 0.10) 0%, rgba(70, 163, 88, 0.03) 100%);
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.first-title {
  color: #46A358;
  font-size: 45px;
  font-weight: 700;
  line-height: 65px;
  text-align: center;
  margin-bottom: 11px;
  /* 100% */
}

.second-title {
  color: #3D3D3D;
  text-align: center;
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 6px;
}

.image {
  width: 370px;
  height: 370px;
  mix-blend-mode: multiply;

}

.sidebar-title {
  color: #3D3D3D;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 15px;
}

.categories {
  padding: 15px 25px 20px 18px;
  margin-bottom: 35px;
}

.btns-section {
  padding-left: 12px;
}

.btn-item {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 15px;
  color: #3D3D3D;
}

.active {
  color: #46A358;
}

.sidebar-btn {
  padding: 0;
  cursor: pointer;
}

.price {
  padding: 0 25px 0 18px;
  margin-bottom: 45px;
}

.size {
  padding: 0 25px 0 18px;

}

.price-range {
  display: block;
  margin-bottom: 20px;
}

.price-descr {
  color: #3D3D3D;
  font-size: 15px;
  font-style: normal;
}

.price-numbers {
  color: #46A358;
  font-size: 15px;
  font-weight: 700;
}

.filter-btn {
  display: block;
  margin-top: 16px;
  color: #FFF;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 25px;
  border-radius: 6px;
  background: #46A358;
  cursor: pointer;
}

input[type=range] {
  width: 210px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
  overflow: hidden;
  height: 10px;
  border-radius: 15px;
}

input[type=range]::-webkit-slider-runnable-track {
  height: 10px;
  background-color: rgba(70, 163, 88, 0.20);
}

input[type=range]::-webkit-slider-thumb {
  background: #46A358;
  cursor: pointer;
  width: 15px;
  height: 15px;
  border: 3px solid #fff;
  border-radius: 50%;
  -webkit-appearance: none;
  margin-top: -3px;
  box-shadow: -200px 0 0 195px#46A358;
}
</style>