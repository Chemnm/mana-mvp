import axiosInstance from './axiosConfig';

// Since we don't have a backend yet, we'll create mock data
// that has the same shape as the data in our components.
const mockData = {
  stats: [
    { title: "Waste Value", value: "$21,724.96", trend: "up", percentage: "28%" },
    { title: "Waste Weight", value: "2,421.93 LB", trend: "down", percentage: "15%" },
    { title: "Waste Transactions", value: "1,800", trend: "up", percentage: "12%" },
    { title: "Carbon Impact", value: "485.2 kg", trend: "down", percentage: "18%" },
  ],
  // ... we could add mock data for other components here
};

export const getDashboardData = async () => {
  try {
    // In the future, this will be an actual API call:
    // const response = await axiosInstance.get('/dashboard');
    // return response.data;

    // For now, we return the mock data after a short delay to simulate a network request.
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData);
      }, 2500); // 500ms delay
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    // You might want to throw the error or return a default structure
    throw error;
  }
}; 