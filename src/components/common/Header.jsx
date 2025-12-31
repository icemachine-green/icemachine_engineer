import "./Header.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="header-container">
      <span
        className="header-contaier-main"
        onClick={() => navigate("/")}
      >
        메인 페이지
      </span>

      <span className="header-contaier-line">|</span>

      <span
        className="header-contaier-reservation"
        onClick={() => navigate("/reservation")}
      >
        예약 페이지
      </span>
    </header>
  );
}