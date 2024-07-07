import axios from 'axios';

export const createAccount = async (values) => {
  try {
    console.log('Sending data:', values); // Debugging log
    const response = await axios.post('http://3.25.199.183:8000/api/register', values);
    console.log('Response data:', response.data); // Debugging log
    return response.data;
  } catch (error) {
    console.error('Error response:', error.response); // Debugging log
    throw error;
  }
};
