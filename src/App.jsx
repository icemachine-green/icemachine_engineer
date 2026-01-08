import './App.css';
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import TopButton from "./components/common/TopButton.jsx";
import { Outlet, useLocation } from "react-router-dom"; // useLocation 추가
import ScrollToTop from "./components/scrolltotop/ScrollToTop.jsx";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { reissueThunk } from './store/thunks/authThunk.js';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(reissueThunk());
  }, [dispatch]); // dispatch를 의존성 배열에 추가합니다.

  // 로그인 / 회원가입에서는 레이아웃 숨김
  const hideLayoutPaths = ["/login", "/signup"];
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
