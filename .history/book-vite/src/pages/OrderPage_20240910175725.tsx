import { useDispatch } from 'react-redux';
import { addOrder } from '../redux/ordersSlice';

// Giả sử bạn có một hàm handlePlaceOrder để xử lý khi đặt hàng
const handlePlaceOrder = (order: Order) => {
  const dispatch = useDispatch();
  dispatch(addOrder(order));
  // Các xử lý khác như thông báo cho người dùng
};
