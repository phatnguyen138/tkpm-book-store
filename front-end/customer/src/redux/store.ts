import { configureStore } from '@reduxjs/toolkit';
import cartReducer from "./slices/cart"
import userReducer from "./slices/user"
import orderId from './slices/orderId';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    orderId: orderId,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
