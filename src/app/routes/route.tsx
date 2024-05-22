import { Suspense } from "react";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import { ROLE } from "../../constants/role";

import PrivateRoute from "./pRoute";
import PublicLayout from "../layout/public-layout";

//public
import LoginPage from "../pages/public/LoginPage";
import SignupPage from "../pages/public/SignupPage";
import HomePage from "../pages/public/HomePage";
import ErrorPage from "../pages/public/404Page";

//other page
import TestPage from "../pages/TestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<></>}>
        <PublicLayout>
          <Outlet />
        </PublicLayout>
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={true}>
              <HomePage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "home",
        element: <Navigate to={"/"} />,
      },
      {
        path: "test",
        element: (
          <Suspense fallback={<></>}>
            <TestPage />
          </Suspense>
        ),
      },
      {
        path: "template",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.customer]}>
              <TestPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "*",
        element: (
          <Suspense fallback={<></>}>
            <ErrorPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <LoginPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <SignupPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
]);
