import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { List, Card, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const handleCheckout = () => {
    navigate('/checkout', { state: { selectedItems: cartItems.filter(item => selectedItems.includes(item.id)) } });
  };
  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  const isItemSelected = (id: number) => selectedItems.includes(id);

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
                <Card 
                  title={`${item.title} (x${item.quantity})`} 
                  extra={
                    <Button danger onClick={() => dispatch(removeFromCart(item.id))}>
                      Xóa
                    </Button>
                  }
                >
                  <p>Tác giả: {item.author}</p>
                  <p>Giá: ${item.price}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                    <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                    <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                  </div>
                  <Checkbox 
                    checked={isItemSelected(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                  >
                    Chọn sản phẩm
                  </Checkbox>
                </Card>
              </List.Item>
            )}
          />
          
          {/* Nút Thanh toán sẽ bị vô hiệu hóa nếu không có sản phẩm nào được chọn */}
          <Link to="/checkout">
            <Button type="primary" disabled={selectedItems.length === 0}>
              Tiến hành thanh toán ({selectedItems.length} sản phẩm)
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
