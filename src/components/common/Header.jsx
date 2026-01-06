import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 현재 경로에 따라 활성화 스타일을 주기 위한 함수
  const isActive = (path) => location.pathname === path;

  return (
    <header className="header-container">
      <div className="header-inner">
        {/* 메인 페이지 */}
        <span
          className={`header-item ${isActive("/") ? "active" : ""}`}
          onClick={() => navigate("/")}
        >
          메인
        </span>

        {/* 구분선 */}
        <span className="header-separator"></span>

        {/* 예약 페이지 */}
        <span
          className={`header-item ${isActive("/reservation") ? "active" : ""}`}
          onClick={() => navigate("/reservation")}
        >
          예약 내역
        </span>

        {/* 마이페이지 (추가된 경우를 대비) */}
        <span className="header-separator"></span>
        <span
          className={`header-item ${isActive("/mypage") ? "active" : ""}`}
          onClick={() => navigate("/mypage")}
        >
          MY
        </span>
      </div>
    </header>
  );
}