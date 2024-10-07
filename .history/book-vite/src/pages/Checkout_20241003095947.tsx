import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice';
import { List, Card, Button, Form, Input, message, Modal, Radio, Select, Layout } from 'antd';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BookCategory from '../components/BookCategory';
import { Helmet } from 'react-helmet';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
}

const { Content, Sider } = Layout;

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
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  useEffect(() => {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
      const { name, email, phone, address }: UserProfile = JSON.parse(userProfile);
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi thông tin checkout ở đây
    alert('Thông tin checkout đã được lưu!');
  };
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
    setUserInfo(values);
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
    setLoading(true);
    selectedItems.forEach((item: any) => {
      dispatch(removeFromCart(item.id));
    });

    message.success('Đơn hàng của bạn đã được đặt thành công!');
    localStorage.setItem('orderInfo', JSON.stringify({
      userInfo,
      selectedItems,
      paymentMethod,
      selectedBank,
      formattedTotalAmount
    }));

    navigate('/Book/order-confirmation');
    setIsConfirmationModalVisible(false);
    setIsModalVisible(false);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 50);
  }, []);

  return (
    <Layout className="flex flex-row p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Checkout</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-1/4 p-6 border-gray-200">
        <BookCategory />
      </div>
      <Layout style={{ padding: '0 24px', minHeight: 280 }} className='flex-1 p-6'>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

          {cartItems.length === 0 ? (
            <p>Giỏ hàng của bạn hiện tại trống.</p>
          ) : (
            <>
              <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={selectedItems}
                renderItem={book => (
                  <List.Item>
                    <Card title={`${book.title} (x${book.quantity})`} style={{ lineHeight: 1.5 }}>
                      <div className="flex items-center gap-4">
                        <img src={book.image} alt={book.title} className="w-24 h-24 object-cover" />
                        <div className="flex-1">
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
                <h3 className="text-lg font-semibold text-[25px]">Tổng cộng thanh toán ({selectedItems.length} sản phẩm): {formattedTotalAmount}.000 VND</h3>
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

          <form onClick={handleSubmit}>
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
                  <Input placeholder="Nhập tên người nhận" value={name} onChange={(e) => setName(e.target.value)} />
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
                  rules={[
                    { required: true, message: 'Vui lòng nhập số điện thoại!' },
                    { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' } // Example regex for Vietnamese phone numbers
                  ]}
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
                      <Select.Option value="Ngân hàng MB Bank">Ngân hàng MB Bank</Select.Option>
                      <Select.Option value="Ngân hàng Techcombank">Ngân hàng Techcombank</Select.Option>
                      <Select.Option value="Ngân hàng Agribank">Ngân hàng Agribank</Select.Option>
                      <Select.Option value="Ngân hàng ACB">Ngân hàng ACB</Select.Option>
                      <Select.Option value="Ngân hàng Vietcombank">Ngân hàng Vietcombank</Select.Option>
                      <Select.Option value="Ngân hàng BIDV">Ngân hàng BIDV</Select.Option>
                    </Select>
                  </Form.Item>
                )}

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full bg-red-500 text-white hover:bg-red-600"
                  >
                    Đặt hàng
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </form>

          <Modal
            title="Xác nhận đơn hàng"
            visible={isConfirmationModalVisible}
            onOk={handleConfirmOrder}
            onCancel={() => setIsConfirmationModalVisible(false)}
            okText="Xác nhận"
            cancelText="Huỷ"
          >
            <p>Bạn có chắc chắn muốn đặt hàng không?</p>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Checkout;
