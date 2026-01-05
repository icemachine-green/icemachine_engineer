import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const goToDetail = (id) => {
    navigate(`/reservation/detail/${id}`);
  };

  /* =========================
     오늘 예약만 필터링
  ========================= */
  const todayReservations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservationsDummy.filter((item) => {
      const itemDate = new Date(item.date);
      itemDate.setHours(0, 0, 0, 0);

      return itemDate.getTime() === today.getTime();
    });
  }, []);

  /* =========================
     화면에 보여줄 카드
  ========================= */
  const visibleReservations = todayReservations.slice(0, visibleCount);
  const isExpired = visibleCount >= todayReservations.length;

  return (
    <div className="reservation-container">
      {/* 오늘 날짜 그룹 */}
      <div className="date-group">
        <p className="date-title">
          {new Date().toISOString().slice(0, 10)}
        </p>

        <div className="reservation-list">
          {visibleReservations.map((item) => (
            <div
              key={item.id}
              className="reservation-card"
              onClick={() => goToDetail(item.id)}
            >
              <div className="card-top">
                <span className="time-badge">{item.time}</span>

                {item.status && (
                  <span className="status-badge">{item.status}</span>
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

              <button
                type="button"
                className="detail-btn"
                onClick={() => goToDetail(item.id)}
              >
                예약 상세보기
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* =========================
         더 보기 / 완료 버튼
      ========================= */}
      <button
        className={`more-btn ${isExpired ? "expired" : ""}`}
        disabled={isExpired}
        onClick={() => {
          if (!isExpired) {
            setVisibleCount((prev) => prev + 3);
          }
        }}
      >
        {isExpired
          ? "모든 예약을 확인했습니다"
          : "더 보기"}
      </button>
    </div>
  );
};

export default ReservationPage;



