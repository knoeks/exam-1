import { NavLink } from "react-router";
import bab from "../assets/bab.png";

function Footer() {
  return (
    <footer className="flex fixed bottom-0 left-0 w-full justify-center items-end bg-creamy-orange px-4 py-1 text-white">
      <div className="flex">
        <p className="text-[#3c2a32] text-xl">&copy; Povilas Gegužis</p>
      </div>
    </footer>
  );
}

export default Footer;