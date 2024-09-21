import React from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiJcb } from 'react-icons/si';
import { IoMdQrScanner } from 'react-icons/io';
import { SiZalo } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-10 shadow-teal-400">
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
            <img src="https://www.smiledental.co.nz/wp-content/uploads/2024/03/png-transparent-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment-logo.png" alt="Visa" className="w-8 h-8" />
            <img src="https://upanh.vector6.com/images/2020/04/24/013-Logo-PNG-FILE-NganHang-MB-Bank.jpg" alt="MasterCard" className="w-8 h-8" />
            <img src="https://banner2.cleanpng.com/20180802/ivj/6889aece1763bc80718acc2c513b868f.webp" alt="JCB" className="w-8 h-8" />
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png" alt="Momo" className="w-8 h-8" />
            <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-Square.png" alt="Momo" className="w-8 h-8" />
            <img src="https://lh3.googleusercontent.com/proxy/2j5Hms6QnSW35B6V_fYgxdijD4sbQqQTK77VwHQ3wYybakyuVrkmgMromoZL8mVfDdN1bPjpSLkVSi3JH3Usa7Avy6AXNIAKgLw" alt="Momo" className="w-8 h-8" />
            <IoMdQrScanner className="w-8 h-8 text-gray-500" />
          </div>
        </div>

        {/* Kết nối với chúng tôi */}
        <div className=''>
          <h3 className="font-bold  mb-4">Kết nối với chúng tôi</h3>
          <div className="flex  space-x-4">
            <FaFacebook style={{ fontSize: '26px', color: 'blue' }} />
            <FaYoutube style={{ fontSize: '26px', color: 'red' }} />
            <SiZalo style={{ fontSize: '26px', color: 'blue' }} />
          </div>
          <h3 className="font-bold mt-4">Chứng nhận bởi</h3>
          <div className="flex space-x-2 mt-2">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png" alt="Chứng nhận 1" className="w-12 h-12" />
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg" alt="Chứng nhận 2" className="w-12 h-12" />
            <img src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=388d758c-6722-4245-a2b0-1d2415e70127" alt="Chứng nhận 2" className="w-12 h-12" />
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">Hợp tác và liên kết</h3>
          <ul className="text-sm">
            <li>Quy chế hoạt động Sàn GDTMĐT</li>
            <li>Bán hàng cùng Tiki</li>
          </ul>
          <h3 className="font-bold mb-4">Tải ứng dụng trên điện thoại</h3>
          <div className="flex space-x-2 mt-2">
            <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png" alt="QR code" className="w-20 h-20" />
            <div className="flex flex-col space-y-2">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png" alt="App Store" className="w-32 h-10" />
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png" alt="Google Play" className="w-32 h-10" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-600">
          © 2024 Tiki - Sàn thương mại điện tử hàng đầu Việt Nam
        </div>
    </footer>
  );
};

export default Footer;
