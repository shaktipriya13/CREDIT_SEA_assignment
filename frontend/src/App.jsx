import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
