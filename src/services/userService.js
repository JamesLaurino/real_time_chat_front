const API_URL = 'http://localhost:3000';

export const getUsers = async (token) => {
  const response = await fetch(`${API_URL}/users`, {
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

export const getMe = async (token) => {
    const response = await fetch(`${API_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch user data');
    }

    const data = await response.json();
    return data.data;
}
