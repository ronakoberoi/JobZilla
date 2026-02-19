import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const RoleProtectedRoute = ({ children, allow }: any) => {
  const user = useSelector((state: any) => state.user);

  // not logged in
  if (!user) return <Navigate to="/login" />;
  // role not allowed
  if (!allow.includes(user.accountType)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-2xl font-semibold">
        You are not allowed to access this page
      </div>
    );
  }

  return children;
};

export default RoleProtectedRoute;
