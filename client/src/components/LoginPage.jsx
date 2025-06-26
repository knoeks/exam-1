// src/pages/AuthPage.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import BOTH helpers for login and register
import { verifyLogin, registerUser } from '../helpers/auth';

const AuthPage = ({ setIsLoggedIn }) => {
    // State to track if we are in 'register' or 'login' mode
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    // FIX 1: Use a single state object for all form fields
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '', // Only for register mode
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // This function updates the formData state object correctly
    const handleInputChange = (e) => {
        if (error) setError('');
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Use the 'name' attribute to update the right field
        });
    };

    // This function toggles between login and register views
    const handleSwitchMode = () => {
        setIsRegisterMode((prevMode) => !prevMode);
        setError(''); // Clear errors when switching
        setFormData({ username: '', password: '', confirmPassword: '' }); // Reset form fields
    };

    // FIX 2: A single handler for both login and registration
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const { username, password, confirmPassword } = formData;

        if (isRegisterMode) {
            // --- REGISTRATION LOGIC ---
            if (password !== confirmPassword) {
                setError('Passwords do not match!');
                setIsLoading(false);
                return;
            }
            const success = await registerUser(username, password);
            if (success) {
                alert('Registration successful! Please log in to continue.');
                handleSwitchMode(); // Switch to login mode
            } else {
                setError('Registration failed. Username might already be taken.');
            }
        } else {
            // --- LOGIN LOGIC ---
            const isValid = await verifyLogin(username, password);
            if (isValid) {
                const userCredentials = { username, password };
                localStorage.setItem('userCredentials', JSON.stringify(userCredentials));
                setIsLoggedIn(true);
                navigate('/'); // Redirect to dashboard
            } else {
                setError('Invalid username or password.');
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-center" style={{ minHeight: '80vh' }}>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800">
                    {isRegisterMode ? 'Create an Account' : 'Welcome Back'}
                </h2>

                {error && <p className="text-sm text-center text-red-500">{error}</p>}

                {/* FIX 3: The form correctly uses handleSubmit */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* FIX 4: Inputs are correctly bound to the formData state object */}
                    <input
                        type="text"
                        name="username" // Name attribute is essential
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        name="password" // Name attribute is essential
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {/* Conditionally render "Confirm Password" field */}
                    {isRegisterMode && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Processing...' : (isRegisterMode ? 'Register' : 'Log In')}
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600">
                    {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
                    {/* FIX 5: Use a button to switch modes instead of a Link */}
                    <button
                        type="button"
                        onClick={handleSwitchMode}
                        className="ml-1 font-semibold text-blue-600 hover:underline"
                    >
                        {isRegisterMode ? 'Login here' : 'Register now'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;