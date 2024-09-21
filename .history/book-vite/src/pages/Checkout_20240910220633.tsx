import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice'; // import action removeFromCart
import { List, Card, Button, Form, Input, message, Modal, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items); // Lấy giỏ hàng từ Redux
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [selectedItems, setSelectedItems] = useState<any[]>([]); // Quản lý các sản phẩm đã chọn

  // Tính tổng tiền của các sản phẩm đã chọn
  const totalAmount = selectedItems.reduce(
    (total: number, item: any) => total + item.price * item.quantity,
    0
  );
  const formattedTotalAmount = new Intl.NumberFormat('vi-VN').format(totalAmount);

  // Xử lý chọn sản phẩm
  const handleSelectItem = (item: any, isChecked: boolean) => {
    if (isChecked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    }
  };

  // Xử lý khi thanh toán
  const handleFinish = (values: any) => {
    if (selectedItems.length === 0) {
      message.error('Bạn chưa chọn sản phẩm nào để thanh toán!');
      return;
    }

    setLoading(true);

    // Giả lập quá trình thanh toán
    setTimeout(() => {
      console.log('Thông tin thanh toán:', values);
      console.log('Các sản phẩm đã chọn:', selectedItems);

      // Xóa các sản phẩm đã chọn khỏi giỏ hàng
      selectedItems.forEach((item: any) => {
        dispatch(removeFromCart(item.id)); // Gọi action để xóa sản phẩm
      });

      // Hiển thị thông báo và đóng modal
      message.success('Thanh toán thành công!');
      setLoading(false);
      setIsModalVisible(false); // Đóng modal sau khi thanh toán
      setSelectedItems([]); // Xóa danh sách sản phẩm đã chọn
    }, 2000);
  };

  // Hiển thị modal khi nhấn "Mua hàng"
  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      message.error('Vui lòng chọn ít nhất một sản phẩm để thanh toán!');
    } else {
      setIsModalVisible(true); // Hiển thị modal thanh toán
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>

      {/* Hiển thị giỏ hàng */}
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
                    <Checkbox 
                      onChange={(e) => handleSelectItem(book, e.target.checked)} 
                      checked={selectedItems.some((item) => item.id === book.id)} // Kiểm tra xem đã được chọn chưa
                    >
                      Chọn mua
                    </Checkbox>
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

      <Link to="/" className="text-blue-500 hover:underline">Trang chủ</Link>
    </div>
  );
};

export default Checkout;
