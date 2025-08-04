import { create } from 'zustand';

// --- FAKE DATA ---
const allTimeData = {
  stats: {
    week: [
      { title: 'Waste Value', value: '$450.75', trend: 'up', percentage: '12%' },
      { title: 'Waste Weight', value: '620.50 LB', trend: 'down', percentage: '8%' },
      { title: 'Waste Transactions', value: '450', trend: 'up', percentage: '15%' },
      { title: 'Carbon Impact', value: '120.5 kg', trend: 'down', percentage: '10%' },
    ],
    month: [
      { title: 'Waste Value', value: '$1,724.96', trend: 'up', percentage: '28%' },
      { title: 'Waste Weight', value: '2,421.93 LB', trend: 'down', percentage: '15%' },
      { title: 'Waste Transactions', value: '1,800', trend: 'up', percentage: '12%' },
      { title: 'Carbon Impact', value: '485.2 kg', trend: 'down', percentage: '18%' },
    ],
    quarter: [
      { title: 'Waste Value', value: '$5,200.00', trend: 'down', percentage: '5%' },
      { title: 'Waste Weight', value: '7,300.00 LB', trend: 'down', percentage: '12%' },
      { title: 'Waste Transactions', value: '5,400', trend: 'up', percentage: '8%' },
      { title: 'Carbon Impact', value: '1,450.0 kg', trend: 'down', percentage: '20%' },
    ],
    year: [
      { title: 'Waste Value', value: '$20,500.00', trend: 'up', percentage: '15%' },
      { title: 'Waste Weight', value: '29,000.00 LB', trend: 'up', percentage: '5%' },
      { title: 'Waste Transactions', value: '21,000', trend: 'up', percentage: '10%' },
      { title: 'Carbon Impact', value: '5,800.0 kg', trend: 'up', percentage: '8%' },
    ],
  },
  topWastedFoods: {
    week: [
      { name: 'Fruit', value: 80, color: '#0d6efd' },
      { name: 'Vegetables', value: 75, color: '#28a745' },
    ],
    month: [
      { name: 'Vegetables', value: 320, color: '#28a745' },
      { name: 'Fruit', value: 245, color: '#0d6efd' },
      { name: 'Fish', value: 215, color: '#ffc107' },
      { name: 'Eggs', value: 180, color: '#dc3545' },
      { name: 'Hot Cereal', value: 175, color: '#6f42c1' },
      { name: 'Pasta', value: 160, color: '#17a2b8' },
    ],
    quarter: [
      { name: 'Dairy', value: 800, color: '#ffc107' },
      { name: 'Vegetables', value: 750, color: '#28a745' },
    ],
    year: [
      { name: 'Meat', value: 4000, color: '#dc3545' },
      { name: 'Dairy', value: 3200, color: '#ffc107' },
    ],
  },
  topLossReasons: {
    week: [{ name: 'Mon', value: 50 }, { name: 'Tue', value: 80 }, { name: 'Wed', value: 60 }, { name: 'Thu', value: 100 }, { name: 'Fri', value: 70 }, { name: 'Sat', value: 120 }, { name: 'Sun', value: 90 }],
    month: [{ name: 'Jan', value: 0 }, { name: 'Feb', value: 750 }, { name: 'Mar', value: 900 }, { name: 'Apr', value: 650 }, { name: 'May', value: 750 }, { name: 'Jun', value: 600 }],
    quarter: [{ name: 'Q1', value: 2000 }, { name: 'Q2', value: 2500 }, { name: 'Q3', a: 2200 }, { name: 'Q4', value: 2800 }],
    year: [{ name: 'Jan', value: 2000 }, { name: 'Feb', value: 2300 }, { name: 'Mar', value: 2100 }, { name: 'Apr', value: 2700 }, { name: 'May', value: 2500 }, { name: 'Jun', value: 3000 }],
  },
};

const useDataStore = create((set, get) => ({
  timeRange: 'month',
  dashboardData: {
    stats: allTimeData.stats.month,
    topWastedFoods: allTimeData.topWastedFoods.month,
    topLossReasons: allTimeData.topLossReasons.month,
  },
  setTimeRange: (newTimeRange) => {
    if (newTimeRange && allTimeData.stats[newTimeRange]) {
      set({
        timeRange: newTimeRange,
        dashboardData: {
          stats: allTimeData.stats[newTimeRange],
          topWastedFoods: allTimeData.topWastedFoods[newTimeRange],
          topLossReasons: allTimeData.topLossReasons[newTimeRange],
        }
      });
    }
  },
}));

export default useDataStore;
