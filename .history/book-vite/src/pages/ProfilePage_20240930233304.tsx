import { useState } from 'react';
import { Helmet } from 'react-helmet';

function UserProfile() {
    const [username, setUsername] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [gender, setGender] = useState<string>('Nam'); // Default to male
    const [birthDate, setBirthDate] = useState<{ day: number; month: number; year: number }>({
        day: 1,
        month: 1,
        year: 2000,
    });
    const [avatar, setAvatar] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const userInfo = {
            username,
            name,
            email,
            phone,
            gender,
            birthDate,
            avatar,
        };
        localStorage.setItem('userProfile', JSON.stringify(userInfo));
        alert('Thông tin đã được lưu thành công!');
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatar(e.target.files[0]);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Hồ Sơ Của Tôi</title>
            </Helmet>
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-semibold mb-6 text-center">Hồ Sơ Của Tôi</h2>
                <p className="text-center text-gray-500 mb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="username">Tên đăng nhập</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Tên</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="phone">Số điện thoại</label>
                        <input
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                            type="text"
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Nhập số điện thoại của bạn"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Giới tính</label>
                        <div>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="Nam"
                                    checked={gender === 'Nam'}
                                    onChange={() => setGender('Nam')}
                                />
                                Nam
                            </label>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="Nữ"
                                    checked={gender === 'Nữ'}
                                    onChange={() => setGender('Nữ')}
                                />
                                Nữ
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="Khác"
                                    checked={gender === 'Khác'}
                                    onChange={() => setGender('Khác')}
                                />
                                Khác
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Ngày sinh</label>
                        <div className="flex space-x-4">
                            <input
                                type="number"
                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                value={birthDate.day}
                                onChange={(e) => setBirthDate({ ...birthDate, day: Number(e.target.value) })}
                                placeholder="Ngày"
                            />
                            <input
                                type="number"
                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                value={birthDate.month}
                                onChange={(e) => setBirthDate({ ...birthDate, month: Number(e.target.value) })}
                                placeholder="Tháng"
                            />
                            <input
                                type="number"
                                className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                value={birthDate.year}
                                onChange={(e) => setBirthDate({ ...birthDate, year: Number(e.target.value) })}
                                placeholder="Năm"
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Chọn ảnh</label>
                        <input
                            type="file"
                            accept="image/jpeg, image/png"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md bg-white focus:outline-none"
                        />
                        <p className="text-xs text-gray-400">Dung lượng file tối đa 1 MB. Định dạng: JPEG, PNG</p>
                    </div>
                    <button
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md"
                        type="submit"
                    >
                        Lưu
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;
