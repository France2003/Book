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

          <form onSubmit={handleSubmit}>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="name">Tên</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="phone">Số điện thoại</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại của bạn"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="address">Địa chỉ</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ của bạn"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Xác Nhận Thanh Toán
            </button>
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
