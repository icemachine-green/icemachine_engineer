import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const goToDetail = (id) => navigate(`/reservation/detail/${id}`);

  // 상세 페이지의 변경 사항을 반영하여 목록 생성
  const todayReservations = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservationsDummy
      .filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      })
      .map((item) => {
        // localStorage에 저장된 최신 상태가 있다면 목록에 반영
        const savedData = localStorage.getItem(`reservation_${item.id}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          return { ...item, status: parsed.status };
        }
        return item;
      });
  }, []);

  const visibleReservations = todayReservations.slice(0, visibleCount);
  const isExpired = visibleCount >= todayReservations.length;

  return (
    <div className="page-wrapper">
      <div className="reservation-container">
        <header className="list-header">
          <h2 className="date-title">
            {new Date().toISOString().slice(0, 10)}
          </h2>
          <span className="total-badge">오늘 총 {todayReservations.length}건</span>
        </header>

        <div className="reservation-list">
          {visibleReservations.map((item) => (
            <div key={item.id} className="reservation-card" onClick={() => goToDetail(item.id)}>
              <div className="card-top">
                <span className="time-badge">{item.time}</span>
                {item.status && (
                  <div className={`status-indicator ${item.status === '작업 종료' ? 'finished' : ''}`}>
                    <span className="pulse-dot"></span>
                    {item.status}
                  </div>
                )}
              </div>

              <div className="card-body">
                <h3 className="cust-name">
                  {item.name} <span className="suffix">고객님</span>
                </h3>
                <p className="cust-address">{item.address}</p>
                <div className="service-info">
                  <span className="type">{item.type}</span>
                  <span className="divider">|</span>
                  <span className="name">{item.service}</span>
                </div>
              </div>

              <button className="detail-link-btn">
                상세보기
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          className={`pagination-btn ${isExpired ? "expired" : ""}`}
          disabled={isExpired}
          onClick={() => !isExpired && setVisibleCount((prev) => prev + 3)}
        >
          {isExpired ? "마지막 예약입니다" : "예약 더 보기"}
        </button>
      </div>
    </div>
  );
};

export default ReservationPage;