import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';

const AdModal: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    useEffect(() => {
        const modalShown = sessionStorage.getItem('modalShown');
        if (!modalShown) {
            setIsModalVisible(true);
            sessionStorage.setItem('modalShown', 'true'); 
        }
    }, []);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            title="Thông Báo Quảng Cáo"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="ok" type="primary" onClick={handleOk}>
                    OK
                </Button>,
            ]}
        >
            <div style={{ textAlign: 'center' }}>
                <img 
                    src="https://salt.tikicdn.com/ts/tikimsp/2e/11/6f/d671658be775a15504e2f1d1197c2bf4.png" 
                    alt="Quảng cáo sản phẩm" 
                    style={{ width: '100%', height: 'auto', marginBottom: '20px' }} 
                />
                <p>Đây là quảng cáo sản phẩm mới nhất của chúng tôi!</p>
                <p>Nhấp vào đây để tìm hiểu thêm về sản phẩm tuyệt vời này!</p>
            </div>
        </Modal>
    );
};

export default AdModal;
