const API_URL = 'http://82.29.172.74:3000';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.errors ? data.errors.map(err => Object.values(err).join(', ')).join(', ') : data.error;
    throw new Error(errorMsg || `Request failed with status ${response.status}`);
  }

  return data.data;
};
