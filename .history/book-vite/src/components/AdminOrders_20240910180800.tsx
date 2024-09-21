import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Table } from 'antd';
import { Order } from '../types'; // Import Order type

const AdminOrders: React.FC = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Ngày', dataIndex: 'date', key: 'date' },
    { title: 'Tổng tiền', dataIndex: 'totalPrice', key: 'totalPrice' },
    { title: 'Sản phẩm', dataIndex: 'items', key: 'items', render: (items: any[]) => items.map(item => `Book ID: ${item.bookId}, Quantity: ${item.quantity}`).join(', ') }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default AdminOrders;
