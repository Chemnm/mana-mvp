import api from './axiosConfig';

export const login = async (email, password) => {
  try {
    const response = await api.post('/users/login', { email, password });
    // Assuming the API returns user data on successful login
    // In a real app, you'd get a JWT token and store it
    return response.data.user;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Login failed');
  }
};

export const logout = async () => {
  // In a real app, you might have an API endpoint to invalidate a token
  console.log('User logged out');
  return Promise.resolve();
};
