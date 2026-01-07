import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import ReservationSkeleton from "../skeleton/ReservationSkeleton.jsx"; 
import "./ReservationPage.css";

const ReservationPage = () => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(3);

  // 1. 데이터 필터링 및 가공
  const todayReservations = useMemo(() => {
    // 만약 데이터 자체가 로드되지 않은 경우 null 혹은 빈 배열 반환 가능
    if (!reservationsDummy) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return reservationsDummy
      .filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        return itemDate.getTime() === today.getTime();
      })
      .map((item) => {
        const savedData = localStorage.getItem(`reservation_${item.id}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          return { ...item, status: parsed.status };
        }
        return item;
      });
  }, []);

  // 2. 스켈레톤 노출 조건 설정
  // 데이터가 로딩 중이거나 배열이 아예 정의되지 않았을 때를 대비합니다.
  if (!todayReservations || todayReservations.length === 0) {
    // 실제로는 데이터가 정말 0건인 경우와 구분하기 위해 
    // 데이터 패칭 라이브러리(React Query 등)의 isLoading 값을 쓰는 것이 가장 좋습니다.
    // 현재는 더미 데이터가 있으므로, 데이터가 없으면 스켈레톤을 보여주도록 처리합니다.
    return <ReservationSkeleton />;
  }

  const visibleReservations = todayReservations.slice(0, visibleCount);
  const isExpired = visibleCount >= todayReservations.length;

  const goToDetail = (id) => navigate(`/reservation/detail/${id}`);

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