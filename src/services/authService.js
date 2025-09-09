const API_URL = 'http://localhost:3000/auth';

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.errors ? data.errors.map(err => Object.values(err).join(', ')).join(', ') : data.error;
    throw new Error(errorMsg || 'Login failed');
  }

  return data.data;
};

export const signup = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.errors ? data.errors.map(err => Object.values(err).join(', ')).join(', ') : data.error;
    throw new Error(errorMsg || 'Signup failed');
  }

  return data.data;
};
