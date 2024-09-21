import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/cartSlice';
import { List, Card, Button, Form, Input, message } from 'antd';
import { Link, useLocation } from 'react-router-dom';
const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const selectedItems = location.state?.selectedItems || [];
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (selectedItems.length === 0) {
      message.error('Giỏ hàng trống, không thể thanh toán!');
      return;
    }

    setLoading(true);

    // Giả lập xử lý thanh toán
    setTimeout(() => {
      console.log('Thông tin thanh toán:', values);
      console.log('Các sản phẩm trong giỏ:', cartItems);

      // Sau khi thanh toán thành công
      message.success('Thanh toán thành công!');
      dispatch(clearCart()); // Xóa giỏ hàng sau khi thanh toán
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="checkout">
      
      <h1>Thanh toán</h1>

      {/* Thông tin giỏ hàng */}
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện tại trống.</p>
      ) : (
        <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={selectedItems}
        renderItem={item => (
          <List.Item>
            <Card title={`${item.title} (x${item.quantity})`}>
              <p>Tác giả: {item.author}</p>
              <p>Giá: ${item.price}</p>
              <p>Tổng: ${item.price * item.quantity}</p>
            </Card>
          </List.Item>
        )}
      />
      )}
      <Link to="/">Trang chủ</Link>
    </div>
  );
};

export default Checkout;
