import "./Component01.css";
import { useNavigate } from "react-router-dom";
import { formatKoreanShortDate } from "../../utils/dateUtils.js";

const Component01 = () => {
  const navigate = useNavigate();
  const todayFormatted = formatKoreanShortDate();

  return (
    <div className="component01-container">
      {/* 상단 프로필 영역: 전체 클릭 가능하도록 UX 개선 */}
      <section className="profile-section" onClick={() => navigate("/mypage")}>
        <div className="profile-image-wrapper">
          <img
            src="/icons/profile.png"
            alt="기사 프로필"
            className="profile-image-placeholder"
          />
        </div>

        <div className="profile-info">
          <h1 className="profile-name">
            홍길동 <span className="role-text">기사님</span>
          </h1>
          <div className="profile-message-box">
            <p className="message-text">
              <span className="highlight-date">{todayFormatted}</span>입니다.<br />
              오늘 예약은 <span className="highlight-count">2건</span> 입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 예약 요약 카드: 그리드 레이아웃 */}
      <section className="summary-grid">
        <div
          className="summary-card"
          onClick={() => navigate("/reservation")}
        >
          <div className="card-content">
            <p className="card-label">오늘 예약</p>
            <p className="card-value">
              2<span className="unit">건</span>
            </p>
          </div>
          <div className="card-arrow">→</div>
        </div>

        <div
          className="summary-card"
          onClick={() => navigate("/monthreservation")}
        >
          <div className="card-content">
            <p className="card-label">이번 달 예약</p>
            <p className="card-value">
              31<span className="unit">건</span>
            </p>
          </div>
          <div className="card-arrow">→</div>
        </div>
      </section>
    </div>
  );
};

export default Component01;