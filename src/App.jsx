import './App.css';
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import TopButton from "./components/common/TopButton.jsx";
import { Outlet, useLocation } from "react-router-dom"; // useLocation 추가
import ScrollToTop from "./components/scrolltotop/ScrollToTop.jsx";

function App() {
  const location = useLocation();

  // 헤더와 푸터를 숨기고 싶은 경로를 배열에 넣습니다.
  const hideLayoutPaths = ["/login"];
  
  // 현재 경로가 배열에 포함되어 있는지 확인합니다.
  const isHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <>
      <ScrollToTop />

      {/* 로그인 페이지가 아닐 때만 Header 렌더링 */}
      {!isHideLayout && <Header />}
      
      <main>
        <Outlet />
      </main>

      {/* 로그인 페이지가 아닐 때만 Footer와 TopButton 렌더링 */}
      {!isHideLayout && <Footer />}
      {!isHideLayout && <TopButton />}
    </>
  );
}

export default App;
