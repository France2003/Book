import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { List, Card, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '../types';
 // Import kiểu CartItem nếu cần

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const isItemSelected = (id: number) => selectedItems.includes(id);

  const handleCheckout = () => {
    navigate('/checkout', { state: { selectedItems: cartItems.filter(item => selectedItems.includes(item.id)) } });
  };

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
            renderItem={item => {
              const cartItem = item as Book; // Ép kiểu item thành CartItem
              return (
                <List.Item>
                  <Card 
                    title={`${cartItem.title} (x${cartItem.quantity})`} 
                    extra={
                      <Button danger onClick={() => dispatch(removeFromCart(cartItem.id))}>
                        Xóa
                      </Button>
                    }
                  >
                    <p>Tác giả: {cartItem.author}</p>
                    <p>Giá: ${cartItem.price}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button onClick={() => dispatch(decreaseQuantity(cartItem.id))}>-</Button>
                      <span style={{ margin: '0 10px' }}>{cartItem.quantity}</span>
                      <Button onClick={() => dispatch(increaseQuantity(cartItem.id))}>+</Button>
                    </div>
                    <Checkbox 
                      checked={isItemSelected(cartItem.id)}
                      onChange={(e) => handleSelectItem(cartItem.id, e.target.checked)}
                    >
                      Chọn sản phẩm
                    </Checkbox>
                  </Card>
                </List.Item>
              );
            }}
          />
          
          <Button type="primary" onClick={handleCheckout} disabled={selectedItems.length === 0}>
            Tiến hành thanh toán ({selectedItems.length} sản phẩm)
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
