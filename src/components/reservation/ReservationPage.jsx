import { useNavigate } from "react-router-dom";
import ReservationSkeleton from "../skeleton/ReservationSkeleton.jsx"; 
import "./ReservationPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { engineerReservationThunk } from "../../store/thunks/engineerReservationThunk.js";
import dayjs from "dayjs";

const ReservationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { reservations, totalCount, isLasted, date, status } = useSelector(state => state.engineerReservation);

  // --------------------
  // Redirect Function
  // --------------------
  const goToDetail = (id) => navigate(`/reservation/${id}`);

  // --------------------
  // 스테이터스 한글로 변환 함수
  // --------------------
  const getKrStatus = (status) => {
    switch (status) {
      case 'CONFIRMED':return '예약됨';
      case 'START': return '작업진행중';
      case 'COMPLETED': return '작업종료';
      case 'CANCELED': return '작업취소';
      default: return '예약대기';
    }
  };

  async function getReservations() {
    try {
      const result = await dispatch(engineerReservationThunk());
      if(result.type.endsWith('/rejected')) {
        throw result;
      }
    } catch (error) {
      console.log(error);
      alert('시스템에러가 발생했습니다.\n잠시후 다시 시도해 주십시오.');
    }
  }

  useEffect(() => {
    getReservations();
  }, []);

  // --------------------
  // Skeleton 처리
  // --------------------
  if (status !== 'succeeded' && (!reservations || reservations.length === 0)) {
    return <ReservationSkeleton />;
  }

  // --------------------
  // 출력 처리
  // --------------------
  return (
    <div className="page-wrapper">
      <div className="reservation-container">
        <header className="list-header">
          <h2 className="date-title">{date}</h2>
          <span className="total-badge">오늘 총 {totalCount}건</span>
        </header>

        <div className="reservation-list">
          {reservations.map((item) => {
            return (
              <div 
                key={item.reservationId} 
                className={`reservation-card ${item.status === 'COMPLETED' ? 'card-finished' : ''}`} 
                onClick={() => goToDetail(item.reservationId)}
              >
                <div className="card-top">
                  <span className="time-badge">{`${dayjs(item.startAt).format('HH:mm')} ~ ${dayjs(item.endAt).format('HH:mm')}`}</span>
                  <div className={`status-indicator ${`status-${item.status.toLowerCase()}`}`}>
                    <span className="pulse-dot"></span>
                    <span>{getKrStatus(item.status)}</span>
                  </div>
                </div>

                {/* ID 영역 */}
                <div className="card-id-num">예약 ID : {item.reservationId}</div>

                <div className="card-body">
                  <h3 className="cust-name">
                    <span className="suffix">{`${item.managerName} 고객님`}</span>
                  </h3>
                  <p className="cust-address">{item.businessAddress}</p>
                  <div className="service-info">
                    <span className="type">{item.serviceType}</span>
                    <span className="divider">|</span>
                    <span className="name">{item.sizeType}</span>
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
          className={`pagination-btn ${isLasted ? "expired" : ""}`}
          disabled={isLasted}
          onClick={getReservations}
        >
          {isLasted ? "마지막 예약입니다" : "예약 더 보기"}
        </button>
      </div>
    </div>
  );
};

export default ReservationPage;