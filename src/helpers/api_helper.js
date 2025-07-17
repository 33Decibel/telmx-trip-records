import axios from 'axios';

// Set the default base URL
axios.defaults.baseURL = process.env.REACT_APP_SSO_API_URL;

// Create Axios instance
const axiosApis = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

// Function to get the logged-in user
const getLoggedinUser = () => {
  const user = localStorage.getItem('authUser');
  return user ? JSON.parse(user) : null;
};

// Function to set the Authorization token dynamically
const setAuthorization = (token) => {
  if (token) {
    axiosApis.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosApis.defaults.headers.common['Authorization'];
  }
};

// Intercept requests to add Authorization token dynamically
axiosApis.interceptors.request.use(
  (config) => {
    const loggedInUser = getLoggedinUser();
    const token = loggedInUser ? loggedInUser.token : null;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Intercept responses to handle errors
axiosApis.interceptors.response.use(
  (response) => response.data || response,

  (error) => {
    // console.log('AXIOS ERROR INTERCEPTOR:', error); // Ensure we capture all errors
    if (!error.response) {
      console.error('ERROR: No response received!', error);
      return Promise.reject('Network error! Check your connection.');
    }

    const status = error.response.status;
    // console.log('ERRROR', error.response); // Log full response for debugging

    let message;
    if (error.response.data?.message) {
      message = error.response.data.message; // Extract API error message
    } else {
      switch (status) {
        case 500:
          message = 'Internal Server Error';
          break;
        case 400:
          message = error.response.data?.message || 'Bad Request';
          break;
        case 401:
          message = 'Unauthorized request!';
          setTimeout(() => {
            window.location.href = '/logout';
          }, 1000);
          break;
        case 404:
          message = 'Sorry! The data you are looking for could not be found';
          break;
        default:
          message = error.message || 'An error occurred';
      }
    }

    return Promise.reject(message);
  }
);

class APIClient {
  get = (url, params) => {
    const queryString = params
      ? Object.keys(params)
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join('&')
      : '';
    return axiosApis.get(queryString ? `${url}?${queryString}` : url);
  };

  create = (url, data) => axiosApis.post(url, data);

  update = (url, data) => axiosApis.put(url, data);

  put = (url, data) => axiosApis.put(url, data);

  delete = (url, config) => axiosApis.delete(url, { ...config });
}

const getSelectedPortal = () => {
  const loggedInUser = getLoggedinUser();
  return loggedInUser ? loggedInUser.selectedPortal : null;
};

const getSelectedClient = () => {
  const selectedClient = localStorage.getItem('selectedClient');
  return selectedClient && selectedClient !== 'undefined'
    ? JSON.parse(selectedClient)
    : null;
};

export {
  APIClient,
  setAuthorization,
  getLoggedinUser,
  getSelectedPortal,
  getSelectedClient,
};
