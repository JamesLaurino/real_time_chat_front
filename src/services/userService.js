import { apiFetch } from './api';

export const getUsers = () => {
  return apiFetch('/users');
};

export const getMe = () => {
  return apiFetch('/users/me');
};