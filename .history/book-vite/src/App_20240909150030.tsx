import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
// import About from './pages/About'; // Trang giới thiệu
// import Categories from './pages/Categories'; // Trang phân thể loại
import Login from './pages/Login'; // Trang đăng nhập
// import Register from './pages/Register'; // Trang đăng ký
import Cart from './components/Cart';
import AppHeader from './components/Header'; // Import Header

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <AppHeader /> {/* Thêm Header */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/about" element={<About />} />
          <Route path="/categories" element={<Categories />} /> */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
