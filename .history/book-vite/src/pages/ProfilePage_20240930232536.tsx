import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");
    const [shippingAddress, setShippingAddress] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setName(userData.name);
            setEmail(userData.email);
            setPhoneNumber(userData.phoneNumber || "");
            setAvatar(userData.avatar || "");
            setShippingAddress(userData.shippingAddress || "");
        } else {
            navigate("/Book/login"); // Chuyển hướng đến trang đăng nhập nếu không tìm thấy người dùng
        }
    }, [navigate]);

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedUser = {
            name,
            email,
            phoneNumber,
            avatar,
            shippingAddress,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        alert("Thông tin tài khoản đã được cập nhật thành công!");
    };

    if (!user) return null;

    return (
        <div className="profile min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Cập nhật thông tin tài khoản</h2>
                <form onSubmit={handleUpdateProfile}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Tên:</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email:</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Số điện thoại:</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Avatar URL:</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="text"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Địa chỉ giao hàng:</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="text"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        type="submit"
                    >
                        Cập nhật
                    </button>
                </form>
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Thông tin tài khoản hiện tại:</h3>
                    <p><strong>Tên:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Số điện thoại:</strong> {user.phoneNumber || 'N/A'}</p>
                    <p><strong>Avatar:</strong> {user.avatar || 'N/A'}</p>
                    <p><strong>Địa chỉ giao hàng:</strong> {user.shippingAddress || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
