// PlaceOrderComponent.tsx
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../redux/ordersSlice';
import { Order, OrderItem, PaymentInfo } from '../types';

const PlaceOrderComponent: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  const handlePlaceOrder = () => {
    const paymentInfo: PaymentInfo = {
      method: 'Credit Card',
      cardNumber: '**** **** **** 1234',
      transactionId: 'TXN1234567890',
    };

    const items: OrderItem[] = [
      { bookId: 1, quantity: 2, price: 20000 },
      { bookId: 2, quantity: 1, price: 30000 },
    ];

    const newOrder: Order = {
      id: Date.now(),
      date: new Date().toISOString(),
      totalPrice: items.reduce((total, item) => total + item.quantity * item.price, 0),
      items,
      paymentInfo,
    };

    // Lấy các đơn hàng hiện có từ localStorage
    const currentOrders: Order[] = JSON.parse(localStorage.getItem('orders') || '[]');
    // Thêm đơn hàng mới vào mảng đơn hàng
    const updatedOrders = [...currentOrders, newOrder];

    // Lưu đơn hàng vào localStorage
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    // Dispatch thêm đơn hàng vào Redux
    dispatch(addOrder(newOrder));

    console.log('Order placed successfully:', newOrder);
  };

  return (
    <button onClick={handlePlaceOrder}>Đặt hàng</button>
  );
};

export default PlaceOrderComponent;
