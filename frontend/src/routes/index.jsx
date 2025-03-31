import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminDashboard from "../pages/Admin/Dashboard";
import VerifierDashboard from "../pages/Verifier/Dashboard";
import UserDashboard from "../pages/User/Dashboard";
import Login from "../pages/Auth/Login";
// import NotFound from "../pages/NotFound";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["admin", "verifier"]} />}>
                    <Route path="/verifier/dashboard" element={<VerifierDashboard />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["admin", "verifier", "user"]} />}>
                    <Route path="/user/dashboard" element={<UserDashboard />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
