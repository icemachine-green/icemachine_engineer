import { useState } from "react";
import { formatKoreanFullDate } from "../../utils/dateUtils.js";
import "./ReservationPage.css";
import { useNavigate } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";

const ReservationPage = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const navigate = useNavigate();

  const handleMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  // ✅ id 기반 상세 페이지 이동
  const goToDetail = (id) => {
    navigate(`/reservation/detail/${id}`);
  };

  return (
    <div className="reservation-container">
      <p className="reservation-date">{formatKoreanFullDate()}</p>

      <div className="reservation-list">
        {reservationsDummy.slice(0, visibleCount).map((item) => (
          <div
            key={item.id}
            className="reservation-card"
            onClick={() => goToDetail(item.id)}
          >
            <div className="card-top">
              <span className="time-badge">{item.time}</span>

              {/* ✅ 작업 진행중일 때만 원형 뱃지 */}
              {item.status && (
                <span
                  className={`status-badge ${
                    item.status === "작업 진행중" ? "working" : ""
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="card-content">
              <p className="customer-name">
                {item.name} <span>고객님</span>
              </p>
              <p className="address">{item.address}</p>
              <p className="service">
                {item.type} | <strong>{item.service}</strong>
              </p>
            </div>

            {/* ✅ 버튼 클릭해도 동일하게 이동 */}
            <button
              className="detail-btn"
              type="button"
              onClick={() => goToDetail(item.id)}
            >
              예약 상세보기
            </button>
          </div>
        ))}
      </div>

      {visibleCount < reservationsDummy.length && (
        <button className="more-btn" onClick={handleMore}>
          더 보기
        </button>
      )}
    </div>
  );
};

export default ReservationPage;

