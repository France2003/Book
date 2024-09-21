import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice';
import { List, Card, Button, Form, Input, message, Modal, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState<any[]>([]); // State để lưu các sản phẩm được chọn
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCheckboxChange = (item: any) => {
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(item)
        ? prevSelectedItems.filter(selectedItem => selectedItem !== item)
        : [...prevSelectedItems, item]
    );
  };

  const totalAmount = selectedItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
  const formattedTotalAmount = new Intl.NumberFormat('vi-VN').format(totalAmount);

  const handleFinish = (values: any) => {
    if (selectedItems.length === 0) {
      message.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      console.log('Thông tin thanh toán:', values);
      console.log('Các sản phẩm đã mua:', selectedItems);

      selectedItems.forEach((item: any) => {
        dispatch(removeFromCart(item.id)); // Xóa sản phẩm khỏi Redux store
      });

      message.success('Thanh toán thành công!');
      setLoading(false);
      setIsModalVisible(false); // Đóng modal sau khi thanh toán thành công
    }, 2000);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
    } else {
      setIsModalVisible(true); // Hiển thị modal khi nhấn "Mua hàng"
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

      {cartItems.length === 0 ? (
        <p>Giỏ hàng hiện tại trống.</p>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={cartItems}
            renderItem={book => (
              <List.Item>
                <Card
                  title={`${book.title} (x${book.quantity})`}
                  style={{ lineHeight: 1.5 }}
                >
                  <div className="flex items-center gap-4">
                    <img src={book.image} alt={book.title} className="w-24 h-24 object-cover" />
                    <div className="flex-1 ">
                      <p className="text-lg font-semibold">{book.title}</p>
                      <p className="text-base">Tác giả: {book.author}</p>
                      <p className="text-base">Giá: {book.price} VND</p>
                      <p className="text-base">Số lượng: {book.quantity}</p>
                      <Checkbox
                        checked={selectedItems.includes(book)}
                        onChange={() => handleCheckboxChange(book)}
                      >
                        Chọn
                      </Checkbox>
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tổng cộng: {formattedTotalAmount} VND</h3>
            <Button
              type="primary"
              onClick={handleCheckout}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Mua hàng
            </Button>
          </div>
        </>
      )}

      <Modal
        title="Thông tin thanh toán"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="p-4"
      >
        <Form form={form} layout="vertical" onFinish={handleFinish}>
          <Form.Item
            name="name"
            label="Tên người nhận"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input placeholder="Nhập tên người nhận" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full bg-red-500 hover:bg-red-600"
            >
              Đặt hàng
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Link to="/" className="text-blue-500 hover:underline">Trang chủ</Link>
    </div>
  );
};

export default Checkout;
