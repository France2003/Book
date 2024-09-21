import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { List, Card, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Book } from '../types'; // Import kiểu CartItem nếu cần

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Hàm chọn sản phẩm
  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    }
  };

  // Kiểm tra sản phẩm có được chọn không
  const isItemSelected = (id: number) => selectedItems.includes(id);

  // Hàm chọn tất cả
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allItemIds = cartItems.map(item => item.id); // Lấy tất cả các ID sản phẩm
      setSelectedItems(allItemIds);
    } else {
      setSelectedItems([]);
    }
    setSelectAll(checked); // Cập nhật trạng thái của checkbox "Chọn tất cả"
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { selectedItems: cartItems.filter(item => selectedItems.includes(item.id)) } });
  };

  return (
    <div className="cart">
      <h1 className='mt-[25px]'>Giỏ hàng</h1>
      {cartItems.length === 0 ? (
        <p>Giỏ hàng của bạn hiện tại trống.</p>
      ) : (
        <>
          <List
            grid={{ gutter: 16, column: 1}}
            dataSource={cartItems}
            renderItem={(item: Book) => ( // Xác định kiểu của item là CartItem
              <List.Item >
                <Card style={{ lineHeight: 3, display: 'flex', justifyContent:'space-evenly' }}
                  title={`${item.title} (x${item.quantity})`}
                >
                  <div className='flex gap-[35px] items-center '>
                    <p>Tác giả: {item.author}</p>
                    <p>Giá: ${item.price}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                      <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                      <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                    </div>
                    <Button style={{border:1, borderStyle:'solid', borderColor:'red'}} onClick={() => dispatch(removeFromCart(item.id))}>
                      Xóa
                    </Button>
                    <Checkbox style={{border:1, borderStyle:'solid', borderColor:'red'}}
                      checked={isItemSelected(item.id)}
                      onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                    >
                    </Checkbox>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <div style={{ marginBottom: '10px' }}>
            <Checkbox
              checked={selectAll}
              onChange={(e) => handleSelectAll(e.target.checked)}
            >
              Chọn tất cả sản phẩm
            </Checkbox>
          </div>
          <Button className='bg-[#EE4D2D] text-white'
            type="primary" onClick={handleCheckout} disabled={selectedItems.length === 0}>
            Tiến hành thanh toán ({selectedItems.length} sản phẩm)
          </Button>
        </>
      )}
    </div>
  );
};

export default Cart;
