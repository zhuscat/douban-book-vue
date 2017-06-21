import book from '../../api/book';
import * as types from '../mutation-types';

/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */

const getters = {
  isFetching: state => state.isFetching,
  current: state => state.page + 1,
};

const actions = {
  getAllBooks({ commit }, { page = 0, tag = '', sortType = 'rating' } = {}) {
    commit(types.FETCH_BOOKS_REQUEST, {
      page,
      tag,
      sortType,
    });
    return book.getAllBooks(page, tag, sortType)
      .then((booksObj) => {
        commit(types.FETCH_BOOKS_SUCCESS, { booksObj });
      })
      .catch(() => {
        commit(types.FETCH_BOOKS_FAILURE);
      });
  },
};

const mutations = {
  [types.FETCH_BOOKS_REQUEST](state, { page, tag, sortType = 'rating' }) {
    state.isFetching = true;
    state.page = page;
    state.selected = tag;
    state.sortType = sortType;
  },
  [types.FETCH_BOOKS_FAILURE](state) {
    state.isFetching = false;
  },
  [types.FETCH_BOOKS_SUCCESS](state, { booksObj }) {
    state.items = booksObj.books;
    state.total = booksObj.total;
  },
};


const books = {
  state: () => ({
    isFetching: false,
    items: [],
    page: 0,
    total: 0,
    selected: '',
    sortType: 'rating',
  }),
  getters,
  actions,
  mutations,
};

export default books;
