const fetchAPI = (url, data) => fetch(url, data)
  .then(r => r.json())
  .catch(ex => console.log(ex));

const request = (url, body, method = 'GET', needToken = false) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (needToken) {
    const token = localStorage.getItem('token');
    headers.Authorization = token;
  }
  if (method === 'GET') {
    return fetchAPI(url, { headers });
  }
  return fetchAPI(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
};

const sendFormData = (url, body, method = 'POST') => {
  const headers = {
    Accept: 'application/json',
    Authorization: localStorage.getItem('token'),
  };
  const data = new FormData();
  Object.entries(body).forEach((e) => {
    if (Array.isArray(e[1])) {
      e[1].forEach(elem => data.append(`${e[0]}[]`, elem));
    } else {
      data.append(e[0], e[1]);
    }
  });
  return fetchAPI(url, {
    method,
    headers,
    body: data,
  });
};

export { request, sendFormData };
