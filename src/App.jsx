import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MapPage />} />
                <Route path="login" element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
