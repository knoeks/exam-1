import { NavLink, useNavigate } from "react-router-dom";
import bab from "../assets/bab.png";

// --- FIX 2: Accept isLoggedIn and setIsLoggedIn as props ---
function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // 1. Remove the user's credentials from storage
        localStorage.removeItem('userCredentials');

        // 2. Update the application's state to reflect logout
        setIsLoggedIn(false);

        // 3. Redirect the user to the login page
        navigate('/login');
    };

    // --- FIX 3: Define styles for NavLink active state ---
    const linkClass = "py-3 px-8 rounded-lg transition-colors drop-shadow-md";
    const activeLinkClass = "bg-dark-orange font-bold"; // Your style for the active link

    return (
        <nav className="flex justify-between items-center bg-creamy-orange px-4 py-1 text-white">
            {/* Logo is always visible */}
            <div><img className="w-52" src={bab} alt="App logo" /></div>

            {/* --- FIX 4: Conditionally render links based on login state --- */}
            <div className="flex justify-end items-center">
                {isLoggedIn ? (
                    // --- Links for LOGGED IN users ---
                    <>
                        <NavLink
                            className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}
                            to="/mechanics"
                        >
                            Mechanics
                        </NavLink>
                        <NavLink
                            // The path is now correct
                            className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}
                            to="/servicers"
                        >
                            Services
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="py-3 px-8 bg-red-500 hover:bg-red-600 rounded-lg transition-colors drop-shadow-md ml-4"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    // --- Links for LOGGED OUT users ---
                    <NavLink
                        className={({ isActive }) => isActive ? `${linkClass} ${activeLinkClass}` : linkClass}
                        to="/login"
                    >
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
}

export default NavBar;