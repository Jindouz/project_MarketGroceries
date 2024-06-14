import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import prodsReducer from '../features/prods/prodsSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    prod: prodsReducer,
    cart: cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
