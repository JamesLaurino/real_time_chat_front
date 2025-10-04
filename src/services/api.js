const API_URL =
    window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : '/api';


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
