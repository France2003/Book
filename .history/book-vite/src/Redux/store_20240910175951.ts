import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import bookReducer from './bookSlice';
import ordersSlice from './ordersSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: bookReducer,
    orders: ordersSlice, 
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
