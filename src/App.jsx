import './App.css';
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import TopButton from "./components/common/TopButton.jsx";
import { Outlet, useLocation } from "react-router-dom"; // useLocation 추가
import ScrollToTop from "./components/scrolltotop/ScrollToTop.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { reissueThunk } from './store/thunks/authThunk.js';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  // isInitializing 상태를 사용하여 초기 인증 과정을 추적합니다.
  const { isInitializing, isLoggedIn } = useSelector((state) => state.auth);

  // 헤더와 푸터를 숨기고 싶은 경로를 배열에 넣습니다.
  const hideLayoutPaths = ["/login"];  
  // 현재 경로가 배열에 포함되어 있는지 확인합니다.
  const isHideLayout = hideLayoutPaths.includes(location.pathname);

  useEffect(() => {
    // engineer 앱 진입 시 무조건 토큰 재발급 시도
    if(!isLoggedIn) {
      dispatch(reissueThunk());
    }
  }, [dispatch]); // dispatch를 의존성 배열에 추가합니다.

  // 초기 인증 과정이 진행 중이면 로딩 화면을 보여줍니다.
  if (isInitializing) {
    return <div>로딩 중...</div>;
  }

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
