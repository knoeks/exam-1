import { NavLink } from "react-router";
import bab from "../assets/bab.png";

function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-creamy-orange px-4 py-1 text-white">
      <div><img className="w-52" src={bab} alt="Book a Book logo" /></div>
      <div className="flex justify-end">
        <NavLink
          className="py-3 px-8 hover:bg-dark-orange rounded-lg transition-colors drop-shadow-md"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="py-3 px-8 hover:bg-dark-orange rounded-lg transition-colors drop-shadow-md"
          to="/register"
        >
          Register
        </NavLink>
        <NavLink
          className="py-3 px-8 hover:bg-dark-orange rounded-lg transition-colors drop-shadow-md"
          to="/about"
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
