const API_URL = import.meta.env.VITE_API_URL; // Fetch from .env file

export const loginUser = async (username, password) => {
    const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    return response.json();
};

export const fetchDashboardData = async () => {
    const response = await fetch(`${API_URL}/api/dashboard`);
    return response.json();
};
