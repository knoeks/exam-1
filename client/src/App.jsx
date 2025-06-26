// src/App.jsx

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

// Component Imports
import NavBar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Footer from "./components/Footer";
import Mechanics from "./components/Mechanics";
import Servicers from "./components/Servicers";

// Page Imports // Use the new, combined Login/Register page

// React Hooks
import { useEffect, useState } from "react";

// API Helper Imports
import { getAllMechanics, getAllServicers } from "./helpers/get";
import AuthPage from "./components/LoginPage.jsx";

function App() {
    const [mechanics, setMechanics] = useState([]);
    const [servicers, setServicers] = useState([]);
    const [update, setUpdate] = useState(0); // For re-fetching data
    const [error, setError] = useState("");

    // --- FIX 1: Authentication state is now based on 'userCredentials' ---
    // This is the single source of truth for whether the user is logged in.
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userCredentials'));

    useEffect(() => {
        const fetchData = async () => {
            setError(""); // Clear previous errors on a new fetch
            try {
                // Use Promise.all to fetch data in parallel for efficiency
                const [mechanicsData, servicersData] = await Promise.all([
                    getAllMechanics(),
                    getAllServicers()
                ]);
                setMechanics(mechanicsData);
                setServicers(servicersData);
            } catch (err) {
                // Set an error message if the API calls fail (e.g., 401 Unauthorized)
                setError("Failed to fetch data. Please check your connection or login status.");
                console.error(err);
            }
        };

        if (isLoggedIn) {
            fetchData();
        } else {
            // Clear all data when the user logs out
            setMechanics([]);
            setServicers([]);
        }
    }, [update, isLoggedIn]); // Re-run effect when update or isLoggedIn changes

    return (
        <div className="flex flex-col min-h-screen">
            <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <Routes>
                    {isLoggedIn ? (
                        // --- LOGGED IN Routes: User has access to protected content ---
                        <>
                            {/* Redirect root path to a default dashboard page */}
                            <Route path="/" element={<Navigate to="/mechanics" replace />} />

                            <Route
                                path="/mechanics"
                                element={<Mechanics mechanics={mechanics} setUpdate={setUpdate} />}
                            />
                            <Route
                                path="/servicers"
                                element={<Servicers servicers={servicers} setUpdate={setUpdate} />}
                            />
                            {/* If a logged-in user tries to visit login/register, redirect them away */}
                            <Route path="/login" element={<Navigate to="/" replace />} />
                            <Route path="/register" element={<Navigate to="/" replace />} />

                            {/* Catch-all for any other path */}
                            <Route path="*" element={<NotFound />} />
                        </>
                    ) : (
                        // --- LOGGED OUT Routes: User is restricted to authentication ---
                        <>
                            {/* --- FIX 2: Use the single AuthPage for all auth routes --- */}
                            <Route
                                path="/login"
                                element={<AuthPage setIsLoggedIn={setIsLoggedIn} />}
                            />

                            {/* If a logged-out user tries any other path, redirect to login */}
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </>
                    )}
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;