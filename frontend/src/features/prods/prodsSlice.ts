import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteProduct, addProduct, updateProduct, fetchcProds } from './prodsAPI';

interface Product {
  id: number
  name: string;
  price: number;
  img: any | null;
  category: number;
}

interface ProdsState {
  status: 'idle' | 'failed';
  prods: Product[];
  error: string | null;
}

const initialState: ProdsState = {
  status: 'idle',
  prods: [],
  error: null,
};

export const getDataAsync = createAsyncThunk<Product[]>(
  'prod/fetchProds',
  async () => {
    const response = await fetchcProds();
    return response;
  }
);


export const deleteDataAsync = createAsyncThunk<number, number>(
  'prod/deleteProds',
  async (id) => {
    const response = await deleteProduct(id, localStorage.getItem('token'));
    return response;
  }
);

export const addDataAsync = createAsyncThunk<Product, FormData>(
  'prod/addProds',
  async (product) => {
    const response = await addProduct(product, localStorage.getItem('token'));
    return response.data;
  }
);

export const updateDataAsync = createAsyncThunk<Product, FormData>(
  'prod/updateProds',
  async (newData) => {
    const id = newData.get('id');
    if (id !== null) {
      const response = await updateProduct(newData, Number(id), localStorage.getItem('token'));
      return response.data;
    } else {
      throw new Error('Invalid id');
    }
  }
);
export const prodSlice = createSlice({
  name: 'prod',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDataAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.prods = action.payload;
        state.error = null;
      })
      .addCase(getDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      })
      .addCase(deleteDataAsync.fulfilled, (state, action) => {
        const deletedProductId = action.payload;
        state.status = 'idle';
        state.prods = state.prods.filter(prod => prod.id !== deletedProductId);
        state.error = null;
      })
      .addCase(deleteDataAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message!;
      });
  },
});

export const selectProds = (state: { prod: ProdsState }) => state.prod.prods;
export default prodSlice.reducer;
