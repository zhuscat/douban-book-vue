import tag from '../../api/tag';
import * as types from '../mutation-types';

/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */

const state = {
  isFetching: false,
  items: [],
};

const actions = {
  getAllTags({ commit }) {
    commit(types.FETCH_TAGS_REQUEST);
    tag.getTags().then(({ response, error }) => {
      if (error) {
        commit(types.FETCH_TAGS_FAILURE);
      }
      commit(types.FETCH_TAGS_SUCCESS, { response });
    });
  },
};

const mutations = {
  [types.FETCH_TAGS_REQUEST](state) {
    state.isFetching = true;
  },
  [types.FETCH_TAGS_SUCCESS](state, { response }) {
    console.log('成功获取 tags');
    state.isFetching = false;
    state.items = response;
  },
  [types.FETCH_TAGS_FAILURE](state) {
    state.isFetching = false;
    state.items = [];
  },
};

export default {
  state,
  actions,
  mutations,
};
