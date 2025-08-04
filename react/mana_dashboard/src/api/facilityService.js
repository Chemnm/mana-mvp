import api from './axiosConfig';

export const getFacilities = async () => {
  try {
    const response = await api.get('/facilities');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch facilities:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to fetch facilities');
  }
};

export const createFacility = async (facilityData) => {
  try {
    const response = await api.post('/facilities', facilityData);
    return response.data;
  } catch (error) {
    console.error('Failed to create facility:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to create facility');
  }
};

export const updateFacility = async (id, facilityData) => {
  try {
    const response = await api.put(`/facilities/${id}`, facilityData);
    return response.data;
  } catch (error) {
    console.error('Failed to update facility:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to update facility');
  }
};

export const deleteFacility = async (id) => {
  try {
    const response = await api.delete(`/facilities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete facility:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to delete facility');
  }
};

export const getFacilityById = async (id) => {
  try {
    const response = await api.get(`/facilities/${id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch facility:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to fetch facility');
  }
};
