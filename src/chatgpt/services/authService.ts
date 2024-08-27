import axios from 'axios';

const API_URL = 'https://your-api-url.com';

export const login = async (username: string, password: string): Promise<string> => {
  const response = await axios.post<{ token: string }>(`${API_URL}/login`, { username, password });
  return response.data.token;
};