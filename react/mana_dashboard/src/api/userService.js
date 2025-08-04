import api from './axiosConfig';

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to fetch users');
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to delete user');
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await api.post(`/users/update/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to update user');
  }
};

export const addUser = async (userData) => {
  try {
    const response = await api.post('/users/add', userData);
    return response.data;
  } catch (error) {
    console.error('Failed to add user:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to add user');
  }
};
