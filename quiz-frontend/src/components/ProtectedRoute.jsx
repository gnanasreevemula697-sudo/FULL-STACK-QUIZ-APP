import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isAdminAuthenticated =
    typeof window !== "undefined" &&
    localStorage.getItem("quizAdminAuth") === "true";

  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
}

export default ProtectedRoute;
