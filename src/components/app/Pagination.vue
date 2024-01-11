<template>
  <paginate v-model="pageNumber" class="pagination-block" :page-count="this.$store.getters.getPagesCounter"
    :initial-page="1" :page-range="3" :margin-pages="3" :click-handler="changePage" :prev-text="'<'" :next-text="'>'"
    :container-class="'pagination'" :page-class="'page-item'" :active-class="'active-item-pagination'"
    :hide-prev-next="true">
  </paginate>
</template>

<script>
import Paginate from "vuejs-paginate-next";

export default {
  components: {
    Paginate,
  },
  data() {
    return {
      pageNumber: 1,
    }
  },
  methods: {
    changePage(value) {
      this.$emit('changePage', value);
    }
  },
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: flex-end;
  list-style: none;
  padding-right: 20px;
}

.active-item-pagination {
  color: #FFF;
  font-size: 18px;
  font-weight: 700;
  background: #46A358;

}

.page-item {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #E5E5E5;
  padding: 10px 12px;
  font-size: 18px;
  font-weight: 400;
  line-height: 16px;
  margin-right: 10px;
}

.page-item:hover {
  cursor: pointer;
}

.page-item:last-child {
  margin-right: 0;
}
</style>