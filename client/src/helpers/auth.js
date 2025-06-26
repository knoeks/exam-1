import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// --- THIS IS THE NEW FUNCTION YOU NEED TO ADD ---
// It handles creating a new user.
export const registerUser = async (username, password) => {
    try {
        // A registration endpoint is typically a POST request.
        // It sends the new user's data in the request body.
        // Ensure your backend has a PUBLIC endpoint at /api/register or similar.
        await axios.post(`${API_BASE_URL}/register`, {
            username,
            password,
        });
        // If the request above succeeds (doesn't throw an error), registration was successful.
        return true;
    } catch (error) {
        // This will likely fail if the username already exists (e.g., a 409 Conflict error).
        console.error('Registration failed:', error.response?.data || error.message);
        return false;
    }
};


// This is your existing function, which is correct for logging in.
export const verifyLogin = async (username, password) => {
    try {
        // We make a request to a protected endpoint to test the credentials.
        await axios.get(`${API_BASE_URL}/user`, { // Or any simple, protected endpoint
            auth: {
                username: username,
                password: password,
            },
        });
        // If the request above does NOT throw an error, credentials are valid.
        return true;
    } catch (error) {
        console.error('Login verification failed:', error.response?.data || error.message);
        return false;
    }
};