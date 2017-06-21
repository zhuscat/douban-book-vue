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
    <div class="db-sort-container">
      <router-link :class="ratingClass" :to="ratingLocation">
        评分
      </router-link>
      <router-link :class="ratingPeopleClass" :to="ratingPeopleLocation">
        人数
      </router-link>
    </div>
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
  props: ['books', 'tags', 'current', 'total', 'selected', 'sortType'],
  components: {
    BookItem,
    Tag,
    Paginator,
  },
  methods: {
    paginationChange(page) {
      this.$router.push({ query: Object.assign({}, this.$route.query, { page }) });
    },
  },
  computed: {
    ratingLocation() {
      return {
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, {
          sort: 'rating',
        }),
      };
    },
    ratingPeopleLocation() {
      return {
        path: this.$route.path,
        query: Object.assign({}, this.$route.query, {
          sort: 'ratingPeople',
        }),
      };
    },
    ratingClass() {
      return {
        'db-sort-tag': true,
        'db-sort-tag--active': this.sortType === 'rating',
      };
    },
    ratingPeopleClass() {
      return {
        'db-sort-tag': true,
        'db-sort-tag--active': this.sortType === 'ratingPeople',
      };
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

.db-sort-tag {
  font-size: 12px;
  color: #999;
  margin-right: 18px;
  cursor: pointer;

  &:hover {
    color: #666;
  }
}

.db-sort-tag--active {
  color: #00b51d;
}

.db-tag-container {
  margin-bottom: 18px;
}
</style>
