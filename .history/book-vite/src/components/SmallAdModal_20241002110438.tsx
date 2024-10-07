// SmallAdModal.tsx
import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';

type Img = {
   img?:string
  };

const SmallAdModal: React.FC = ({img}:Img) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-20 right-4 bg-white rounded-lg z-50 shadow-lg p-4 animate-slide-in">
          {/* Nội dung modal */}
          <div className="flex justify-between items-center">
            <div>
              <img
                src={img}
                alt="Ad Banner"
                className="w-[80px]"

              />
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={handleClose}
              className="text-red-500 absolute top-[-10px] right-[-5px] m-1"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SmallAdModal;
