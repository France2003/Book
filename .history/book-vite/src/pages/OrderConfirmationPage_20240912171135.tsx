import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Define TypeScript interfaces for the order information
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
  orderDate: string; // ISO string representation of the date
}

const OrderConfirmation: React.FC = () => {
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

  // Format the order date
  const orderDate = new Date(orderInfo.orderDate);
  const formattedDate = orderDate.toLocaleDateString('vi-VN');
  const formattedTime = orderDate.toLocaleTimeString('vi-VN');

  console.log(`Order Date: ${formattedDate}`);
  console.log(`Order Time: ${formattedTime}`);

  return (
    <div className="p-6 max-w-3xl mx-auto" style={{ lineHeight: 2 }}>
      <h1 className="text-2xl font-bold mb-4 text-center">Đơn hàng đã được đặt</h1>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Thông tin người nhận</h3>
        <p><strong>Tên người nhận:</strong> {orderInfo.userInfo.name}</p>
        <p><strong>Email:</strong> {orderInfo.userInfo.email}</p>
        <p><strong>Địa chỉ:</strong> {orderInfo.userInfo.address}</p>
        <p><strong>Số điện thoại:</strong> {orderInfo.userInfo.phone}</p>
        <p><strong>Phương thức thanh toán:</strong> 
          {orderInfo.paymentMethod === 'bankTransfer' ? 
            `Chuyển khoản ngân hàng (${orderInfo.selectedBank})` : 
            'Thanh toán khi nhận hàng'}
        </p>
        <p><strong>Ngày giờ đặt hàng:</strong> {formattedDate} {formattedTime}</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Thông tin sản phẩm</h3>
        {orderInfo.selectedItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 mt-2">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
            <div>
              <p className="text-lg font-semibold">{item.title} (x{item.quantity})</p>
              <p className="text-base">Tác giả: {item.author}</p>
              <p className="text-base">Giá: {item.price} VND</p>
              <p className="text-base">Số lượng: {item.quantity}</p>
            </div>
          </div>
        ))}
        <div className='flex justify-end'>
          <p className='text-xl'><strong>Tổng cộng thanh toán:</strong> {orderInfo.formattedTotalAmount}.000 VND</p>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
        <Link to="/cancel-order" className="ml-4 text-red-500 hover:underline">Hủy đơn hàng</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
