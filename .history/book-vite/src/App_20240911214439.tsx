import React from 'react';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Header from './components/Header';
import AdminPage from './pages/AdminPage';
import OrderConfirmation from './pages/OrderConfirmationPage';
import CancelOrder from './components/CancelOrder';
import RouteSignIn from './LayoutLogin/LayoutLogin';
import Login from './pages/Login';
import RouteRegister from './LayoutRegister/LayoutRegister';
import Register from './pages/Register';
import DefaultLayout from './Layouts';

const App: React.FC = () => {
  return (
    <Provider store={store}>


      <BrowserRouter>
        <Router>
          <Route path='/' element={<RouteSignIn />}>
            <Route index element={<Login url={`login`} />} />
          </Route>
          <Route path='/register' element={<RouteRegister />}>
            <Route path='register' element={<Register url={`register`} />} />
          </Route>
          <Route path="/bookhome" element={<DefaultLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/cancel-order" element={<CancelOrder />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Router>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
