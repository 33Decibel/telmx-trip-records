export const setLocalStorageFilter = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorageFilter = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
