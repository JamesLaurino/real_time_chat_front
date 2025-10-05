import { apiFetch } from './api';

export const createMultichat = async (userId, name) => {
  return apiFetch('/premium/conversation', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, name }),
  });
};

export const getAllUsers = async () => {
  return apiFetch('/users');
};

export const getAllMultichats = async () => {
  return apiFetch('/premium');
};

export const deleteMultichat = async (conversationId) => {
  return apiFetch(`/premium/conversation/${conversationId}`, {
    method: 'DELETE',
  });
};
