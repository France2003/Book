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
                        {/* ... các trường khác không thay đổi ... */}
                        
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
