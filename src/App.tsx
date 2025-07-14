import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import CollectionsPage from "./pages/CollectionsPage.tsx";
import CapsulesPage from "./pages/CapsulesPage.tsx";
import UsersPage from "./pages/UsersPage.tsx";
import RewardsPage from "./pages/RewardsPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/capsules" element={<CapsulesPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/rewards" element={<RewardsPage />} />

        </Routes>
    );
}

export default App;
