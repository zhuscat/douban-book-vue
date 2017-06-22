<template>
  <book-list
    :books="books"
    :tags="tags"
    :current="current"
    :total="total"
    :selected="selected"
    :sortType="sortType"
  />
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Tag from '../components/Tag.vue';
import BookList from '../components/BookList.vue';
import Paginator from '../components/Paginator.vue';

export default {
  name: 'home',
  components: {
    Tag,
    BookList,
    Paginator,
  },
  asyncData({ store, route }) {
    const tag = route.params.tag || '';
    const page = route.query.page ? route.query.page - 1 : 0;
    const sortType = route.query.sort ? route.query.sort : 'rating';
    const getBooksPromise = store.dispatch('getAllBooks', {
      tag,
      page,
      sortType,
    });
    const getTagsPromise = store.dispatch('getAllTags');
    return Promise.all([getBooksPromise, getTagsPromise]);
  },
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
    this.$bar.start();
    this.dataPromise.then(() => {
      this.$bar.finish();
    }).catch(() => {
      this.$bar.fail();
    });
  },
  watch: {
    $route(to) {
      const { asyncData } = this.$options;
      this.$bar.start();
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to,
        }).then(() => {
          this.$bar.finish();
        }).catch(() => {
          this.$bar.fail();
        });
      }
    },
  },
  computed: {
    ...mapState({
      books: state => state.books.items,
      total: state => state.books.total,
      tags: state => state.tags.items,
      selected: state => state.books.selected,
      sortType: state => state.books.sortType,
    }),
    ...mapGetters(['current']),
  },
};
</script>
