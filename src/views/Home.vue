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
  },
  beforeMount() {
    // eslint-disable-next-line
    this.current = this.$route.query.page ? this.$route.query.page - 1 : 0;
    this.selected = this.$route.params.tag ? decodeURIComponent(this.$route.params.tag) : '';
  },
  mounted() {
    console.log('can i get route info');
    console.log(this.$route);
    // TODO: need to be improved
    let booksEndpoint = '';
    if (this.selected === '') {
      booksEndpoint = 'http://localhost:3000/api/v2/books';
    } else {
      booksEndpoint = `http://localhost:3000/api/v2/books/${decodeURIComponent(this.selected)}`;
    }
    booksEndpoint += `?page=${this.current}`;

    fetch(booksEndpoint)
      .then(res => res.json())
      .then((json) => {
        this.books = json.books;
        this.total = json.total;
      })
      .catch(() => {
        this.books = [];
      });
    fetch('http://localhost:3000/api/tags')
      .then(res => res.json())
      .then((json) => {
        this.tags = json;
      })
      .catch(() => {
        this.tags = [];
      });
  },
  beforeUpdate() {
    // eslint-disable-next-line
    console.log('before update');
  },
  updated() {
    // eslint-disable-next-line
    console.log('updated');
  },
  data() {
    return {
      books: [],
      tags: [],
      selected: '',
      current: 0,
      total: 0,
    };
  },
  watch: {
    $route(to, from) {
      console.log(to);
      console.log(from);
      let booksEndpoint = '';
      if (to.params.tag) {
        booksEndpoint = `http://localhost:3000/api/v2/books/${decodeURIComponent(to.params.tag)}`;
      } else {
        booksEndpoint = 'http://localhost:3000/api/v2/books';
      }
      const page = to.query.page ? to.query.page - 1 : 0;
      booksEndpoint += `?page=${page}`;
      this.current = page;
      this.selected = to.params.tag ? to.params.tag : '';

      fetch(booksEndpoint)
        .then(res => res.json())
        .then((json) => {
          this.books = json.books;
          this.total = json.total;
        })
        .catch(() => {
          this.books = [];
        });
    },
  },
};
</script>
