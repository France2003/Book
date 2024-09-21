// Cart.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart } from '../redux/cartSlice';
import { List, Card, Button } from 'antd';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  console.log('Cart Items:', cartItems); // Debug log

  return (
    <div className="cart">
      <h1>Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện tại trống.</p>
      ) : (
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={cartItems}
          renderItem={item => (
            <List.Item>
              <Card title={item.title} extra={
                <Button danger onClick={() => dispatch(removeFromCart(item.id))}>
                  Xóa
                </Button>
              }>
                <p>Tác giả: {item.author}</p>
                <p>Giá: ${item.price}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default Cart;
