import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/tailwind.css';
import Login from "./pages/Login";
import Register from "./pages/Register";


const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <main>
                    <Routes>
                      // Ajoutez les routes ici
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
