import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App.jsx";
import MainPage from "../components/main/MainPage.jsx";
import ReservationPage from "../components/reservation/ReservationPage.jsx";

const router = createBrowserRouter([
	{
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },  
      {
        path: "/reservation",
        element: <ReservationPage />,
      },    
      // 앞으로 다른 페이지가 추가되면 이 배열에 추가합니다.
      // 예: { path: '/login', element: <LoginPage /> }
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;