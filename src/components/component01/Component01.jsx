import "./Component01.css";
import { useNavigate } from "react-router-dom";
import { formatKoreanShortDate } from "../../utils/dateUtils.js";
import { reservationsDummy } from "../../data/reservationsDummy.js"; 

const Component01 = () => {
  const navigate = useNavigate();
  const todayFormatted = formatKoreanShortDate();

  // ✅ [수정] 실제 오늘 날짜를 "YYYY-MM-DD" 형식의 문자열로 생성
  // 로컬 시간을 기준으로 날짜를 가져와서 0을 채워줍니다.
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`; // 결과 예: "2026-01-07"

  // 1. 오늘 날짜 기준 데이터 추출 (이제 자동으로 오늘 날짜 데이터를 찾습니다)
  const todayReservations = reservationsDummy.filter(
    (res) => res.date === todayStr
  );
  const todayCount = todayReservations.length;

  // 2. 이번 달 기준 데이터 추출 ("YYYY-MM" 형식으로 필터링)
  const currentMonthStr = `${year}-${month}`;
  const monthCount = reservationsDummy.filter((res) =>
    res.date.startsWith(currentMonthStr)
  ).length;

  return (
    <div className="component01-container">
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