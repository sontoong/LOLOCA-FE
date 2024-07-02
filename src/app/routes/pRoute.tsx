import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import ErrorPage from "../pages/public/404Page";
import { ROLE } from "../../constants/role";

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
  const token = localStorage.getItem("access_token");
  const isAuth = token ? true : false;
  const { Role } = useAppSelector((state) => state.auth.currentUser);
  // const user = localStorage.getItem('user');
  // const userObj = user ? JSON.parse(user) : {};
  // const isFirstLogin = userObj.user.isFirstLogin;

  // if (isFirstLogin && window.location.pathname !== '/account/change-password') {
  //   return <Navigate to='/account/change-password' />;
  // }

  if (inverted) {
    if (isAuth) {
      switch (Role) {
        case ROLE.customer:
          return <Navigate to="/cities" />;
        case ROLE.tourguide:
          return <Navigate to="/projects" />;
        default:
          return <Navigate to="/cities" />;
      }
    } else {
      return children;
    }
  }

  if (Role && !requiredRoles?.some((r) => Role === r)) {
    return <ErrorPage />;
  }

  return isAuth ? children : <ErrorPage />;
};

export default PrivateRoute;
