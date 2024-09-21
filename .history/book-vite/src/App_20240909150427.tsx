import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home';
// import About from './pages/About';
// import Categories from './pages/Categories';
import Login from './pages/Login';
// import Register from './pages/Register';
import Cart from './components/Cart';
import MainLayout from './Layouts/MainLayout'; // Import layout chính

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} /> */}
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MainLayout>
      </Router>
    </Provider>
  );
};

export default App;
