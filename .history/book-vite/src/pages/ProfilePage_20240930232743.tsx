import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

function Profile() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [avatar, setAvatar] = useState<string | null>(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || ''); // Assume phone is added later
            setAddress(user.address || ''); // Assume address is added later
            setAvatar(user.avatar || null); // Assume avatar is added later
        }
    }, []);

    const handleSave = () => {
        const user = { name, email, phone, address, avatar };
        localStorage.setItem('user', JSON.stringify(user));
        alert('Thông tin đã được lưu!');
    };

    return (
        <div className="profile min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
                <link rel="canonical" href="http://mysite.com/profile" />
            </Helmet>
            <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Thông Tin Tài Khoản</h2>
                <div className="mb-4 flex flex-col items-center">
                    {avatar ? (
                        <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full mb-4" />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-600 mb-4 flex items-center justify-center">
                            <span className="text-gray-300">No Image</span>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setAvatar(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            }
                        }}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="name">Tên</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên của bạn"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="phone">Số Điện Thoại</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại của bạn"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="address">Địa Chỉ Giao Hàng</label>
                    <input
                        className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Nhập địa chỉ của bạn"
                    />
                </div>
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                    type="button"
                    onClick={handleSave}
                >
                    Lưu Thay Đổi
                </button>
                <p className="mt-4 text-center">
                    <Link to={`/Book/`} className="text-blue-500 hover:text-blue-400">Quay lại trang chủ</Link>
                </p>
            </div>
        </div>
    );
}

export default Profile;
