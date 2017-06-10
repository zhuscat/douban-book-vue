<template>
  <ul class="db-pagination">
    <pagination-item
      type="prev"
      :current="current"
      @item-click="pageChange"
    />
    <pagination-item
      v-for="(page, index) in pageList"
      :key="index"
      :type="page === -1 ? 'dots' : 'page'"
      :page="page"
      :current="current"
      @item-click="pageChange"
    />
    <pagination-item
      type="next"
      :current="current"
      @item-click="pageChange"
    />
  </ul>
</template>

<script>
import { calcPageList } from '@/utils/calc-page-list';
import PaginationItem from './PaginationItem';

export default {
  name: 'paginator',
  components: {
    PaginationItem,
  },
  props: ['current', 'total', 'pageSize'],
  methods: {
    pageChange(page) {
      this.$emit('change', page);
      // eslint-disable-next-line
      console.log(page);
    },
  },
  computed: {
    pageList() {
      return calcPageList(this.current, this.total, this.pageSize);
    },
  },
};

</script>

<style lang="scss">

</style>
