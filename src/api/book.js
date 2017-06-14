import callApi from './call_api';

export default {
  getAllBooks(page, tag) {
    let endpoint = 'v2/books';
    if (tag) {
      endpoint += `/${tag}`;
    }
    return callApi(endpoint);
  },
};
