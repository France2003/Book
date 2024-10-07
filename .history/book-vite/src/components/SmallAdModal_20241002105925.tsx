// SmallAdModal.tsx
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const SmallAdModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 animate-slide-in">
          {/* Nội dung modal */}
          <div className="flex justify-between items-center">
            <div>
              <img
                src="https://cf.shopee.vn/file/vn-11134258-7ras8-m0o78c9u2a5pcf"
                alt="Ad Banner"
                className="w-[50px]"
                style={{margin:'auto'}}
              />
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleClose}
              className="text-red-500 absolute top-0 right-0 m-1"
            />
          </div>
          <div className="text-center mt-2">
            <p className="font-bold text-red-500">MUA LÀ LỜI</p>
            <p>Hàng mới giá hời</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallAdModal;
