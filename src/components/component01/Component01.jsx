import "./Component01.css";
import { useNavigate } from "react-router-dom";
import { formatKoreanShortDate } from "../../utils/dateUtils.js";
// 더미 데이터 임포트 (경로가 reservationsDummy.js 파일 위치에 맞는지 확인해주세요)
import { reservationsDummy } from "../../data/reservationsDummy.js"; 

const Component01 = () => {
  const navigate = useNavigate();
  const todayFormatted = formatKoreanShortDate();

  // 1. 오늘 날짜 기준 데이터 추출 (2026-01-06)
  const todayStr = "2026-01-06";
  const todayReservations = reservationsDummy.filter(
    (res) => res.date === todayStr
  );
  const todayCount = todayReservations.length;

  // 2. 이번 달 기준 데이터 추출 (2026-01)
  const currentMonthStr = "2026-01";
  const monthCount = reservationsDummy.filter((res) =>
    res.date.startsWith(currentMonthStr)
  ).length;

  return (
    <div className="component01-container">
      {/* 상단 프로필 영역 */}
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
              <span className="highlight-date">{todayFormatted}</span>입니다.
              <br />
              오늘 예약은 <span className="highlight-count">{todayCount}건</span> 입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 예약 요약 카드 */}
      <section className="summary-grid">
        <div
          className="summary-card"
          onClick={() => navigate("/reservation")}
        >
          <div className="card-content">
            <p className="card-label">오늘 예약</p>
            <p className="card-value">
              {todayCount}<span className="unit">건</span>
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
              {monthCount}<span className="unit">건</span>
            </p>
          </div>
          <div className="card-arrow">→</div>
        </div>
      </section>
    </div>
  );
};

export default Component01;