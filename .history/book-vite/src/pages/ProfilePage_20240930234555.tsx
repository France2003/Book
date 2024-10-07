import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

    const handleFileChange = (info: any) => {
        if (info.file.status === 'done') {
            setAvatar(info.file.originFileObj);
        }
    };

    const uploadProps = {
        accept: 'image/jpeg, image/png',
        showUploadList: false,
        onChange: handleFileChange,
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-800">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Hồ Sơ Của Tôi</title>
            </Helmet>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md flex p-8">
                <div className="w-2/3 pr-6">
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
                            <div className="flex space-x-4">
                                <label>
                                    <input
                                        type="radio"
                                        value="Nam"
                                        checked={gender === 'Nam'}
                                        onChange={() => setGender('Nam')}
                                    />
                                    Nam
                                </label>
                                <label>
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
                                <select
                                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                    value={birthDate.day}
                                    onChange={(e) => setBirthDate({ ...birthDate, day: Number(e.target.value) })}
                                >
                                    {[...Array(31).keys()].map((d) => (
                                        <option key={d + 1} value={d + 1}>{d + 1}</option>
                                    ))}
                                </select>
                                <select
                                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                    value={birthDate.month}
                                    onChange={(e) => setBirthDate({ ...birthDate, month: Number(e.target.value) })}
                                >
                                    {[...Array(12).keys()].map((m) => (
                                        <option key={m + 1} value={m + 1}>{m + 1}</option>
                                    ))}
                                </select>
                                <select
                                    className="w-1/3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
                                    value={birthDate.year}
                                    onChange={(e) => setBirthDate({ ...birthDate, year: Number(e.target.value) })}
                                >
                                    {Array.from({ length: 100 }, (_, i) => 2024 - i).map((y) => (
                                        <option key={y} value={y}>{y}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-md"
                            type="submit"
                        >
                            Lưu
                        </button>
                    </form>
                </div>
                <div className="w-1/3 flex flex-col items-center justify-center">
                    {avatar ? (
                        <img
                            src={URL.createObjectURL(avatar)}
                            alt="Avatar Preview"
                            className="w-32 h-32 rounded-full border border-gray-300 mb-4"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 mb-4">
                            Chưa có ảnh
                        </div>
                    )}
                    <Upload {...uploadProps}>
                        <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                    </Upload>
                    <p className="text-xs text-gray-400">Dung lượng file tối đa 1 MB. Định dạng: JPEG, PNG</p>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
