import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MapPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
