import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Adjust if needed

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // Returns { token, user }
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

export const getUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Failed to fetch user", error);
        return null;
    }
};
