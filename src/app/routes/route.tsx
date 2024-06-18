import { Suspense } from "react";
import {
  Navigate,
  Outlet,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { ROLE } from "../../constants/role";

import PrivateRoute from "./pRoute";
import PublicLayout from "../layout/public-layout";

//public
import LoginPage from "../pages/public/LoginPage";
import RegisterPage from "../pages/public/RegisterPage";
import CitiesPage from "../pages/public/CitiesPage";
import CityDetailPage from "../pages/public/CityDetailPage";
import ToursPage from "../pages/public/ToursPage";
import TourDetailPage from "../pages/public/TourDetailPage";
import GuidesPage from "../pages/public/GuidesPage";
import NotFoundPage from "../pages/public/404Page";

//other page
import ErrorPage from "../pages/public/ErrorPage";
import TestPage from "../pages/TestPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<></>}>
        <PublicLayout>
          <Outlet />
        </PublicLayout>
        <ScrollRestoration />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <Navigate to={"/cities"} />,
      },
      {
        path: "cities",
        element: (
          <Suspense fallback={<></>}>
            <CitiesPage />
          </Suspense>
        ),
      },
      {
        path: "cities/:cityId",
        element: (
          <Suspense fallback={<></>}>
            <CityDetailPage />
          </Suspense>
        ),
      },
      {
        path: "tours",
        element: (
          <Suspense fallback={<></>}>
            <ToursPage />
          </Suspense>
        ),
      },
      {
        path: "tours/:tourId",
        element: (
          <Suspense fallback={<></>}>
            <TourDetailPage />
          </Suspense>
        ),
      },
      {
        path: "guides",
        element: (
          <Suspense fallback={<></>}>
            <GuidesPage />
          </Suspense>
        ),
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
        path: "error",
        element: (
          <Suspense fallback={<></>}>
            <ErrorPage />
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
            <NotFoundPage />
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
          <RegisterPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
]);
