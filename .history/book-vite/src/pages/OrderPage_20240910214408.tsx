import React from 'react';
import { useDispatch } from 'react-redux';
// import { addOrder } from '../redux/ordersSlice';
import { Order } from '../types';

const PlaceOrderComponent: React.FC = () => {
  const dispatch = useDispatch();

  const handlePlaceOrder = (order: Order) => {
    const currentOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = [...currentOrders, order];
    
    // Lưu đơn hàng vào localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  
    // Thực hiện thêm các hành động khác như dispatch Redux, thông báo cho người dùng
    console.log('Order placed successfully:', order);
  };

  // Giả lập một đơn hàng
  const sampleOrder: Order = {
    id: 1,
    date: new Date().toISOString(),
    totalPrice: '100000',
    items: [
      { bookId: 1, quantity: 2 },
      { bookId: 2, quantity: 1 },
    ],
  };

  return (
    <button onClick={() => handlePlaceOrder(sampleOrder)}>Đặt hàng</button>
  );
};

export default PlaceOrderComponent;
