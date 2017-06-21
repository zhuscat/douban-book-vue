import callApi from './call_api';

export default {
  getAllBooks(page, tag, sortType = 'rating') {
    let endpoint = 'v2/books';
    if (tag) {
      endpoint += `/${tag}?page=${page}&sort=${sortType}`;
    } else {
      endpoint += `?page=${page}&sort=${sortType}`;
    }
    return callApi(endpoint);
  },
};
