import callApi from './call_api';

export default {
  getTags() {
    return callApi('tags');
  },
};
