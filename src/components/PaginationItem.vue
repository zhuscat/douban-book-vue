<template>
  <li
    v-if="type === 'page'"
    :class="page === current ? 'db-pagination-item--active' : 'db-pagination-item'"
    @click="itemClick"
  >
    {{ page }}
  </li>
  <li
    v-else-if="type === 'prev'"
    class="db-pagination-item"
    @click="prev"
  >
    &lt;
  </li>
  <li
    v-else-if="type === 'next'"
    class="db-pagination-item"
    @click="next"
  >
    &gt;
  </li>
  <li
    v-else-if="type === 'dots'"
    class="db-pagination-item"
  >
    ...
  </li>
</template>

<script>
export default {
  name: 'pagination-item',
  props: ['current', 'page', 'type'],
  methods: {
    itemClick() {
      this.$emit('item-click', this.page);
    },
    next() {
      this.$emit('item-click', this.current + 1);
    },
    prev() {
      this.$emit('item-click', this.current - 1);
    },
  },
};
</script>

<style lang="scss">
.db-pagination-item {
  width: 32px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin: 8px;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 2px;
  color: #666;
  display: inline-block;
}

.db-pagination-item--active {
  @extend .db-pagination-item;
  background-color: #00b51d;
  border: 1px solid #00b51d;
  color: #fff;
}
</style>
