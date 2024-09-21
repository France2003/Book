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
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
      <table className='table'>
        <tr className='tableTr'>
          <th>Tên Người Đặt Hàng</th>
          <th>Tên Sản Phẩm</th>
          <th>Số Tiền</th>
          <th>Địa Chỉ</th>
          <th>Số Điện Thoại</th>
          <th>Ngày Và Giờ Đặt Hàng</th>
        </tr>
        <tr>
          <td>{orderInfo.userInfo.name}</td>
          {orderInfo.selectedItems.map((item) => (
            <div key={item.id}>
              <div>
                <p className="text-lg font-semibold">{item.title} (x{item.quantity})</p>
                <p className="text-base">Tác giả: {item.author}</p>
                <p className="text-base">Giá: {item.price} VND</p>
                <p className="text-base">Số lượng: {item.quantity}</p>
              </div>
            </div>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default AdminOrders;
