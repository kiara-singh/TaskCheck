import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const user = sessionStorage.getItem("User");
            if (!user) {
                navigate("/");
            }
        };

        checkAuth();

        const interval = setInterval(() => {
            checkAuth();
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return children;
}
