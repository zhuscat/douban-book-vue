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
import Tag from '@/components/Tag';
import BookList from '@/components/BookList';
import Paginator from '@/components/Paginator';

export default {
  name: 'home',
  components: {
    Tag,
    BookList,
    Paginator,
  },
  methods: {
    itemClick(page) {
      // eslint-disable-next-line
      console.log(page);
    },
  },
  beforeCreate() {
    // eslint-disable-next-line
    console.log('before created');
  },
  created() {
    // eslint-disable-next-line
    console.log('created');
    const tag = this.$route.params.tag || '';
    const page = this.$route.query.page ? this.$route.query.page - 1 : 0;
    this.$store.dispatch('getAllBooks', {
      tag,
      page,
    });
    this.$store.dispatch('getAllTags');
  },
  beforeMount() {
  },
  mounted() {
    console.log('can i get route info');
    console.log(this.$route);
    // TODO: need to be improved
    // let booksEndpoint = '';
    // if (this.selected === '') {
    //   booksEndpoint = 'http://localhost:3000/api/v2/books';
    // } else {
    //   booksEndpoint = `http://localhost:3000/api/v2/books/${decodeURIComponent(this.selected)}`;
    // }
    // booksEndpoint += `?page=${this.current}`;

    // fetch(booksEndpoint)
    //   .then(res => res.json())
    //   .then((json) => {
    //     this.books = json.books;
    //     this.total = json.total;
    //   })
    //   .catch(() => {
    //     this.books = [];
    //   });
    // fetch('http://localhost:3000/api/tags')
    //   .then(res => res.json())
    //   .then((json) => {
    //     this.tags = json;
    //   })
    //   .catch(() => {
    //     this.tags = [];
    //   });
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('before update');
  },
  updated() {
    // eslint-disable-next-line
    console.log('updated');
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
  watch: {
    $route(to) {
      const tag = to.params.tag || '';
      const page = to.query.page ? to.query.page - 1 : 0;
      this.$store.dispatch('getAllBooks', {
        page,
        tag,
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next(() => {
      console.log('beforeRouteEnter');
    });
  },
};
</script>
