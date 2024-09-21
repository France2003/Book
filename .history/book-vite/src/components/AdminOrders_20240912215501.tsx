import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table } from 'antd';
import { Order } from '../types';
interface UserInfo {
  name: string;
  email: string;
  address: string;
  phone: string;
}

interface OrderItem {
  id: number;
  image: string;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

interface OrderInfo {
  userInfo: UserInfo;
  paymentMethod: string;
  selectedBank?: string;
  selectedItems: OrderItem[];
  formattedTotalAmount: number;
  orderDate: string; // Ensure this is an ISO 8601 string or correctly formatted
}
const AdminOrders: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    const savedOrderInfo = localStorage.getItem('orderInfo');
    if (savedOrderInfo) {
      setOrderInfo(JSON.parse(savedOrderInfo));
    }
  }, []);

  if (!orderInfo) {
    return <p>Không có thông tin đơn hàng.</p>;
  }
  let orderDate: Date;
  try {
    orderDate = new Date(orderInfo.orderDate);
    if (isNaN(orderDate.getTime())) {
      throw new Error('Invalid Date');
    }
  } catch (error) {
    console.error('Error parsing order date:', error);
    orderDate = new Date(); // Fallback to current date
  }

  const formattedDate = orderDate.toLocaleDateString('vi-VN');
  const formattedTime = orderDate.toLocaleTimeString('vi-VN');
  // console.log('Orders loaded in Admin:', orders);
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Tổng Giá', dataIndex: 'totalPrice', key: 'totalPrice' },
    {
      title: 'Chi Tiết',
      key: 'items',
      render: (text: any, record: Order) => (
        <ul>
          {record.items.map(item => (
            <li key={item.bookId}>Sách ID: {item.bookId}, Số lượng: {item.quantity}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminOrders;
