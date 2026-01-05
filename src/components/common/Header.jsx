import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      {/* 메인 페이지 */}
      <span
        className="header-item header-main"
        onClick={() => navigate("/")}
      >
        메인 페이지
      </span>

      {/* 구분선 */}
      <span className="header-separator">|</span>

      {/* 예약 페이지 */}
      <span
        className="header-item header-reservation"
        onClick={() => navigate("/reservation")}
      >
        예약 페이지
      </span>
    </header>
  );
}
