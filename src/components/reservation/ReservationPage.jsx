import { useState } from "react";
import "./ReservationPage.css";

const reservations = [
  {
    id: 1,
    time: "10:00 ~ 12:00",
    name: "이지영",
    address: "대구시 동구 큰고개로 50",
    type: "대형",
    service: "DEEP_CLEAN",
    status: null,
  },
  {
    id: 2,
    time: "10:00 ~ 12:00",
    name: "이지영",
    address: "대구시 동구 큰고개로 50",
    type: "대형",
    service: "DEEP_CLEAN",
    status: null,
  },
  {
    id: 3,
    time: "14:00 ~ 17:00",
    name: "이지영",
    address: "대구시 동구 큰고개로 50",
    type: "대형",
    service: "DEEP_CLEAN",
    status: "작업 진행중",
  },
  {
    id: 4,
    time: "15:00 ~ 18:00",
    name: "김민수",
    address: "대구시 수성구 달구벌대로 200",
    type: "중형",
    service: "BASIC",
    status: null,
  },
  {
    id: 5,
    time: "18:00 ~ 20:00",
    name: "박서연",
    address: "대구시 북구 침산로 10",
    type: "소형",
    service: "DEEP_CLEAN",
    status: null,
  },
  {
    id: 6,
    time: "09:00 ~ 11:00",
    name: "최현우",
    address: "대구시 달서구 월배로 77",
    type: "대형",
    service: "BASIC",
    status: null,
  },
	 {
    id: 7,
    time: "15:00 ~ 18:00",
    name: "김민수",
    address: "대구시 수성구 달구벌대로 200",
    type: "중형",
    service: "BASIC",
    status: null,
  },
  {
    id: 8,
    time: "18:00 ~ 20:00",
    name: "박서연",
    address: "대구시 북구 침산로 10",
    type: "소형",
    service: "DEEP_CLEAN",
    status: null,
  },
  {
    id: 9,
    time: "09:00 ~ 11:00",
    name: "최현우",
    address: "대구시 달서구 월배로 77",
    type: "대형",
    service: "BASIC",
    status: null,
  },
]; /* 위에는 백엔드 연동을 대비한 더미데이터임 */

const ReservationPage = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div className="reservation-container">
      <p className="reservation-date">2025.12.22.(월)</p>

      <div className="reservation-list">
        {reservations.slice(0, visibleCount).map((item) => (
          <div key={item.id} className="reservation-card">
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

            <button className="detail-btn">예약 상세보기</button>
          </div>
        ))}
      </div>

      {visibleCount < reservations.length && (
        <button className="more-btn" onClick={handleMore}>
          더 보기
        </button>
      )}
    </div>
  );
};

export default ReservationPage;

