const API_URL = 'http://localhost:3000/users';

export const getUsers = async (token) => {
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch users');
  }

  const data = await response.json();
  return data.data;
};
