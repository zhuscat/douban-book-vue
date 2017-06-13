export default {
  getAllBooks(page, tag) {
    let endpoint = 'http://localhost:3000/api/v2/books';
    if (tag) {
      endpoint += `/${tag}`;
    }
    return fetch(`${endpoint}?page=${page}`)
      .then(response =>
        response.json().then(json => ({ json, response })),
      )
      .then(({ json, response }) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
      .then(
        response => ({ response }),
        error => ({ error: error.message || 'Something bad happened' }),
      );
  },
};
