<template>
  <router-link :class="selected ? 'db-tag--active' : 'db-tag'" :to="to">
    {{ name }}
  </router-link>
</template>

<script>
export default {
  name: 'tag',
  props: ['name', 'selected', 'to'],
};
</script>

<style lang="scss">
.db-tag {
  display: inline-block;
  font-size: 12px;
  line-height: 28px;
  height: 28px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 14px;
  border: 1px solid #00b51d;
  color: #00b51d;
  cursor: pointer;
  transition: all 0.25s;
  margin: 8px;
  text-decoration: none;

  &--active {
    @extend .db-tag;
    background-color: #00b51d;
    color: #fff;
  }

  &:hover {
    background-color: #00b51d;
    color: #fff;
  }
}
</style>
