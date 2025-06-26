const API_BASE_URL = 'http://localhost:5000/api';
import api from "./axiosConfig.js";
import axios from "axios";

export const registerUser = async (username, password) => {
    try {
        // FIX: Change '/register' to '/users' to match your UserController
        await axios.post(`${API_BASE_URL}/users`, {
            username,
            password,
        });
        return true;
    } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
        return false;
    }
};

// This is your existing function, which is correct for logging in.
export const verifyLogin = async (username, password) => {
    try {
        // --- FIX 3: Use 'api.get' and pass the auth config directly ---
        // The interceptor might not have the credentials yet during the login check,
        // so we explicitly provide them for this one verification call.
        await api.get('/user', {
            auth: {
                username: username,
                password: password,
            },
        });
        return true;
    } catch (error) {
        console.error('Login verification failed:', error.response?.data || error.message);
        return false;
    }
};