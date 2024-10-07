import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Nhập Provider từ react-redux
import store from './redux/store'; // Nhập store đã tạo từ Redux
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>  {/* Bọc toàn bộ ứng dụng với Provider */}
      <App />
    </Provider>
  </StrictMode>,
);
