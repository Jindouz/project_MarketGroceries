import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

// export const BASE_URL = 'https://djg-supermarket-postgresql.onrender.com'; // production
export const BASE_URL = 'http://127.0.0.1:8000'; // development

// Function to set Authorization header with JWT token
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Product GET (public)
// ==========================

export const fetchcProds = async (): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`${BASE_URL}/products`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error Fetching Products');
  }
};

// Authentication CRUD Requests
//============================

// Add product with token handling
export const addProduct = async (product: any, token: string | null): Promise<any> => {
  try {
    // Set token in headers
    setAuthToken(token);
    const response: AxiosResponse<any> = await axios.post(`${BASE_URL}/authproducts`, product);
    toast.success('Product Added');
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error adding product:', error);
    throw new Error(error.response?.data?.detail || 'Error Adding Product');
  }
};

// Delete product with token handling
export const deleteProduct = async (id: number, token: string | null): Promise<number> => {
  try {
    // Set token in headers
    setAuthToken(token);
    const response: AxiosResponse<any> = await axios.delete(`${BASE_URL}/authproducts/${id}`);
    // console.log(response.data);
    toast.success('Product Deleted');
    return response.data; // Return the ID of the deleted product
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error Deleting Product');
  }
};

// Update product with token handling
export const updateProduct = async (product: FormData, id: number, token: string | null): Promise<any> => {
  try {
    // Set token in headers
    setAuthToken(token);
    console.log('Updating product with ID in API:', id); // Log the ID being updated

    // Log the product data being sent
    console.log('Product data being sent to API:');
    Array.from(product.entries()).forEach(([key, value]) => {
        console.log(key, value);
      });

    const response: AxiosResponse<any> = await axios.put(`${BASE_URL}/authproducts/${id}`, product);
    console.log('Response from API:', response.data); // Log the response from the API
    toast.success('Product Updated');
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.detail || 'Error Updating Product');
  }
};
