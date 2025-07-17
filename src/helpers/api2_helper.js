import axios from 'axios';

// default
axios.defaults.baseURL = process.env.REACT_APP_TELMX_API_URL;
const axiosApis = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

// content type
const getLoggedinUser = () => {
  const user = localStorage.getItem('authUser');
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

const loggedInUser = getLoggedinUser();

const token = loggedInUser ? loggedInUser.token : null;

if (loggedInUser) {
  axiosApis.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// intercepting to capture errors
axiosApis.interceptors.response.use(
  function (response) {
    // Your success handling remains unchanged
    return response.data ? response.data : response;
  },
  function (error) {
    let message;
    if (error.response) {
      // Extracting the status code from the error response
      const status = error.response.status;
      // Assuming the custom message is sent in a `message` field in the JSON response
      const customMessage = error.response.data.message;

      switch (status) {
        case 500:
          message = customMessage || 'Internal Server Error';
          break;
        case 400:
          message = customMessage || 'Bad Request';
          break;
        case 401:
          message = customMessage || 'Invalid username or password!';
          setTimeout(() => {
            window.location.href = '/logout';
          }, 1000);
          break;
        case 404:
          message =
            customMessage ||
            'Sorry! the data you are looking for could not be found';
          break;
        default:
          message = customMessage || 'An unexpected error occurred';
      }
    } else {
      // Handling cases where the error does not come from a server response
      message = error.message || 'An unexpected error occurred';
    }

    // Logging the error message for debugging purposes
    console.error('Error message:', message);

    // Reject the promise with the extracted message
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorizationAPI2 = (user) => {
  const token = user ? user.token : null;
  axiosApis.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

class API2Client {
  get = (url, params) => {
    let response;
    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + '=' + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join('&') : '';
      response = axiosApis.get(`${url}?${queryString}`, params);
    } else {
      response = axiosApis.get(`${url}`, params);
    }
    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data, config) => {
    if (config) return axiosApis.post(url, data, config);
    else return axiosApis.post(url, data);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axiosApis.put(url, data);
  };

  put = (url, data) => {
    return axiosApis.put(url, data);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axiosApis.delete(url, { ...config });
  };
}

export { API2Client, setAuthorizationAPI2 };
