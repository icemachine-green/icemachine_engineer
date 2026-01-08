import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import ReservationSkeleton from "../skeleton/ReservationSkeleton.jsx"; 
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  const todayReservations = useMemo(() => {
    if (!reservationsDummy) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. 상태별 정렬 우선순위 정의
    const statusPriority = {
      "작업 진행중": 1,
      "예약됨": 2,
      "작업 종료": 3,
      "작업 취소": 4
    };

    return reservationsDummy
      .filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      })
      .map((item) => {
        // 상세 페이지에서 변경된 최신 상태(localStorage) 반영
        const savedData = localStorage.getItem(`reservation_${item.id}`);
        const parsed = savedData ? JSON.parse(savedData) : null;
        const currentStatus = parsed?.status || item.status || '예약됨';

        return { ...item, status: currentStatus };
      })
      .sort((a, b) => {
        // 2. [핵심] 우선순위에 따른 오름차순 정렬
        return (statusPriority[a.status] || 99) - (statusPriority[b.status] || 99);
      });
  }, []);

  if (!todayReservations || todayReservations.length === 0) {
    return <ReservationSkeleton />;
  }

  const visibleReservations = todayReservations.slice(0, visibleCount);
  const isExpired = visibleCount >= todayReservations.length;

  const goToDetail = (id) => navigate(`/reservation/detail/${id}`);

  const getStatusClass = (status) => {
    switch (status) {
      case '작업 종료': return 'status-finished';
      case '작업 취소': return 'status-cancelled';
      case '작업 진행중': return 'status-ongoing';
      case '예약됨': return 'status-reserved';
      default: return 'status-reserved';
    }
  };

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
          {visibleReservations.map((item) => {
            const statusClass = getStatusClass(item.status);
            return (
              <div 
                key={item.id} 
                className={`reservation-card ${statusClass === 'status-finished' ? 'card-finished' : ''}`} 
                onClick={() => goToDetail(item.id)}
              >
                <div className="card-top">
                  <span className="time-badge">{item.time}</span>
                  <div className={`status-indicator ${statusClass}`}>
                    <span className="pulse-dot"></span>
                    {item.status}
                  </div>
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
            );
          })}
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