// components/Navbar.jsx
import { Plus, LogOut, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("User");
    navigate("/");
  }

  return (
    <nav className="w-full p-4 bg-purple-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">TaskCheck</h1>
      <div className="flex gap-4 items-center">
        <button
          onClick={handleLogout}
          className="hover:text-gray-300"
          title="Logout"
        >
          <LogOut />
        </button>
      </div>
    </nav>
  );
}
