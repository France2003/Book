import { useDispatch } from 'react-redux';
import { addOrder } from '../redux/ordersSlice';
import { Order } from '../types';

const handlePlaceOrder = (order: Order) => {
  const dispatch = useDispatch();
  dispatch(addOrder(order)); // Lưu đơn hàng vào Redux và localStorage
  // Các xử lý khác như thông báo cho người dùng
};
