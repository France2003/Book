import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table } from 'antd';
import { Order } from '../types';

const AdminOrders: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders); // Lấy đơn hàng từ Redux
  console.log('Orders loaded in Admin:', orders);
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
