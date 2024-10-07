import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import bookReducer from './bookSlice';
import ordersReducer from '../redux/ordersSlice';
import favoritesReducer from './favoritesSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    books: bookReducer,
    orders: ordersReducer, 
    favorites: favoritesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
