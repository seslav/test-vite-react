import axios from 'axios';

// Function to log in by making a POST request to the backend API
export const login = async (username: string, password: string): Promise<string> => {
  const response = await axios.post('https://your-api-url.com/login', { username, password });
  return response.data.token; // Return the token from the response
};