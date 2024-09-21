import React from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiJcb } from 'react-icons/si';
import { IoMdQrScanner } from 'react-icons/io';
import { SiZalo } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-10">
        {/* Hỗ trợ khách hàng */}
        <div>
          <h3 className="font-bold mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Hotline: 1900-6035</li>
            <li>Các câu hỏi thường gặp</li>
            <li>Gửi yêu cầu hỗ trợ</li>
            <li>Hướng dẫn đặt hàng</li>
            <li>Phương thức vận chuyển</li>
            <li>Chính sách đổi trả</li>
          </ul>
        </div>
        
        {/* Về Tiki */}
        <div>
          <h3 className="font-bold mb-4">Về Tiki</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Giới thiệu Tiki</li>
            <li>Tiki Blog</li>
            <li>Tuyển dụng</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>
        </div>
        
        {/* Phương thức thanh toán */}
        <div>
          <h3 className="font-bold mb-4">Phương thức thanh toán</h3>
          <div className="flex flex-wrap gap-3">
            <SiVisa className="w-8 h-8 text-blue-600" />
            <SiMastercard className="w-8 h-8 text-red-600" />
            <SiJcb className="w-8 h-8 text-green-600" />
            {/* <SiMomo className="w-8 h-8 text-pink-500" />
            <SiZalopay className="w-8 h-8 text-blue-500" /> */}
            <IoMdQrScanner className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        
        {/* Kết nối với chúng tôi */}
        <div>
          <h3 className="font-bold mb-4">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4">
              <FaFacebook style={{ fontSize: '26px', color: 'blue' }} />
              <FaYoutube style={{ fontSize: '26px', color: 'red' }} />
              <SiZalo style={{ fontSize: '26px', color: 'blue' }} />
          </div>
        </div>

        {/* Ứng dụng */}
        <div>
          <h3 className="font-bold mb-4">Tải ứng dụng trên điện thoại</h3>
          <div className="flex flex-col space-y-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/58/App_Store_logo.svg"
              alt="App Store"
              className="w-32"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Google_Play_Store_badge_EN.svg"
              alt="Google Play"
              className="w-32"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
