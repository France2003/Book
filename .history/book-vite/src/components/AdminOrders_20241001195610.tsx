import React, { useState } from 'react';

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

const AdminOrders: React.FC = () => {
  // Thay đổi cách khởi tạo orders
  const [orders] = useState<OrderInfo[]>([
    {
      userInfo: {
        name: 'Nguyễn Văn A',
        email: 'a@example.com',
        address: '123 Đường A, Thành phố B',
        phone: '0901234567',
      },
      paymentMethod: 'bankTransfer',
      selectedBank: 'Ngân hàng XYZ',
      selectedItems: [
        {
          id: 1,
          image: 'https://example.com/image1.jpg',
          title: 'Sách 1',
          author: 'Tác giả 1',
          price: 100000,
          quantity: 2,
        },
        {
          id: 2,
          image: 'https://example.com/image2.jpg',
          title: 'Sách 2',
          author: 'Tác giả 2',
          price: 150000,
          quantity: 1,
        },
      ],
      formattedTotalAmount: 350000,
      orderDate: new Date().toISOString(), // Sử dụng ngày hiện tại
      canceled: false,
    },
    {
      userInfo: {
        name: 'Trần Thị B',
        email: 'b@example.com',
        address: '456 Đường B, Thành phố C',
        phone: '0912345678',
      },
      paymentMethod: 'cashOnDelivery',
      selectedItems: [
        {
          id: 3,
          image: 'https://example.com/image3.jpg',
          title: 'Sách 3',
          author: 'Tác giả 3',
          price: 200000,
          quantity: 1,
        },
      ],
      formattedTotalAmount: 200000,
      orderDate: new Date().toISOString(), // Sử dụng ngày hiện tại
      canceled: true,
    },
  ]);

  if (orders.length === 0) {
    return <p>Không có thông tin đơn hàng.</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Danh Sách Đơn Hàng</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Người Đặt Hàng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên Sản Phẩm</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Tiền</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Địa Chỉ</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số Điện Thoại</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày Và Giờ Đặt Hàng</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng Thái</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order, index) => {
            const orderDate = new Date(order.orderDate);
            const formattedDate = orderDate.toLocaleDateString('vi-VN');
            const formattedTime = orderDate.toLocaleTimeString('vi-VN');

            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.userInfo.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.selectedItems.map((item) => (
                    <div key={item.id}>
                      <p>{item.title} (x{item.quantity})</p>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.selectedItems.reduce((total, item) => total + item.price * item.quantity, 0)}.000 VND
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userInfo.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userInfo.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formattedDate} {formattedTime}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.canceled ? 'Đã hủy' : 'Đã đặt hàng'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
