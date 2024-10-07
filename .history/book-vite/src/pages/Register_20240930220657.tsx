import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register({ url }: { url: string }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>(""); // State cho nhập lại mật khẩu
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State cho thông báo lỗi
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true); // State để kiểm tra mật khẩu trùng khớp
    const navigate = useNavigate();

    useEffect(() => {
        if (confirmPassword) {
            if (password === confirmPassword) {
                setPasswordMatch(true);  // Mật khẩu khớp
                setErrorMessage(null);    // Xóa thông báo lỗi nếu trùng khớp
            } else {
                setPasswordMatch(false); // Mật khẩu không khớp
                setErrorMessage("Passwords do not match!"); // Hiển thị thông báo lỗi
            }
        }
    }, [password, confirmPassword]); // Theo dõi sự thay đổi của `password` và `confirmPassword`

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordMatch) {
            return; // Không cho phép submit nếu mật khẩu không khớp
        }

        const user = {
            name,
            email,
            password,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setSuccessMessage("Registration successful! You can now log in.");
        setTimeout(() => {
            navigate("/Book/login");
        }, 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login min-h-screen flex items-center justify-center bg-gray-900 text-white container_signin">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-600 text-white rounded-md">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute mt-[30px] inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className={`w-full px-3 py-2 border ${passwordMatch ? "border-gray-600" : "border-red-600"} rounded-md bg-gray-700 text-white`} // Đổi màu border nếu mật khẩu không khớp
                            type={showPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account? <Link to={`/Book/login`} className="text-blue-500 hover:text-blue-400">Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
