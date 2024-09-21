import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import AdminPage from './pages/AdminPage';
import OrderConfirmation from './pages/OrderConfirmationPage';
import CancelOrder from './components/CancelOrder';
import RouteSignIn from './LayoutLogin/LayoutLogin';
import Login from './pages/Login';
import RouteRegister from './LayoutRegister/LayoutRegister';
import Register from './pages/Register';
import DefaultLayout from './Layouts';
import AdminLayout from './LayoutAdmin/AdminLayout';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RouteSignIn />}>
            <Route index element={<Login url={`login`} />} />
          </Route>
          <Route path='/register' element={<RouteRegister />}>
            <Route path='register' element={<Register url={`register`} />} />
          </Route>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/cancel-order" element={<CancelOrder />} />
          </Route>
          <Route path='/adminpage' element={<AdminLayout />}>
            <Route path="/adminpage/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
