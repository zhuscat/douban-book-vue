import Vue from 'vue';
import Vuex from 'vuex';
import books from './modules/books';
import tags from './modules/tags';

/* eslint no-param-reassign: "off" */

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

export default function createStore() {
  return new Vuex.Store({
    actions: {},
    getters: {},
    modules: {
      books,
      tags,
    },
  });
}
