import { useEffect, useState } from "react";
import { fetchDashboardData } from "../../api/api";

const Dashboard = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchDashboardData();
            setData(result);
        };
        getData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {data ? (
                <pre>{JSON.stringify(data, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Dashboard;
