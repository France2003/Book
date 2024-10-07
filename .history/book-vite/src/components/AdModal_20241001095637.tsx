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
            <p>Đây là quảng cáo sản phẩm mới nhất của chúng tôi!</p>
            <p>Nhấp vào đây để tìm hiểu thêm về sản phẩm tuyệt vời này!</p>
        </Modal>
    );
};

export default AdModal;
