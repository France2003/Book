import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Điều chỉnh đường dẫn đến store của bạn
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
  orderDate: string; // Đảm bảo đây là chuỗi ISO 8601 hoặc định dạng chính xác
}

const AdminOrders: React.FC = () => {
  // Lấy danh sách đơn hàng từ Redux
  const orders = useSelector((state: RootState) => state.orders.orders); // Sửa thành đúng cấu trúc state của bạn

  const [formattedOrders, setFormattedOrders] = useState<OrderInfo[]>([]);

  useEffect(() => {
    // Cập nhật danh sách đơn hàng
    if (orders) {
      setFormattedOrders(orders);
    }
  }, [orders]);

  // Định nghĩa các cột cho Table
  const columns = [
    {
      title: 'Tên Người Đặt Hàng',
      dataIndex: ['userInfo', 'name'], // Truy cập nested userInfo name
      key: 'name',
    },
    {
      title: 'Ngày và Giờ Đặt Hàng',
      key: 'orderDate',
      render: (text: string, record: OrderInfo) => {
        const orderDate = new Date(record.orderDate);
        const formattedDate = orderDate.toLocaleDateString('vi-VN');
        const formattedTime = orderDate.toLocaleTimeString('vi-VN');
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: 'Tổng Tiền',
      dataIndex: 'formattedTotalAmount',
      key: 'totalPrice',
      render: (amount: number) => `${amount}.000 VND`, // Định dạng thành VND
    },
    {
      title: 'Chi Tiết Sản Phẩm',
      key: 'items',
      render: (text: any, record: OrderInfo) => (
        <ul>
          {record.selectedItems.map((item) => (
            <li key={item.id}>
              {item.title} - Số lượng: {item.quantity} - Giá: {item.price} VND
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
      <Table dataSource={formattedOrders} columns={columns} rowKey="userInfo.email" />
    </div>
  );
};

export default AdminOrders;
