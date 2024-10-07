import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link,useNavigate } from 'react-router-dom';

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
  canceled?: boolean; // Trạng thái hủy đơn hàng
}

const OrderConfirmation: React.FC = () => {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const history = useNavigate();

  useEffect(() => {
    const savedOrderInfo = localStorage.getItem('orderInfo');
    if (savedOrderInfo) {
      setOrderInfo(JSON.parse(savedOrderInfo));
    }
    window.scrollTo(0, 50);
  }, []);

  const cancelOrder = () => {
    if (orderInfo) {
      localStorage.removeItem('orderInfo'); // Xóa đơn hàng khỏi localStorage
      setOrderInfo(null); // Cập nhật trạng thái đơn hàng để không hiển thị nữa
      alert('Đơn hàng đã bị hủy và xóa khỏi danh sách!');
      history('/Book/'); // Điều hướng đến trang chủ nếu cần
    }
  };

  if (!orderInfo) {
    return <p>Không có thông tin đơn hàng.</p>;
  }

  // Attempt to parse the date
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
    <div className="p-6 max-w-3xl mx-auto" style={{ lineHeight: 2 }}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đơn hàng của tôi</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
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
        <Link to="/Book/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
        <Link to="#" onClick={cancelOrder} className="ml-4 text-red-500 hover:underline">Hủy đơn hàng</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
