import book from '../../api/book';
import * as types from '../mutation-types';

/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */

const state = {
  isFetching: false,
  items: [],
  page: 0,
  total: 0,
  selected: '',
};

const getters = {
  isFetching: state => state.isFetching,
  current: state => state.page + 1,
};

const actions = {
  getAllBooks({ commit }, { page = 0, tag = '' } = {}) {
    commit(types.FETCH_BOOKS_REQUEST, {
      page,
      tag,
    });
    return book.getAllBooks(page, tag).then(({ response, error }) => {
      if (error) {
        commit(types.FETCH_BOOKS_FAILURE);
      }
      commit(types.FETCH_BOOKS_SUCCESS, { response });
    });
  },
};

const mutations = {
  [types.FETCH_BOOKS_REQUEST](state, { page, tag }) {
    state.isFetching = true;
    state.page = page;
    state.selected = tag;
  },
  [types.FETCH_BOOKS_FAILURE](state) {
    state.isFetching = false;
  },
  [types.FETCH_BOOKS_SUCCESS](state, { response }) {
    state.items = response.books;
    state.total = response.total;
  },
};


const books = {
  state,
  getters,
  actions,
  mutations,
};

export default books;
