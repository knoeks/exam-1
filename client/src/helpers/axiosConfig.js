import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Axios Interceptor: This is the magic part!
// This function runs BEFORE every request is sent.
api.interceptors.request.use(
    (config) => {
        // Get the stored user credentials from localStorage.
        const userCredentials = localStorage.getItem('userCredentials');

        if (userCredentials) {
            // If credentials exist, parse them (they are stored as a JSON string).
            const { username, password } = JSON.parse(userCredentials);

            // Axios automatically creates the 'Basic' auth header from this 'auth' object.
            config.auth = {
                username: username,
                password: password,
            };
        }

        return config; // Return the modified config to be sent.
    },
    (error) => {
        // Handle request errors here.
        return Promise.reject(error);
    }
);

export default api;