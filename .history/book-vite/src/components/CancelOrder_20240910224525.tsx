// CancelOrder.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const CancelOrder: React.FC = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng đã bị hủy</h1>
      <p>Đơn hàng của bạn đã bị hủy vì thông tin không chính xác. Vui lòng thử lại với thông tin đúng.</p>
      <Link to="/" className="text-blue-500 hover:underline">Quay lại trang chủ</Link>
    </div>
  );
};

export default CancelOrder;
