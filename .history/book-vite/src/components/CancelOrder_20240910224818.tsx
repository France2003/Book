// CancelOrder.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'antd';

const CancelOrder: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleCancelOrder = () => {
    // Thực hiện các thao tác hủy đơn hàng ở đây, ví dụ: cập nhật trạng thái đơn hàng trong cơ sở dữ liệu

    // Sau khi hủy xong, chuyển hướng đến trang chủ
    navigate('/');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Đơn hàng đã bị hủy</h1>
      <p>Đơn hàng của bạn đã bị hủy vì thông tin không chính xác. Vui lòng thử lại với thông tin đúng.</p>
      <Button
        type="primary"
        className="mt-4"
        onClick={() => setIsModalVisible(true)}
      >
        Hủy đơn hàng
      </Button>

      <Modal
        title="Xác nhận hủy đơn hàng"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Quay lại
          </Button>,
          <Button key="confirm" type="primary" onClick={handleCancelOrder}>
            Xác nhận hủy
          </Button>,
        ]}
      >
        <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>

      <Link to="/" className="text-blue-500 hover:underline mt-4 block">Quay lại trang chủ</Link>
    </div>
  );
};

export default CancelOrder;
