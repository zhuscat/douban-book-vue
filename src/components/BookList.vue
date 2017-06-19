<template>
  <div class="db-container">
    <div class="db-tag-container">
      <tag
        name="全部"
        to="/"
        :selected="selected === ''"
      />
      <tag
        v-for="tag in tags"
        :key="tag._id"
        :name="tag._id"
        :to="decodeURIComponent(tag._id)"
        :selected="decodeURIComponent(tag._id) === decodeURIComponent(selected)"
      />
    </div>
    <div class="db-sort-container"></div>
    <div class="db-book-container">
      <book-item
        v-for="(item, index) in books"
        :key="item._id"
        :picUrl="item.picUrl"
        :rating="item.rating"
        :title="item.title"
        :author="item.author"
      />
    </div>
    <div style="text-align: center;">
      <paginator
        :current="current"
        :total="total"
        :page-size="20"
        @change="paginationChange"
      />
    </div>
  </div>
</template>

<script>
import BookItem from './BookItem.vue';
import Tag from './Tag.vue';
import Paginator from './Paginator.vue';

export default {
  name: 'book-list',
  props: ['books', 'tags', 'current', 'total', 'selected'],
  components: {
    BookItem,
    Tag,
    Paginator,
  },
  beforeUpdate() {
  },
  methods: {
    paginationChange(page) {
      this.$router.push({ query: { page } });
    },
  },
};
</script>

<style lang="scss">
.db-container {
  width: 1024px;
  margin: 0 auto;
}

.db-book-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.db-sort-container {
  margin-bottom: 32px;
  display: flex;
  justify-content: flex-end;
}

.db-tag-container {
  margin-bottom: 18px;
}
</style>
