const API_URL = 'http://localhost:3000';

export const getConversations = async (token) => {
  const response = await fetch(`${API_URL}/users/me/conversations`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch conversations');
  }

  const data = await response.json();
  return data.data;
};

export const getMessages = async (token, conversationId, limit = 20, offset = 0) => {
  const response = await fetch(`${API_URL}/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || 'Failed to fetch messages');
  }

  const data = await response.json();
  return data.data;
};
