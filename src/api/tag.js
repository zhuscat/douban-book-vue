export default {
  getTags() {
    return fetch('http://localhost:3000/api/tags')
      .then(response => response.json().then(json => ({ json, response })))
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
      .then(
        response => ({ response }),
        error => ({ error: error || 'Something bad happened' }),
      );
  },
};
