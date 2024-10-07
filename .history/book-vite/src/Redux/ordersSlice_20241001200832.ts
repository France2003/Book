import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

interface OrdersState {
  orders: Order[];
}

const loadOrdersFromLocalStorage = (): Order[] => {
  try {
    const storedOrders = localStorage.getItem('orders');
    console.log('Stored orders:', storedOrders); // Kiểm tra giá trị lấy từ localStorage
    return storedOrders ? JSON.parse(storedOrders) : [];
  } catch (e) {
    console.warn('Không thể lấy từ localStorage', e);
    return [];
  }
};

const saveOrdersToLocalStorage = (orders: Order[]) => {
  try {
    console.log('Saving orders:', orders); // Kiểm tra đơn hàng sẽ lưu vào localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch (e) {
    console.warn('Không thể lưu vào localStorage', e);
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
      state.orders.push(action.payload);
      saveOrdersToLocalStorage(state.orders); // Lưu đơn hàng mới vào localStorage
    },
    removeOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter((_, index) => index !== action.payload);
      saveOrdersToLocalStorage(state.orders);
    },
  },
});

export const { addOrder, removeOrder } = ordersSlice.actions;
export default ordersSlice.reducer; // Đây là ordersReducer khi import ở nơi khác
