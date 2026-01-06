import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthReservationPage.css";

const data = [
  { date: '2025-12-16', content: '예약' },
  { date: '2025-12-03', content: '예약' },
  { date: '2025-12-15', content: '예약' },
  { date: '2025-12-26', content: '예약' },
  { date: '2025-12-21', content: '휴무' },
  { date: '2026-01-16', content: '예약' },
  { date: '2026-01-06', content: '예약' },
  { date: '2026-01-15', content: '예약' },
  { date: '2026-01-15', content: '예약' },
  { date: '2026-01-26', content: '예약' },
  { date: '2026-01-21', content: '휴무' },
  { date: '2026-01-29', content: '예약' },
  { date: '2026-01-27', content: '예약' },
  { date: '2026-02-20', content: '예약' },
];

const MonthReservationPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  const getCurrentMonthReservationCount = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    return data.filter(item => {
      const [itemYear, itemMonth] = item.date.split("-").map(Number);
      return itemYear === year && itemMonth === month && item.content === "예약";
    }).length;
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
    const dayData = data.filter(item => item.date === dateStr);
    if (dayData.length === 0) return null;

    const reservationCount = dayData.filter(item => item.content === "예약").length;
    const hasOffday = dayData.some(item => item.content === "휴무");

    return (
      <div className="tile-badge-container">
        {reservationCount > 0 && (
          <span className="badge-reservation">예약 {reservationCount} 건</span>
        )}
        {hasOffday && (
          <span className="badge-offday">휴무</span>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-page-wrapper">
      {/* 상단 요약 섹션 */}
      <header className="month-summary-header">
        <div className="summary-box">
          <span className="label">이번 달</span>
          <span className="count-highlight">{getCurrentMonthReservationCount()}</span>
          <span className="label">건의 예약이 있습니다</span>
        </div>
      </header>

      {/* 메인 캘린더 영역 */}
      <main className="calendar-main-section">
        <div className="calendar-card">
          <Calendar
            locale="ko-KR"
            calendarType="gregory"
            value={null}
            onActiveStartDateChange={({ activeStartDate }) => setCurrentDate(activeStartDate)}
            tileContent={tileContent}
            formatDay={(locale, date) => date.getDate()}
            prev2Label={null}
            next2Label={null}
            view="month"
          />
          
          {/* 하단 범례 안내 */}
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





