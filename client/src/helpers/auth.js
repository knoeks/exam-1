

// It handles creating a new user.
import api from "./axiosConfig.js";

export const registerUser = async (username, password) => {
    try {
        // --- FIX 2: Use 'api.post' so it uses the base URL from the config ---
        // NOTE: Registration should not require auth, so this call doesn't use the interceptor.
        // We use a separate axios instance here ONLY for registration if it's public.
        // But for consistency, let's assume it can go through the base config.
        // For a public endpoint, you might need a different setup, but let's try this first.
        await api.post('/register', {
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