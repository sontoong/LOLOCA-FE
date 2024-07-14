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
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage";
import CitiesPage from "../pages/public/CitiesPage";
import CityDetailPage from "../pages/public/CityDetailPage";
import ToursPage from "../pages/public/ToursPage";
import TourDetailPage from "../pages/public/TourDetailPage";
import GuidesPage from "../pages/public/TourGuidesPage";
import NotFoundPage from "../pages/public/404Page";
import TourBookingPage from "../pages/public/TourBookingPage";
import TourGuideBookingPage from "../pages/public/TourGuideBookingPage";
import TourGuideProfilePage from "../pages/public/TourGuideProfilePage";
import TourGuideRegister from "../pages/public/TourGuideRegister";

//customer page
import CustomerProfile from "../pages/customer/CustomerProfile";
import CustomerRequesList from "../pages/customer/CustomerRequesList";
import PaymentPage from "../pages/customer/PaymentPage";
import BookingSuccess from "../pages/customer/BookingSuccess";
import AddFundPage from "../pages/customer/AddFundPage";
import PaymentHistory from "../pages/customer/PaymentHistory";

//tour guide page
import CreateTourPage from "../pages/tour-guide/CreateTourPage";
import TourGuideProfile from "../pages/tour-guide/TourGuideProfile";
import GuideTourPage from "../pages/tour-guide/GuideTourPage";
import RequestListPage from "../pages/tour-guide/RequestListPage";
import TourGuideTourDetailPage from "../pages/tour-guide/TourGuideTourDetailPage";

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
        element: (
          <PrivateRoute inverted={true} children={<Navigate to="/cities" />} />
        ),
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
        path: "customer",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.customer]}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<></>}>
                <CustomerProfile />
              </Suspense>
            ),
          },
          {
            path: "add-fund",
            element: (
              <Suspense fallback={<></>}>
                <AddFundPage />
              </Suspense>
            ),
          },
          {
            path: "payment-history",
            element: (
              <Suspense fallback={<></>}>
                <PaymentHistory />
              </Suspense>
            ),
          },
          {
            path: "request",
            element: (
              <Suspense fallback={<></>}>
                <CustomerRequesList />
              </Suspense>
            ),
          },
          {
            path: "payment",
            element: (
              <Suspense fallback={<></>}>
                <PaymentPage />
              </Suspense>
            ),
          },
          {
            path: "booking-successful",
            element: (
              <Suspense fallback={<></>}>
                <BookingSuccess />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "guide",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.tourguide]}>
            <Outlet />
          </PrivateRoute>
        ),
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<></>}>
                <TourGuideProfile />
              </Suspense>
            ),
          },
          {
            path: "tour/create",
            element: (
              <Suspense fallback={<></>}>
                <CreateTourPage />
              </Suspense>
            ),
          },
          {
            path: "tour/edit/:tourId",
            element: (
              <Suspense fallback={<></>}>
                <CreateTourPage />
              </Suspense>
            ),
          },
          {
            path: "tours",
            element: (
              <Suspense fallback={<></>}>
                <GuideTourPage />
              </Suspense>
            ),
          },
          {
            path: "tours/:tourId",
            element: (
              <Suspense fallback={<></>}>
                <TourGuideTourDetailPage />
              </Suspense>
            ),
          },
          {
            path: "request-list",
            element: (
              <Suspense fallback={<></>}>
                <RequestListPage />
              </Suspense>
            ),
          },
        ],
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
  {
    path: "/forgot-password",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <ForgotPasswordPage />
        </PrivateRoute>
      </Suspense>
    ),
  },
  {
    path: "/register/tourguide",
    element: (
      <Suspense fallback={<></>}>
        <PrivateRoute inverted={true}>
          <TourGuideRegister />
        </PrivateRoute>
      </Suspense>
    ),
  },
]);
