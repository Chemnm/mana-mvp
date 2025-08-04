// This service now calls your secure backend endpoint.
// Replace the placeholder URL with your actual API Gateway Invoke URL.
const API_GATEWAY_URL = 'https://v3fl8bdqa0.execute-api.il-central-1.amazonaws.com/prod/ManaAi';

export const getAiResponse = async (message, userId, facilityId) => {
  console.log(`Sending to backend: ${message}`);

  // If an API Gateway URL is provided, use the real backend
  if (API_GATEWAY_URL && API_GATEWAY_URL !== 'YOUR_API_GATEWAY_URL') {
    try {
      const response = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, userId, facilityId })
      });

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }

      const data = await response.json();
      // The body of the lambda response is a stringified JSON object.
      // We need to parse it to get the summary and response.
      if (typeof data === 'string') {
        return JSON.parse(data);
      }
      return data;
    } catch (error) {
      console.error('Error calling backend API:', error);
      return "I'm sorry, there was an error connecting to the AI service.";
    }
  }
  
  return "I'm sorry, the AI service is not configured. Please contact your administrator.";
};
