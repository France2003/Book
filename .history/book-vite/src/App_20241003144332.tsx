import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import Cart from './components/Cart';
import CancelOrder from './components/CancelOrder';
import RouteSignIn from './LayoutLogin/LayoutLogin';
import RouteRegister from './LayoutRegister/LayoutRegister';
import DefaultLayout from './Layouts';
import AdminLayout from './LayoutAdmin/AdminLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import BookPage from './pages/BookPage';
import FilteredBooksPage from './pages/BookCategoryPage';
import UserProfile from './pages/ProfilePage';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmationPage';
import FeaturedBooks from './pages/FeaturedAndPromotionalBooks';
import BestSellersBooks from './pages/BestSeller';
import SearchResults from './pages/SearchResults';
import AdminPage from './pages/AdminPage';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/Book/login' element={<RouteSignIn />}>
            <Route path='login' element={<Login url={`login`} />} />
          </Route>
          <Route path='/Book/register' element={<RouteRegister />}>
            <Route path='register' element={<Register url={`register`} />} />
          </Route>
          <Route path="/Book/" element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/Book/books/:id" element={<BookPage />} />
            <Route path="/Book/books/grade/:grade/subject/:subject" element={<FilteredBooksPage />} />
            <Route path="/Book/cart" element={<Cart />} />
            <Route path="/Book/profile" element={<UserProfile />} />
            <Route path="/Book/checkout" element={<Checkout />} />
            <Route path="/Book/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/Book/cancel-order" element={<CancelOrder />} />
            <Route path="/Book/featured" element={<FeaturedBooks/>} />
            <Route path="/Book/bestseller" element={<BestSellersBooks/>} />
            <Route path="/Book/search" element={<SearchResults />} />
          </Route>
          <Route path='/Book/adminpage' element={<AdminLayout />}>
            <Route path="/Book/adminpage/admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
