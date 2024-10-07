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
                    style={{ width: '100%', height: '450px', marginBottom: '20px' }} 
                />
            </div>
        </Modal>
    );
};

export default AdModal;
