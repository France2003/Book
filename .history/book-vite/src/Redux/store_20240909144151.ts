import { configureStore } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    books: bookReducer,
    cart: cartReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
