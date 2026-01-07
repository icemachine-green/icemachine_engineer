import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthReservationPage.css";
import { reservationsDummy } from "../../data/reservationsDummy.js";

const MonthReservationPage = () => {
  const navigate = useNavigate();


  // 실제 오늘 날짜 정보 생성 (2026-01-07 기준 동적 처리)
  const now = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(now.getFullYear(), now.getMonth(), 1));

  // 날짜 포맷 함수 (YYYY-MM-DD)
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const todayStr = formatDate(now);

  // 1. 조회 제한 범위 계산 (현재 월 전후 2개월)
  const minDate = new Date(now.getFullYear(), now.getMonth() - 2, 1);
  const maxLimitDate = new Date(now.getFullYear(), now.getMonth() + 3, 0);

  // 현재 월의 총 예약 건수 계산
  const getCurrentMonthReservationCount = () => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const yearMonth = `${year}-${month}`;
    return reservationsDummy.filter((item) => item.date.startsWith(yearMonth)).length;
  };

  // 특정 날짜 클릭 핸들러: 오늘인 경우에만 이동 로직 작동
  const handleDayClick = (date) => {
    const dateStr = formatDate(date);
    const dayReservations = reservationsDummy.filter((item) => item.date === dateStr);

    if (dateStr === todayStr && dayReservations.length > 0) {
      navigate("/reservation");
    }
  };

  // 타일 클래스 제어: 오늘이면서 예약이 있는 날만 클릭 가능한 스타일 부여
  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      if (dateStr === todayStr && reservationsDummy.some((res) => res.date === dateStr)) {
        return "can-click-tile";
      }
    }
    return "default-tile";
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateStr = formatDate(date);
    const dayReservations = reservationsDummy.filter((item) => item.date === dateStr);
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
            onClickDay={handleDayClick}
            tileContent={tileContent}
            tileClassName={getTileClassName}
            formatDay={(locale, date) => date.getDate()}
            
            prevLabel={currentDate <= minDate ? null : "‹"}
            nextLabel={currentDate >= new Date(now.getFullYear(), now.getMonth() + 2, 1) ? null : "›"}
            prev2Label={null}
            next2Label={null}

            view="month"
            onViewChange={() => {}} 
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




