import "./Component01.css";
import { useNavigate } from "react-router-dom";
import { formatKoreanShortDate } from "../../utils/dateUtils.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchEngineerDashboard } from "../../store/thunks/engineerDashboardThunk.js";

const Component01 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayFormatted = formatKoreanShortDate();
  const { user } = useSelector(state => state.auth);

  const { todayCount, monthCount } = useSelector((state) => state.engineerDashboard);

  useEffect(() => {
    dispatch(fetchEngineerDashboard());
  }, []);

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
            {user?.name ?? "알수없음"} <span className="role-text">기사님</span>
          </h1>
          <div className="profile-message-box">
            <p className="message-text">
              <span className="highlight-date">{todayFormatted}</span>입니다.
              <br />
              오늘 예약은{" "}<span className="highlight-count">{todayCount}건</span>{" "}입니다.
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