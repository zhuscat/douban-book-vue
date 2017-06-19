<template>
  <book-list
    :books="books"
    :tags="tags"
    :current="current"
    :total="total"
    :selected="selected"
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
    const getBooksPromise = store.dispatch('getAllBooks', {
      tag,
      page,
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
  },
  watch: {
    $route(to) {
      const { asyncData } = this.$options;
      if (asyncData) {
        asyncData({
          store: this.$store,
          route: to,
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
    }),
    ...mapGetters(['current']),
  },
};
</script>
