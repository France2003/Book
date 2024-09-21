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
const saveOrderInfo = (newOrderInfo:any) => {
  const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  const orderWithTimestamp = {
    ...newOrderInfo,
    timestamp: new Date().toISOString(), // Lưu ngày và giờ hiện tại
  };
  existingOrders.push(orderWithTimestamp);
  localStorage.setItem('orders', JSON.stringify(existingOrders));
};

const initialState: OrdersState = {
  orders: loadOrdersFromLocalStorage(),
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveOrdersToLocalStorage(state.orders);
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer; // Đây là ordersReducer khi import ở nơi khác
