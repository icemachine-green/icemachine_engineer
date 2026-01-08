import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import MainPage from "../components/main/MainPage.jsx";
import ReservationPage from "../components/reservation/ReservationPage.jsx";
import MonthReservationPage from "../components/reservation/MonthReservationPage.jsx";
import ReservationDetailPage from "../components/reservation/ReservationDetailPage.jsx";
import MyPage from "../components/mypage/MyPage.jsx";
import LoginPage from "../components/login/LoginPage.jsx";
import Social from "../components/login/Social.jsx";
import SignUpPage from "../components/signup/SignUpPage.jsx";

const router = createBrowserRouter([
  // 공개 라우트 (로그인 전)
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: '/signup',
    element: <SignUpPage />
  },
  {
    path: '/callback/social',
    element: <Social />
  },

  // 보호 라우트 (로그인 필수)
  {
    // element: <ProtectedRoute />,
    element: <App />,
    children: [
      {
        // element: <App />,
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <MainPage /> }, 
          { path: "/reservation", element: <ReservationPage /> },
          { path: "/monthreservation", element: <MonthReservationPage /> },
          { path: "/reservation/detail/:id", element: <ReservationDetailPage /> },
          { path: "/mypage", element: <MyPage /> },
        ],
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;