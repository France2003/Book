import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice';
import { List, Card, Button, Form, Input, message, Modal, Radio, Select } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookCategory from '../components/BookCategory';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedItems || [];
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>(undefined);
  const [selectedBank, setSelectedBank] = useState<string | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<any>(null);

  const totalAmount = selectedItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
  const formattedTotalAmount = new Intl.NumberFormat('vi-VN').format(totalAmount);

  const handleFinish = (values: any) => {
    if (selectedItems.length === 0) {
      message.error('Giỏ hàng trống, không thể thanh toán!');
      return;
    }

    setLoading(true);

    // Lưu thông tin người dùng và phương thức thanh toán
    setUserInfo(values);

    // Hiển thị modal xác nhận thông tin đơn hàng
    setIsConfirmationModalVisible(true);
    setLoading(false);
  };

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.error('Không có sản phẩm nào trong giỏ để thanh toán!');
    } else {
      setIsModalVisible(true);
    }
  };

  const handleConfirmOrder = () => {
    // Xóa các sản phẩm đã chọn khỏi giỏ hàng sau khi thanh toán thành công
    selectedItems.forEach((item: any) => {
      dispatch(removeFromCart(item.id));
    });
    message.success('Đơn hàng của bạn đã được đặt thành công!');
    // Lưu thông tin đơn hàng vào localStorage
    localStorage.setItem('orderInfo', JSON.stringify({
      userInfo,
      selectedItems,
      paymentMethod,
      selectedBank,
      formattedTotalAmount
    }));
  
    // Chuyển hướng đến trang xác nhận đơn hàng
    navigate('/order-confirmation');
    setIsConfirmationModalVisible(false);
    setIsModalVisible(false);
  };
  
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div  className="w-1/4 p-6 border-r border-gray-200">
        <BookCategory/>
      </div>
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

      {/* Thông tin giỏ hàng */}
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện tại trống.</p>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={selectedItems}
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
                    </div>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <div className="mt-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tổng cộng thanh toán ({selectedItems.length} sản phẩm): {formattedTotalAmount}.000 VND</h3>
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

      {/* Modal form thanh toán */}
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

          <Form.Item
            name="paymentMethod"
            label="Phương thức thanh toán"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
          >
            <Radio.Group onChange={e => setPaymentMethod(e.target.value)}>
              <Radio value="bankTransfer">Chuyển khoản ngân hàng</Radio>
              <Radio value="cashOnDelivery">Thanh toán khi nhận hàng</Radio>
            </Radio.Group>
          </Form.Item>

          {paymentMethod === 'bankTransfer' && (
            <Form.Item
              name="selectedBank"
              label="Chọn ngân hàng"
              rules={[{ required: true, message: 'Vui lòng chọn ngân hàng!' }]}
            >
              <Select placeholder="Chọn ngân hàng" onChange={value => setSelectedBank(value)}>
                <Select.Option value="bank1">Ngân hàng MB Bank</Select.Option>
                <Select.Option value="bank2">Ngân hàng Techcombank</Select.Option>
                <Select.Option value="bank3">Ngân hàng Agribank</Select.Option>
                <Select.Option value="bank4">Ngân hàng ACB</Select.Option>
                <Select.Option value="bank5">Ngân hàng Vietcombank</Select.Option>
                <Select.Option value="bank6">Ngân hàng BIDV</Select.Option>
                {/* Thêm các tùy chọn ngân hàng khác */}
              </Select>
            </Form.Item>
          )}

          {/* Nút Thanh toán */}
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
      <Modal
        title="Xác nhận đơn hàng"
        visible={isConfirmationModalVisible}
        onCancel={() => setIsConfirmationModalVisible(false)}
        footer={[
          <Button key="confirm" type="primary" onClick={handleConfirmOrder}>
            Xác nhận đơn hàng
          </Button>,
        ]}
      >
        <p><strong>Tổng cộng thanh toán:</strong> {formattedTotalAmount}.000 VND</p>
        <p><strong>Phương thức thanh toán:</strong> {paymentMethod === 'bankTransfer' ? `Chuyển khoản ngân hàng (${selectedBank})` : 'Thanh toán khi nhận hàng'}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Thông tin người nhận</h3>
          <p><strong>Tên người nhận:</strong> {userInfo?.name}</p>
          <p><strong>Email:</strong> {userInfo?.email}</p>
          <p><strong>Địa chỉ:</strong> {userInfo?.address}</p>
          <p><strong>Số điện thoại:</strong> {userInfo?.phone}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Thông tin sản phẩm</h3>
          {selectedItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 mt-2">
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
              <div>
                <p className="text-lg font-semibold">{item.title} (x{item.quantity})</p>
                <p className="text-base">Tác giả: {item.author}</p>
                <p className="text-base">Giá: {item.price} VND</p>
                <p className="text-base">Số lượng: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <Link to="/" className="text-blue-500 hover:underline">Trang chủ</Link>
    </div>
  );
};

export default Checkout;
