import { useState, useEffect } from 'react';
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

    // Load user profile from localStorage when component mounts
    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            const { username, name, email, phone, gender, birthDate, avatar } = JSON.parse(userProfile);
            setUsername(username);
            setName(name);
            setEmail(email);
            setPhone(phone);
            setGender(gender);
            setBirthDate(birthDate);
            if (avatar) {
                setAvatar(avatar); // Set the avatar as a base64 string
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let avatarBase64 = '';
        if (avatar) {
            avatarBase64 = await convertFileToBase64(avatar);
        }

        const userInfo = {
            username,
            name,
            email,
            phone,
            gender,
            birthDate,
            avatar: avatarBase64,
        };
        localStorage.setItem('userProfile', JSON.stringify(userInfo));
        alert('Thông tin đã được lưu thành công!');
    };

    const convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
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
                                    {[...Array(101).keys()].map((y) => (
                                        <option key={y + 1920} value={y + 1920}>{y + 1920}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Ảnh đại diện</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        {avatar && (
                            <img
                                src={URL.createObjectURL(avatar)}
                                alt="Avatar Preview"
                                className="w-32 h-32 rounded-full border border-gray-300 mb-4"
                            />
                        )}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
