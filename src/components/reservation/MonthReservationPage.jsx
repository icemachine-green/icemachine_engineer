import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthReservationPage.css";

/* ===== 더미 데이터 그대로 유지 ===== */
const data = [
  { date: '2025-12-16', content: '예약' },
  { date: '2025-12-03', content: '예약' },
  { date: '2025-12-15', content: '예약' },
  { date: '2025-12-26', content: '예약' },
  { date: '2025-12-21', content: '휴무' },
  { date: '2026-01-16', content: '예약' },
  { date: '2026-01-05', content: '예약' },
  { date: '2026-01-15', content: '예약' },
  { date: '2026-01-15', content: '예약' },
  { date: '2026-01-26', content: '예약' },
  { date: '2026-01-21', content: '휴무' },
  { date: '2026-01-29', content: '예약' },
  { date: '2026-01-27', content: '예약' },
  { date: '2026-02-20', content: '예약' },
];

const MonthReservationPage = () => {
  // ✅ 초기 날짜를 2026년 1월 1일로 설정
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));

  /* ===== 이번 달 예약 건수 계산 함수 ===== */
  const getCurrentMonthReservationCount = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    let count = 0;

    data.forEach(item => {
      const [itemYear, itemMonth] = item.date.split("-").map(Number);
      if (itemYear === year && itemMonth === month && item.content === "예약") {
        count += 1;
      }
    });

    return count;
  };

  /* 날짜 포맷 YYYY-MM-DD */
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  /* 날짜 칸 커스텀 렌더링 */
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dateStr = formatDate(date);
    const dayData = data.filter(item => item.date === dateStr);

    if (dayData.length === 0) return null;

    const reservationCount = dayData.filter(item => item.content === "예약").length;
    const hasOffday = dayData.some(item => item.content === "휴무");

    return (
      <>
        {reservationCount > 0 && (
          <span className="reservation-btn">
            예약 {reservationCount}건
          </span>
        )}
        {hasOffday && (
          <span className="closed-btn">
            휴무
          </span>
        )}
      </>
    );
  };

  return (
    <>
      {/* ===== 상단 예약 건수 ===== */}
      <div className="month-top-title-container">
        <div className="month-top-title-box">
          <span className="text-normal">이번 달 </span>
          <span className="text-highlight">
            {getCurrentMonthReservationCount()}
          </span>
          <span className="text-normal">건 예약</span>
        </div>
      </div>

      {/* ===== 캘린더 ===== */}
      <div className="month-reservation-page">
        <div className="calendar-container">
          <Calendar
            locale="ko-KR"
            calendarType="gregory"
            value={null}  
            onActiveStartDateChange={({ activeStartDate }) =>
              setCurrentDate(activeStartDate)
            }
            tileContent={tileContent}
            formatDay={(locale, date) => date.getDate()}
            prev2Label={null}
            next2Label={null}
            view="month"              // 월 단위 화면 고정
            onClickMonth={() => {}}   // 월 클릭 무시
            onClickYear={() => {}}    // 연도 클릭 무시
          />
        </div>
      </div>

      {/* ===== 하단 컬러 안내 ===== */}
      <div className="calendar-color-view">
        <span className="label">
          예약 <span className="color-box reservation"></span>
        </span>
        <span className="label">
          휴무 <span className="color-box offday"></span>
        </span>
      </div>
    </>
  );
};

export default MonthReservationPage;





