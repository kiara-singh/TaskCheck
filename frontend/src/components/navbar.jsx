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
    <nav className="w-full p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">My App</h1>
      <div className="flex gap-4 items-center">
      <button
          onClick={()=>navigate("/home")}
          title="Home"
          className="hover:text-gray-300"
        >
        <Home></Home>
          
        </button>
        <button
          onClick={() => navigate("/add")}
          className="hover:text-gray-300"
          title="Add Task"
        >
          <Plus />
        </button>
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
