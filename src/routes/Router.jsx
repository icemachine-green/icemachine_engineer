import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import MainPage from "../components/main/MainPage.jsx";
import ReservationPage from "../components/reservation/ReservationPage.jsx";
import MonthReservationPage from "../components/reservation/MonthReservationPage.jsx";
import ReservationDetailPage from "../components/reservation/ReservationDetailPage.jsx";
import MyPage from "../components/mypage/MyPage.jsx";
import LoginPage from "../components/login/LoginPage.jsx";
import Social from "../components/login/Social.jsx";

const router = createBrowserRouter([
  {
    path: '/callback/social',
    element: <Social />
  },
  {
    element: <App />,
    children: [
      { path: "/", element: <MainPage /> }, 
      { path: "/reservation", element: <ReservationPage /> },
      { path: "/monthreservation", element: <MonthReservationPage /> },
      { path: "/reservation/detail/:id", element: <ReservationDetailPage /> },
      { path: "/mypage", element: <MyPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;