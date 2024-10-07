import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Register({ url }: { url: string }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);  // Hiển thị mật khẩu cho ô Password
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);  // Hiển thị mật khẩu cho ô Confirm Password
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(true);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const navigate = useNavigate();
    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };
    const validatePassword = (password: string) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordPattern.test(password);
    };

    useEffect(() => {
        if (confirmPassword) {
            if (password === confirmPassword) {
                setPasswordMatch(true);
                setErrorMessage(null);
            } else {
                setPasswordMatch(false);
                setErrorMessage("Mật khẩu không khớp!");
            }
        }
    }, [password, confirmPassword]);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        let valid = true;
        if (!email) {
            setEmailError("Vui lòng nhập email");
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Email không hợp lệ");
            valid = false;
        } else {
            setEmailError(null);
        }

        if (!password) {
            setPasswordError("Vui lòng nhập mật khẩu");
            valid = false;
        } else if (!validatePassword(password)) {
            setPasswordError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số");
            valid = false;
        } else {
            setPasswordError(null);
        }

        if (!valid || !passwordMatch) {
            return;
        }


        const user = {
            name,
            email,
            password,
        };

        localStorage.setItem("user", JSON.stringify(user));
        setSuccessMessage("Đăng ký thành công! Bây giờ bạn có thể đăng nhập.");
        setTimeout(() => {
            navigate("/Book/login");
        }, 2000);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">Name</label>
                        <input
                            className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                            type="text"
                            id="name"
                            placeholder="Nhập tên của bạn"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                        <input
                            className={`w-full px-3 py-2 border ${emailError ? "border-red-600" : "border-gray-600"} rounded-md bg-gray-700 text-white`}
                            type="email"
                            id="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">{emailError}</p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
                        <input
                            className={`w-full px-3 py-2 border ${passwordError ? "border-red-600" : "border-gray-600"} rounded-md bg-gray-700 text-white`}
                            type={showPassword ? "text" : "password"}
                            id="password"
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                        {passwordError && (
                            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                        )}
                    </div>

                    <div className="mb-6 relative">
                        <label className="block text-sm font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className={`w-full px-3 py-2 border ${passwordMatch ? "border-gray-600" : "border-red-600"} rounded-md bg-gray-700 text-white`}
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <div
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                        {!passwordMatch && (
                            <p className="text-red-500 text-sm mt-1">Mật khẩu không khớp!</p>
                        )}
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
