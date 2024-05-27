import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const Header = () => {
  return (
    <header className="flex flex-row justify-between items-center bg-gradient-to-r from-blue-500 to-sky-500   min-w-full h-20 p-2  sticky top-0 z-50">
      <Link to="/">
        <p className="font-cinzeldec text-3xl text-slate-900">Rentify</p>
      </Link>

      <nav className=" flex flex-row justify-between items-center mx-2 text-xl gap-3 text-slate-300">
        <Link
          to="/"
          className="hover:text-slate-800    transition-all mx-4 font-bold"
        >
          Home
        </Link>
        <Link
          to="/login"
          className="hover:text-slate-800    transition-all mx-4 font-bold"
        >
          <FaUser />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
