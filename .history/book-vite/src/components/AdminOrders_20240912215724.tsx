import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Adjust to your actual store path
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
  // This would be where you select orders from Redux, using an example selector
  const orders = useSelector((state: RootState) => state.orders); // Assuming orders exist in the store
  
  const [formattedOrders, setFormattedOrders] = useState<OrderInfo[]>([]);

  useEffect(() => {
    // If fetching from localStorage (for example)
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setFormattedOrders(JSON.parse(savedOrders));
    }
  }, []);

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    {
      title: 'Order Date',
      key: 'orderDate',
      render: (text: string, record: OrderInfo) => {
        const orderDate = new Date(record.orderDate);
        const formattedDate = orderDate.toLocaleDateString('vi-VN');
        const formattedTime = orderDate.toLocaleTimeString('vi-VN');
        return `${formattedDate} ${formattedTime}`;
      }
    },
    { title: 'Total Price', dataIndex: 'formattedTotalAmount', key: 'totalPrice' },
    {
      title: 'Items',
      key: 'items',
      render: (text: any, record: OrderInfo) => (
        <ul>
          {record.selectedItems.map(item => (
            <li key={item.id}>
              {item.title} - Số lượng: {item.quantity}
            </li>
          ))}
        </ul>
      )
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
      <Table dataSource={formattedOrders} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminOrders;
