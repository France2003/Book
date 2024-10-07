import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrdersState {
  orders: Order[];
}

const saveOrdersToLocalStorage = (orders: Order[]) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (e) {
    console.warn('Không thể lưu vào localStorage', e);
  }
};

const loadOrdersFromLocalStorage = (): Order[] => {
  try {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (e) {
    console.warn('Không thể lấy từ localStorage', e);
    return [];
  }
};
const initialState: OrdersState = {
  orders: loadOrdersFromLocalStorage(),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      console.log('Current orders before adding:', state.orders);
      state.orders.push(action.payload);
      console.log('New order added:', action.payload);
      console.log('Orders after adding:', state.orders);
      saveOrdersToLocalStorage(state.orders);
    },
    
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((_, index) => index !== action.payload);
      saveOrdersToLocalStorage(state.orders);
   },
  },
});

export const { addOrder,removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer; // Đây là ordersReducer khi import ở nơi khác
