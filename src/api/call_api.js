const API_ROOT = 'http://localhost:3000/api/';

const getQueryString = (args) => {
  if (typeof args !== 'object') {
    throw new Error('Expected an object.');
  }
  const qs = Object.keys(args).map(key => `${key}=${args[key]}`).join('&');
  return `?${qs}`;
};

// data.query
// data.body
const callApi = (endpoint, method = 'GET', data = {}) => {
  let fullUrl = API_ROOT + endpoint;
  if (data.query) {
    fullUrl += getQueryString(data.query);
  }
  let request;
  if (method === 'GET' || method === 'DELETE') {
    const headers = {};
    request = new Request(fullUrl, {
      method,
      headers: new Headers(headers),
    });
  } else {
    const headers = {
      'Content-Type': 'application/json',
    };
    request = new Request(fullUrl, {
      method,
      headers: new Headers(headers),
      body: data.body ? JSON.stringify(data.body) : '',
    });
  }
  return fetch(request)
    .then(response =>
      response.json().then((json) => {
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      }));
};

export default callApi;
