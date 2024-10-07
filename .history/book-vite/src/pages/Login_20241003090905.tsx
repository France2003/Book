import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ url }: { url: string }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovies = async () => {
            // Handle any necessary side effects here
        };

        fetchMovies();
    }, [url]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Reset email error on every attempt
        setEmailError(null);

        // Validate email
        if (!validateEmail(email)) {
            setEmailError("Định dạng email không hợp lệ");
            return;
        }

        const adminEmail = "admin@gmail.com";
        const adminPassword = "admin123";
        if (email === adminEmail && password === adminPassword) {
            setSuccessMessage("Admin login successful!");
            setTimeout(() => {
                navigate("/Book/adminpage/admin");
            }, 2000);
            return;
        }

        // Regular user login
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.email === email && user.password === password) {
                setSuccessMessage("Đăng nhập thành công!");
                setTimeout(() => {
                    navigate("/Book/"); // Redirect to user home page
                }, 2000);
            } else {
                setSuccessMessage("Email hoặc mật khẩu không hợp lệ.");
            }
        } else {
            setSuccessMessage("Không tìm thấy người dùng. Vui lòng đăng ký.");
        }
    };

    return (
        <div className="login min-h-screen flex items-center justify-center text-white container_signin">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Đăng Nhập</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-600 text-white rounded-md">
                        {successMessage}
                    </div>
                )}
                {emailError && (
                    <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
                        {emailError}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            className={`w-full px-3 py-2 border ${emailError ? "border-red-600" : "border-gray-600"} rounded-md bg-gray-700 text-white`}
                            type="email"
                            id="email"
                            placeholder="Vui lòng nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Mật khẩu</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Vui lòng nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={togglePasswordVisibility}
                            style={{ top: '70%', transform: 'translateY(-50%)' }}
                        >
                            {showPassword ? (
                                <FaEyeSlash />
                            ) : (
                                <FaEye />
                            )}
                        </div>
                    </div>
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to={`/Book/register`} className="text-blue-500 hover:text-blue-400">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
