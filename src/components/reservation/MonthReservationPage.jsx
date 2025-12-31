import React, { useState, useEffect, useRef } from "react";
import "./MonthReservationPage.css";

const data = [
  { date: '2025-12-16', content: '예약' },
  { date: '2025-12-03', content: '예약' },
  { date: '2025-12-15', content: '예약' },
  { date: '2025-12-26', content: '예약' },
  { date: '2025-12-21', content: '휴무' },
];

const MonthReservationPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarList, setCalendarList] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    // 데이터 가공
    const tempList = {};
    data.forEach(item => {
      if (!tempList[item.date]) tempList[item.date] = [];
      tempList[item.date].push(item.content);
    });
    setCalendarList(tempList);
  }, []);
  

  const pad = (num) => (num > 9 ? num : '0' + num);

  const renderDates = () => {
    const viewYear = currentDate.getFullYear();
    const viewMonth = currentDate.getMonth();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();
    const lastDay = new Date(viewYear, viewMonth + 1, 0).getDate();
    const limitDay = firstDay + lastDay;
    const nextDay = Math.ceil(limitDay / 7) * 7;

    let dates = [];

    // 이전 달 빈 칸
    for (let i = 0; i < firstDay; i++) {
      dates.push(<div key={`empty-start-${i}`} className="noColor"></div>);
    }

    // 이번 달 날짜
    for (let i = 1; i <= lastDay; i++) {
      const dateStr = `${viewYear}-${pad(viewMonth + 1)}-${pad(i)}`;
      dates.push(
        <div key={i}>
          {i}
          {calendarList[dateStr]?.map((content, idx) => (
            <span
              key={idx}
              className={content === "예약" ? "reservation-btn" : content === "휴무" ? "closed-btn" : ""}
            >
              {content}
            </span>
          ))}
        </div>
      );
    }

    // 다음 달 빈 칸
    for (let i = limitDay; i < nextDay; i++) {
      dates.push(<div key={`empty-end-${i}`} className="noColor"></div>);
    }

    return dates;
  };

  const prevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div
      className="month-reservation-page"
      ref={containerRef}
    >
      <div className="calendar-container">
        <div className="header">
          <button className="date-last" onClick={prevMonth}>&lt;</button>
          <h2 className="date-now">{`${currentDate.getFullYear()}년 ${currentDate.getMonth() + 1}월`}</h2>
          <button className="date-next" onClick={nextMonth}>&gt;</button>
        </div>
        <div className="calendar">
          <div className="grid date-title">
            <div>일</div><div>월</div><div>화</div>
            <div>수</div><div>목</div><div>금</div><div>토</div>
          </div>
          <div className="grid date-board">
            {renderDates()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthReservationPage;

