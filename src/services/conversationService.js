import { apiFetch } from './api';

export const getConversations = () => {
  return apiFetch(`/users/me/conversations?t=${new Date().getTime()}`);
};

export const getMessages = (conversationId, limit = 20, offset = 0) => {
  return apiFetch(`/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`);
};