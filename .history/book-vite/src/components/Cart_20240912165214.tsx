// components/Cart.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import { List, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Book } from '../types'; // Import kiểu CartItem nếu cần
import BookCategory from './BookCategory';

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
              grid={{ gutter: 16, column: 1 }}
              dataSource={cartItems}
              renderItem={(item: Book) => (
                <List.Item key={item.id}>
                  <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                    <img src={item.image} alt={item.title} className="w-[150px] h-[150px] object-cover" />
                    <div className="flex-1 ml-4">
                      <p className="text-lg font-medium">{item.title}</p>
                      <p className="text-gray-600 truncate max-w-[200px]">Tác giả: {item.author}</p>
                    </div>
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center gap-4">
                        <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                        <span>{item.quantity}</span>
                        <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                      </div>
                    </div>
                    <div className="flex-1 text-center">
                      <p className="text-lg font-semibold text-red-500">{item.price} VND</p>
                    </div>
                    <div className="flex-1 text-center">
                      <Button className="border border-red-500 text-red-500" onClick={() => dispatch(removeFromCart(item.id))}>Xóa</Button>
                    </div>
                    <div className="flex-1 text-center">
                      <Checkbox
                        checked={isItemSelected(item.id)}
                        onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                        style={{ transform: 'scale(1.3)' }}
                      />
                    </div>
                  </div>
                </List.Item>
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
