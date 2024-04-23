import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/tailwind.css';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"; // Importez le composant Home
import Profile from "./pages/Profile";
const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/home" element={<Home />} /> {/* Ajoutez cette ligne */}
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
