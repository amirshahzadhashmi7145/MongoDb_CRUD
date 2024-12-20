import fetchClient from '../utils/fetchClient';

export const register = (data) => fetchClient.post('/register', data);
export const login = (data) => fetchClient.post('/login', data);
export const logout = () => fetchClient.post('/logout');
export const checkSession = () => fetchClient.get('/session');
