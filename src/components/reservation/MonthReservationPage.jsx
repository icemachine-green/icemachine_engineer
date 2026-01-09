import React, { useState, useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./MonthReservationPage.css";
import { engineerCalendarThunk } from "../../store/thunks/engineerCalendarThunk.js";
import dayjs from "dayjs";

const MonthReservationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux 상태에서 days(calendarData)와 totalCount 추출
  const { 
    calendarData = {}, 
    totalCount = 0, 
    status 
  } = useSelector((state) => state.engineerCalendar || {});

  const now = new Date();
  const [currentDate, setCurrentDate] = useState(dayjs().startOf('month').toDate());

  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");
  const todayStr = formatDate(now);

  const minDate = dayjs().add(-2, 'month').startOf('month').toDate();
  const maxLimitDate = dayjs().add(2, 'month').endOf('month').toDate();
  
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    dispatch(engineerCalendarThunk({ year, month }));
  }, [currentDate, dispatch]);

  const handleDayClick = (date) => {
    const dateStr = formatDate(date);
    const reservationCount = calendarData[dateStr] || 0;
    if (dateStr === todayStr && reservationCount > 0) {
      navigate("/reservation");
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      if (calendarData[dateStr] > 0) {
        return "can-click-tile"; 
      }
    }
    return "default-tile";
  };

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;
    const dateStr = formatDate(date);
    const reservationCount = calendarData[dateStr] || 0;

    return (
      <div className="tile-badge-container">
        {reservationCount > 0 && (
          <span className="badge-reservation">예약 {reservationCount}건</span>
        )}
      </div>
    );
  };

  const renderSummary = () => {
    if (status === "loading") {
      return <span className="label">데이터를 불러오는 중...</span>;
    }
    return (
      <div className="summary-box">
        <span className="label">{currentDate.getMonth() + 1}월</span>
        <span className="count-highlight"> {totalCount} </span>
        <span className="label">건의 예약이 있습니다</span>
      </div>
    );
  };

  return (
    <div className="calendar-page-wrapper">
      <header className="month-summary-header">
        {renderSummary()}
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
            prevLabel={
              currentDate.getFullYear() <= minDate.getFullYear() && 
              currentDate.getMonth() <= minDate.getMonth() ? null : "‹"
            }
            nextLabel={
              currentDate.getFullYear() >= maxLimitDate.getFullYear() && 
              currentDate.getMonth() >= maxLimitDate.getMonth() ? null : "›"
            }
            prev2Label={null}
            next2Label={null}
            view="month"
            minDate={minDate}
            maxDate={maxLimitDate}
          />
          <footer className="calendar-legend">
            <div className="legend-item"><span className="dot reservation"></span><span>예약 있음</span></div>
            <div className="legend-item"><span className="dot offday"></span><span>정기 휴무</span></div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MonthReservationPage;


