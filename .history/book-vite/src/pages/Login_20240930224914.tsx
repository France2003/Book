import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [redirect, setRedirect] = useState<boolean>(false); // Trạng thái redirect
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Attempting to log in with:", email, password);
    
        // Admin credentials
        const adminEmail = "admin@123";
        const adminPassword = "admin123";
    
        // Kiểm tra thông tin đăng nhập của admin
        if (email === adminEmail && password === adminPassword) {
            setSuccessMessage("Admin login successful!");
            setRedirect(true); // Thiết lập redirect
            return;
        }
    
        // Đăng nhập người dùng thông thường
        const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
            const users = JSON.parse(storedUsers);
            const user = users.find((u: { email: string; password: string }) => u.email === email && u.password === password);
    
            if (user) {
                console.log("Login successful for:", user);
                setSuccessMessage("Login successful!");
                setRedirect(true); // Thiết lập redirect
            } else {
                console.log("Invalid email or password.");
                setSuccessMessage("Invalid email or password.");
            }
        } else {
            console.log("No users found. Please register.");
            setSuccessMessage("No users found. Please register.");
        }
    };

    useEffect(() => {
        if (redirect) {
            const timer = setTimeout(() => {
                navigate("/Book/"); // Điều hướng đến trang chính
                console.log("Redirecting to home page.");
            }, 500); // Thời gian chờ trước khi điều hướng

            return () => clearTimeout(timer); // Dọn dẹp timeout khi component unmount
        }
    }, [redirect, navigate]);

    return (
        <div className="login min-h-screen flex items-center justify-center text-white container_signin">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-600 text-white rounded-md">
                        {successMessage}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <div
                            className="absolute mt-[30px] inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
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
