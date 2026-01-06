import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthReservationPage.css";
import { reservationsDummy } from "../../data/reservationsDummy.js";

const MonthReservationPage = () => {
  // 기준 날짜 설정 (2026-01-06)
  const today = new Date(2026, 0, 6); 
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  // 1. 조회 제한 범위 계산 (기준 월 전후 2개월, 총 5개월)
  // 11월 1일 ~ 3월 말일까지로 고정
  const minDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const maxLimitDate = new Date(today.getFullYear(), today.getMonth() + 3, 0); // 3월 말일

  const getCurrentMonthReservationCount = () => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const yearMonth = `${year}-${month}`;
    return reservationsDummy.filter(item => item.date.startsWith(yearMonth)).length;
  };

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateStr = formatDate(date);
    const dayReservations = reservationsDummy.filter(item => item.date === dateStr);
    const reservationCount = dayReservations.length;

    return (
      <div className="tile-badge-container">
        {reservationCount > 0 && (
          <span className="badge-reservation">예약 {reservationCount}건</span>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-page-wrapper">
      <header className="month-summary-header">
        <div className="summary-box">
          <span className="label">{currentDate.getMonth() + 1}월</span>
          <span className="count-highlight">{getCurrentMonthReservationCount()}</span>
          <span className="label">건의 예약이 있습니다</span>
        </div>
      </header>

      <main className="calendar-main-section">
        <div className="calendar-card">
          <Calendar
            locale="ko-KR"
            calendarType="gregory"
            value={null}
            onActiveStartDateChange={({ activeStartDate }) => setCurrentDate(activeStartDate)}
            tileContent={tileContent}
            formatDay={(locale, date) => date.getDate()}
            
            // 2. 화살표 제어 (정확히 5개월 범위 안에서만 존재)
            prevLabel={currentDate <= minDate ? null : "‹"}
            nextLabel={currentDate >= new Date(today.getFullYear(), today.getMonth() + 2, 1) ? null : "›"}
            prev2Label={null}
            next2Label={null}

            // 3. 중앙 라벨 클릭 무력화 (이동 방지 핵심)
            view="month"
            onViewChange={() => {}} // 뷰 변경 시도 자체를 무시
            navigationLabel={({ label }) => (
              <span className="nav-label-custom">{label}</span>
            )}
            
            minDate={minDate}
            maxDate={maxLimitDate}
          />
          
          <footer className="calendar-legend">
            <div className="legend-item">
              <span className="dot reservation"></span>
              <span>예약 있음</span>
            </div>
            <div className="legend-item">
              <span className="dot offday"></span>
              <span>정기 휴무</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MonthReservationPage;




