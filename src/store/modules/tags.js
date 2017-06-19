import tag from '../../api/tag';
import * as types from '../mutation-types';

/* eslint no-param-reassign: "off" */
/* eslint no-shadow: "off" */

const actions = {
  getAllTags({ commit }) {
    commit(types.FETCH_TAGS_REQUEST);
    tag.getTags()
      .then((tags) => {
        commit(types.FETCH_TAGS_SUCCESS, { tags });
      })
      .catch(() => {
        commit(types.FETCH_TAGS_FAILURE);
      });
  },
};

const mutations = {
  [types.FETCH_TAGS_REQUEST](state) {
    state.isFetching = true;
  },
  [types.FETCH_TAGS_SUCCESS](state, { tags }) {
    state.isFetching = false;
    state.items = tags;
  },
  [types.FETCH_TAGS_FAILURE](state) {
    state.isFetching = false;
    state.items = [];
  },
};

export default {
  state: () => ({
    isFetching: false,
    items: [],
  }),
  actions,
  mutations,
};
