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
import GuidesPage from "../pages/public/TourGuidesPage";
import NotFoundPage from "../pages/public/404Page";
import TourBookingPage from "../pages/public/TourBookingPage";
import TourGuideBookingPage from "../pages/public/TourGuideBookingPage";
import TourGuideProfilePage from "../pages/public/TourGuideProfilePage";

//other page
import ErrorPage from "../pages/public/ErrorPage";
import TestPage from "../pages/TestPage";
import CustomerProfile from "../pages/customer/CustomerProfile";
import CustomerRequesList from "../pages/customer/CustomerRequesList";
import PaymentPage from "../pages/customer/PaymentPage";
import BookingSuccess from "../pages/customer/BookingSuccess";
import CreateTourPage from "../pages/tour-guide/CreateTourPage";
import TourGuideProfile from "../pages/tour-guide/TourGuideProfile";
import GuideTourPage from "../pages/tour-guide/GuideTourPage";
import RequestListPage from "../pages/tour-guide/RequestListPage";

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
        path: "tours/:tourId/booking",
        element: (
          <Suspense fallback={<></>}>
            <TourBookingPage />
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
        path: "guides/:tourGuideId",
        element: (
          <Suspense fallback={<></>}>
            <TourGuideProfilePage />
          </Suspense>
        ),
      },
      {
        path: "guides/:tourGuideId/booking",
        element: (
          <Suspense fallback={<></>}>
            <TourGuideBookingPage />
          </Suspense>
        ),
      },
      {
        path: "guides/profile",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.tourguide]}>
              <TourGuideProfile />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "guides/tour/create",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.tourguide]}>
              <CreateTourPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "guides/tour",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.tourguide]}>
              <GuideTourPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "guides/request-list",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.tourguide]}>
              <RequestListPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "customer/profile",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.customer]}>
              <CustomerProfile />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "customer/request",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.customer]}>
              <CustomerRequesList />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "customer/payment/:requestId",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.customer]}>
              <PaymentPage />
            </PrivateRoute>
          </Suspense>
        ),
      },
      {
        path: "customer/booking-successful",
        element: (
          <Suspense fallback={<></>}>
            <PrivateRoute inverted={false} requiredRoles={[ROLE.customer]}>
              <BookingSuccess />
            </PrivateRoute>
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
        path: "test",
        element: (
          <Suspense fallback={<></>}>
            <TestPage />
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
