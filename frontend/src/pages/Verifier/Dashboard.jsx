import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifierDashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token from local storage
                if (!token) {
                    alert("Unauthorized! Redirecting to login.");
                    navigate("/login");
                    return;
                }

                const response = await axios.get("http://localhost:5000/api/verifier", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching verifier data:", error);
                alert("Session expired or unauthorized.");
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Verifier Dashboard</h2>
            {userData ? (
                <div>
                    <p><strong>Message:</strong> {userData.message}</p>
                    <p><strong>Role:</strong> Verifier</p>
                </div>
            ) : (
                <p>Loading verifier data...</p>
            )}
        </div>
    );
};

export default VerifierDashboard;
