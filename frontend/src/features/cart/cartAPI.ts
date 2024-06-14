import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../features/prods/prodsAPI';


// Set the custom HTTPS agent for Axios
const axiosInstance = axios.create({
  baseURL: BASE_URL
});


const setAuthToken = (token: string | null): void => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const addOrder = async (orderData: any, token: string | null): Promise<any> => {
  try {
    console.log('Order Data in API:', orderData);
    setAuthToken(token);
    const response: AxiosResponse<any> = await axiosInstance.post(`/orders`, orderData);
    toast.success('Order Sent Successfully');
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error adding order:', error);
    throw new Error(error.response.data.detail || 'Error Adding Order');
  }
};

export interface OrderDataResponse {
  // Define the properties returned by the addOrder function
  orderId: number;
  message: string;
}