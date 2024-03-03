<template>
  <div class="sections-with-cards">
    <div class="cards-header">
      <div class="cards-links">
        <button ref="active" @click="filterByHeader('all-plants', $event)" class="cards-filter-btn active">All
          Plants</button>
        <button class="cards-filter-btn" @click="filterByHeader('new-arrivals', $event)">New Arrivals</button>
        <button class="cards-filter-btn" @click="filterByHeader('sale', $event)">Sale</button>
      </div>
      <div class="select-div">
        <label for="sort" class="select-label">Sort by: </label>
        <select @change="selectChangeSort($event)" class="select-filter" name="sort" id="">
          <option ref="default" value="default">Default sorting</option>
          <option value="name">Name</option>
          <option value="priceUp">Price &uarr;</option>
          <option value="priceDown">Price &darr;</option>
        </select>
      </div>
    </div>
    <transition-group tag="div" name="cards" class="cards">
      <Card v-for="item in items" :key="item.id" :item="item" :icons="cardIcons"></Card>
    </transition-group>
    <Pagination :pageCount="this.$store.getters.getPagesCounter" @changePage="changePaginationPage"></Pagination>
  </div>
</template>

<script>
import Pagination from "@/components/app/Pagination.vue";
import Card from './Card.vue'
export default {
  components: {
    Card,
    Pagination,
  },
  props: ['itemsProps'],
  data() {
    return {
      items: this.itemsProps,
      activeElement: this.$refs['active'],
      defaultItems: this.items,
      cardIcons: [],
      pageSize: 3,
      pageNumber: 1,
      pagesCounter: null,
    }
  },
  methods: {
    //TODO!! Made correctly filter default on new and sale pages
    filterByHeader(title, event) {
      this.$refs.active.classList.remove('active')
      this.$refs.default.selected = true;
      if (this.activeElement) {
        this.activeElement.classList.remove('active')
      }
      this.activeElement = event.target;
      this.activeElement.classList.add('active');
      this.defaultItems = this.items = title === 'all-plants' ? this.$store.getters.getProducts : title === 'new-arrivals' ? this.getNewProducts() : title === 'sale' ? this.getSaleProducts() : [];
      this.$emit('filterByHeader');
    },
    selectChangeSort(event) {
      this.items = event.target.value === 'default' ? this.defaultItems : event.target.value === 'name' ? this.getProductsSortedByName() : event.target.value === 'priceUp' ? this.getProductsSortedByPriceUp() : event.target.value === 'priceDown' ? this.getProductsSortedByPriceDown() : [];
    },
    getProductsSortedByName() {
      return [...this.items].sort((a, b) => a.name.localeCompare(b.name));
    },
    getProductsSortedByPriceUp(state) {
      return [...this.items].sort((a, b) => a.price - b.price);
    },
    getProductsSortedByPriceDown(state) {
      return [...this.items].sort((a, b) => b.price - a.price);
    },
    getNewProducts() {
      return [...this.$store.getters.getProducts].filter((product) => product.new);
    },
    getSaleProducts() {
      return [...this.$store.getters.getProducts].filter((product) => product.sale);
    },
    changePaginationPage(value) {
      this.$emit('changePaginationPage', value);
    }
  },
  watch: {
    itemsProps() {
      this.items = this.itemsProps;
    }
  },
  async mounted() {
    setTimeout(() => {
      this.items = this.itemsProps;
      this.defaultItems = this.items;
    }, 1000);
    await this.$store.dispatch('getCardIcons');
    this.cardIcons = this.$store.getters.getCardIcons;
  }
}
</script>

<style scoped>
.cards-header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 35px;
  margin-bottom: 30px;
}

.cards-links {
  grid-column: 1/2;
}

.cards-filter-btn,
.select-div {
  padding: 0;
  color: #3D3D3D;
  font-size: 15px;
  font-weight: 400;
  margin-right: 38px;
  cursor: pointer;
}

.cards-move {
  transform: translateY(-40px);
  transition: transform .8s ease-in-out;
  opacity: 0.7;
}

.cards-enter-active,
.cards-leave-active {
  transition: all .8s ease-in-out;
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.cards-filter-btn:last-child {
  margin-right: 0;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 70px;
  grid-column-gap: 35px;
  margin-bottom: 90px;
}

.active {
  color: #46A358;
  font-weight: 700;
  line-height: 16px;
  border-bottom: 2px solid #46A358;
  padding-bottom: 7px;
}

.select-div {
  grid-column: 3/4;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.select-label {
  margin-right: 8px;
}

.select-filter {
  border: none;
}

.select-filter:focus {
  outline: none;
}
</style>