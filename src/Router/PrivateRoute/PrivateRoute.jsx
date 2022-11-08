import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import Spinner from "../../Pages/Shared/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  const location = useLocation();

  // const from = location?.state?.from?.pathname || '/';

  if (loading) return <Spinner />;

  if (!user)
    return <Navigate to="/sign-up" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
