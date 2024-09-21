import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice';
import { List, Card, Button } from 'antd';
import Link from 'antd/es/typography/Link';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      <h1>Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện tại trống.</p>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 2 }}
            dataSource={cartItems}
            renderItem={item => (
              <List.Item>
                <Card title={item.title}>
                  <p>Tác giả: {item.author}</p>
                  <p>Giá: ${item.price}</p>
                  <p>Số lượng: {item.quantity}</p>
                </Card>
              </List.Item>
            )}
          />
          <Link to="/checkout">
            <Button type="primary">Tiến hành thanh toán</Button>
          </Link>
        </>
      )}
    </div>

  );
};

export default Cart;
