import React from 'react';
import { Row, Col } from 'antd';
import { FacebookOutlined, YoutubeOutlined } from '@ant-design/icons';

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <h3 className="font-bold mb-4">Hỗ trợ khách hàng</h3>
            <ul className="text-sm">
              <li>Hotline: <strong>1900-6035</strong></li>
              <li>(1000 đ/phút, 8-21h kể cả T7, CN)</li>
              <li>Các câu hỏi thường gặp</li>
              <li>Gửi yêu cầu hỗ trợ</li>
              <li>Hướng dẫn đặt hàng</li>
              <li>Phương thức vận chuyển</li>
              <li>Chính sách đổi trả</li>
              <li>Hỗ trợ khách hàng: hotro@tiki.vn</li>
              <li>Báo lỗi bảo mật: security@tiki.vn</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h3 className="font-bold mb-4">Về Tiki</h3>
            <ul className="text-sm">
              <li>Giới thiệu Tiki</li>
              <li>Tiki Blog</li>
              <li>Tuyển dụng</li>
              <li>Chính sách bảo mật</li>
              <li>Chính sách bảo mật thanh toán</li>
              <li>Chính sách giải quyết khiếu nại</li>
              <li>Điều khoản sử dụng</li>
            </ul>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h3 className="font-bold mb-4">Hợp tác và liên kết</h3>
            <ul className="text-sm">
              <li>Quy chế hoạt động Sàn GDTMĐT</li>
              <li>Bán hàng cùng Tiki</li>
            </ul>
            <h3 className="font-bold mt-4">Chứng nhận bởi</h3>
            <div className="flex space-x-2 mt-2">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong-2.png" alt="Chứng nhận 1" className="w-12 h-12" />
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/bo-cong-thuong.svg" alt="Chứng nhận 2" className="w-12 h-12" />
              <img src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=388d758c-6722-4245-a2b0-1d2415e70127" alt="Chứng nhận 2" className="w-12 h-12" />
            </div>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <h3 className="font-bold mb-4">Phương thức thanh toán</h3>
            <ul className="flex flex-wrap space-x-2">
              <li><img src="https://www.smiledental.co.nz/wp-content/uploads/2024/03/png-transparent-visa-mastercard-logo-visa-mastercard-computer-icons-visa-text-payment-logo.png" alt="Visa" className="w-8 h-8" /></li>
              <li><img src="https://upanh.vector6.com/images/2020/04/24/013-Logo-PNG-FILE-NganHang-MB-Bank.jpg" alt="MasterCard" className="w-8 h-8" /></li>
              <li><img src="/path/to/jcb.png" alt="JCB" className="w-8 h-8" /></li>
              <li><img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Circle.png" alt="Momo" className="w-8 h-8" /></li>
            </ul>
            <h3 className="font-bold mt-4">Kết nối với chúng tôi</h3>
            <div className="flex space-x-2 mt-2">
              <FacebookOutlined style={{ fontSize: '24px' }} />
              <YoutubeOutlined style={{ fontSize: '24px', color: 'red' }} />
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className="mt-8">
          <Col xs={24} md={12}>
            <h3 className="font-bold">Tải ứng dụng trên điện thoại</h3>
            <div className="flex space-x-2 mt-2">
              <img src="https://frontend.tikicdn.com/_desktop-next/static/img/footer/qrcode.png" alt="QR code" className="w-20 h-20" />
              <div className="flex flex-col space-y-2">
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/appstore.png" alt="App Store" className="w-32 h-10" />
                <img src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/playstore.png" alt="Google Play" className="w-32 h-10" />
              </div>
            </div>
          </Col>
        </Row>
        <div className="mt-8 text-center text-sm text-gray-600">
          © 2024 Tiki - Sàn thương mại điện tử hàng đầu Việt Nam
        </div>
      </div>
    </div>
  );
};

export default Footer;
