import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface OrderIdState {
  order_id: string | null;
}

const initialState: OrderIdState = {
  order_id: null,
};

const orderIdSlice = createSlice({
  name: 'orderId',
  initialState,
  reducers: {
    setOrderId: (state, action: PayloadAction<string>) => {
      state.order_id = action.payload;
    },
  },
});

export const { setOrderId } = orderIdSlice.actions;

export const selectOrderId = (state: RootState) => state.orderId.order_id;

export default orderIdSlice.reducer;