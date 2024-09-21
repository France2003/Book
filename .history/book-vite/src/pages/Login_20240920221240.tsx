import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login({ url }: { url: string }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        // Admin credentials
        const adminEmail = "admin@123";
        const adminPassword = "admin123";

        // Check for admin credentials
        if (email === adminEmail && password === adminPassword) {
            setSuccessMessage("Admin login successful!");
            setErrorMessage(null);
            setTimeout(() => {
                navigate("/adminpage/admin"); // Redirect to admin dashboard
            }, 2000);
            return;
        }

        // Check for user credentials
        const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const user = storedUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

        if (user) {
            setSuccessMessage("Login successful!");
            setErrorMessage(null);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } else {
            setErrorMessage("Invalid email or password.");
            setSuccessMessage(null);
        }
    };

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
                {errorMessage && (
                    <div className="mb-4 p-4 bg-red-600 text-white rounded-md">
                        {errorMessage}
                    </div>
                )}
                <form onSubmit={handleLogin}>
                    {/* Email Field */}
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
                    {/* Password Field */}
                    <div className="mb-6 relative">
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
                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        type="submit"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-400">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
