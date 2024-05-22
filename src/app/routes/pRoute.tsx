import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
// import Forbidden from "../pages/ForbiddenPage";
import ErrorPage from "../pages/public/404Page";

interface PrivateRouteProps {
  inverted: boolean;
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute = ({
  inverted,
  children,
  requiredRoles,
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const isAuth = token ? true : false;
  const { role } = useAppSelector((state) => state.user.currentUser);
  // const user = localStorage.getItem('user');
  // const userObj = user ? JSON.parse(user) : {};
  // const isFirstLogin = userObj.user.isFirstLogin;

  // if (isFirstLogin && window.location.pathname !== '/account/change-password') {
  //   return <Navigate to='/account/change-password' />;
  // }

  if (inverted) {
    if (isAuth) {
      switch (role) {
        case "enterprise":
          return <Navigate to="/ed/projects" />;
        case "candidate":
          return <Navigate to="/projects" />;
        default:
          return <Navigate to="/" />;
      }
    } else {
      return children;
    }
  }

  if (role && !requiredRoles?.some((r) => role === r)) return <ErrorPage />;

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
