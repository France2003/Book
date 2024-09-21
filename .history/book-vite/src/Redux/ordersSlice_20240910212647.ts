// redux/ordersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrdersState {
  orders: Order[];
}

// Hàm lưu đơn hàng vào localStorage
const saveOrdersToLocalStorage = (orders: Order[]) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (e) {
    console.warn('Không thể lưu vào localStorage', e);
  }
};

// Hàm lấy đơn hàng từ localStorage
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
  orders: loadOrdersFromLocalStorage(), // Khởi tạo state từ localStorage
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
      saveOrdersToLocalStorage(state.orders); // Lưu sau khi thêm đơn hàng
    },
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
