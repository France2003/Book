import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: number;
  items: { bookId: number; quantity: number }[];
  totalPrice: number;
  date: string;
}

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    // Các reducer khác nếu cần
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
