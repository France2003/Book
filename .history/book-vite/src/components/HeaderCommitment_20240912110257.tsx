import React from 'react';
import { CheckCircleOutlined, SyncOutlined, GiftOutlined, CarOutlined, DollarCircleOutlined, RocketOutlined } from '@ant-design/icons';

const HeaderCommitment: React.FC = () => {
  return (
    <div className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-around items-center">
        <div className="flex items-center">
          <h3 className="text-blue-500 font-semibold">Cam kết</h3>
        </div>
        <div className="flex justify-between space-x-6">
          <div className="flex items-center space-x-2">
            <CheckCircleOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>100% hàng thật</span>
            <p>|</p>
          </div>
          <div className="flex items-center space-x-2">
            <SyncOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Hoàn 200% nếu hàng giả</span>
            <p>|</p>
          </div>
          <div className="flex items-center space-x-2">
            <GiftOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>30 ngày đổi trả</span>
            <p>|</p>
          </div>
          <div className="flex items-center space-x-2">
            <CarOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Giao nhanh 2h</span>
            <p>|</p>
          </div>
          <div className="flex items-center space-x-2">
            <DollarCircleOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Giá siêu rẻ</span>
            <p>|</p>
          </div>
          <div className="flex items-center space-x-2">
            <RocketOutlined style={{ color: '#1890ff', fontSize: '24px' }} />
            <span>Freeship mọi đơn</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderCommitment;
