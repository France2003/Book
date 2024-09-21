// components/Cart.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { List, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types';
import BookCategory from './BookCategory';

const CartItem: React.FC<{ item: Book; onIncrease: () => void; onDecrease: () => void; onRemove: () => void; onSelect: (checked: boolean) => void; isSelected: boolean }> = ({ item, onIncrease, onDecrease, onRemove, onSelect, isSelected }) => (
  <List.Item key={item.id}>
    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
      <img src={item.image} alt={item.title} className="w-[150px] h-[150px] object-cover" />
      <div className="flex-1 ml-4">
        <p className="text-lg font-medium">{item.title}</p>
        <p className="text-gray-600 truncate">Tác giả: {item.author}</p>
      </div>
      <div className="flex-1 text-center">
        <div className="flex items-center justify-center gap-4">
          <Button onClick={onDecrease}>-</Button>
          <span>{item.quantity}</span>
          <Button onClick={onIncrease}>+</Button>
        </div>
      </div>
      <div className="flex-1 text-center">
        <p className="text-lg font-semibold text-red-500">{item.price} VND</p>
      </div>
      <div className="flex-1 text-center">
        <Button className="border border-red-500 text-red-500" onClick={onRemove}>Xóa</Button>
      </div>
      <div className="flex-1 text-center">
        <Checkbox
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          style={{ transform: 'scale(1.3)' }}
        />
      </div>
    </div>
  </List.Item>
);

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectItem = (id: number, checked: boolean) => {
    setSelectedItems(prev => checked ? [...prev, id] : prev.filter(itemId => itemId !== id));
  };

  const isItemSelected = (id: number) => selectedItems.includes(id);

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? cartItems.map(item => item.id) : []);
    setSelectAll(checked);
  };

  const handleCheckout = () => {
    navigate('/checkout', { state: { selectedItems: cartItems.filter(item => selectedItems.includes(item.id)) } });
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-6 border-r border-gray-200">
        <BookCategory />
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-4">Giỏ hàng</h1>
        {cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn hiện tại trống.</p>
        ) : (
          <>
            <List
            className=''
              grid={{ gutter: 16, column: 1 }}
              dataSource={cartItems}
              renderItem={(item: Book) => (
                <CartItem
                  item={item}
                  onIncrease={() => dispatch(increaseQuantity(item.id))}
                  onDecrease={() => dispatch(decreaseQuantity(item.id))}
                  onRemove={() => dispatch(removeFromCart(item.id))}
                  onSelect={(checked) => handleSelectItem(item.id, checked)}
                  isSelected={isItemSelected(item.id)}
                />
              )}
            />
            <div className="flex items-center justify-between mt-4">
              <Checkbox
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
                style={{ transform: 'scale(1.3)' }}
              >
                Chọn tất cả sản phẩm
              </Checkbox>
              <Button
                className="bg-[#EE4D2D] text-white px-6 py-2 rounded"
                type="primary"
                onClick={handleCheckout}
                disabled={selectedItems.length === 0}
              >
                Tiến hành thanh toán ({selectedItems.length} sản phẩm)
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
