import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthReservationPage.css";
import { reservationsDummy } from "../../data/reservationsDummy.js";

const MonthReservationPage = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 기준 날짜 설정 (2026-01-06)
  const today = new Date(2026, 0, 6); 
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  // 1. 조회 제한 범위 계산 (기준 월 전후 2개월, 총 5개월)
  const minDate = new Date(today.getFullYear(), today.getMonth() - 2, 1);
  const maxLimitDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);

  // 날짜 포맷 함수 (YYYY-MM-DD)
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // 현재 월의 총 예약 건수 계산
  const getCurrentMonthReservationCount = () => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const yearMonth = `${year}-${month}`;
    return reservationsDummy.filter(item => item.date.startsWith(yearMonth)).length;
  };

  // 특정 날짜 클릭 핸들러
  const handleDayClick = (date) => {
    const dateStr = formatDate(date);
    const dayReservations = reservationsDummy.filter(item => item.date === dateStr);

    // 예약 건수가 0보다 크면 /reservation 페이지로 이동
    if (dayReservations.length > 0) {
      navigate("/reservation");
      // 만약 특정 날짜의 데이터를 넘겨주고 싶다면 아래처럼 사용 가능
      // navigate("/reservation", { state: { selectedDate: dateStr } });
    }
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
            onClickDay={handleDayClick} // 날짜 클릭 시 이동 로직 추가
            tileContent={tileContent}
            formatDay={(locale, date) => date.getDate()}
            
            // 화살표 제어
            prevLabel={currentDate <= minDate ? null : "‹"}
            nextLabel={currentDate >= new Date(today.getFullYear(), today.getMonth() + 2, 1) ? null : "›"}
            prev2Label={null}
            next2Label={null}

            // 중앙 라벨 클릭 무력화 및 뷰 고정
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




