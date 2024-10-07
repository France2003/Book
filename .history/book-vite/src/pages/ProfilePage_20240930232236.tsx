import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [user, setUser] = useState<any>(null); // Store user data
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Set user data from localStorage
        } else {
            navigate("/Book/login"); // Redirect to login if no user found
        }
    }, [navigate]);

    if (!user) return null; // Wait for user data to load

    return (
        <div className="profile min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Profile</title>
            </Helmet>
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>
                <div className="flex flex-col items-center mb-6">
                    <img
                        src={user.avatar || 'https://via.placeholder.com/150'}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-bold">{user.name}</h3>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email:</label>
                    <p className="text-gray-300">{user.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone Number:</label>
                    <p className="text-gray-300">{user.phoneNumber || 'N/A'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Shipping Address:</label>
                    <p className="text-gray-300">{user.shippingAddress || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
