<template>
  <div class="book-item" @click="click">
    <div class="book-item__cover">
      <img :src="picUrl" :alt="title" />
    </div>
    <div class="book-item__info">
      <span class="book-item__title">{{ title }}</span>
      <span class="book-item__author">{{ author }}</span>
      <span class="book-item__rating">{{ rating }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'book-item',
  props: ['picUrl', 'rating', 'title', 'author'],
  methods: {
    click() {
      this.$emit('click', 'a', 'b');
    },
  },
};
</script>

<style lang="scss">
.book-item {
  width: 148px;
  margin-bottom: 18px;
  margin-left: 18px;
  margin-right: 18px;
  cursor: pointer;
}

.book-item__cover {
  width: 148px;
  height: 198px;
  margin-bottom: 18px;
  border-radius: 4px;
  box-shadow: 0 9px 18px 0 rgba(0,0,0,.24);
  display: block;
  overflow: hidden;
  transition: 0.25s all;

  img {
    width: 148px;
    font-size: 0;
    min-height: 198px;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px 0 rgba(0,0,0,.48);
  }
}

.book-item__title {
  color: #222;
  font-size: 12px;
  display: block;
  text-overflow: ellipsis;
  word-wrap: normal;
  white-space: nowrap;
  overflow: hidden;
}

.book-item__author {
  color: #999;
  font-size: 12px;
  display: block;
}

.book-item__rating {
  color: #999;
  font-size: 12px;
  display: block;
}
</style>
