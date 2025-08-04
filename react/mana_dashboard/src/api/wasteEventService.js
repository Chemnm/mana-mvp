import api from './axiosConfig';

export const getWasteEvents = async () => {
  try {
    const response = await api.get('/waste-events');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch waste events:', error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : 'Failed to fetch waste events');
  }
};

export const getWasteEventsByFacility = async (facilityId) => {
    try {
      const response = await api.get(`/waste-events/facility/${facilityId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch waste events for facility:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data : 'Failed to fetch waste events for facility');
    }
  };

export const addWasteEvent = async (eventData) => {
    try {
      const response = await api.post('/waste-events/add', eventData);
      return response.data;
    } catch (error) {
      console.error('Failed to add waste event:', error.response ? error.response.data : error.message);
      throw new Error(error.response ? error.response.data : 'Failed to add waste event');
    }
  };
