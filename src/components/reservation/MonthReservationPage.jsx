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

  const { 
    calendarData = {}, 
    totalCount = 0, 
    status 
  } = useSelector((state) => state.engineerCalendar || {});

  // 현재 캘린더에 보여지는 기준 날짜
  const [currentDate, setCurrentDate] = useState(dayjs().startOf('month').toDate());

  const formatDate = (date) => dayjs(date).format("YYYY-MM-DD");

  const minDate = dayjs().add(-2, 'month').startOf('month').toDate();
  const maxLimitDate = dayjs().add(2, 'month').endOf('month').toDate();
  
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    dispatch(engineerCalendarThunk({ year, month }));
  }, [currentDate, dispatch]);

  // [수정된 부분] 예약이 있는 날짜라면 어느 날이든 상세 페이지로 이동
  const handleDayClick = (date) => {
    const dateStr = formatDate(date);
    const reservationCount = calendarData[dateStr] || 0;
    
    if (reservationCount > 0) {
      // 상세 페이지로 날짜 정보를 가지고 이동 (예: /reservation/2023-10-25)
      navigate(`/reservation?date=${dateStr}`);
    }
  };

  const getTileClassName = ({ date, view }) => {
    if (view === "month") {
      const dateStr = formatDate(date);
      // 예약이 있는 날짜에 클래스 부여 (CSS에서 cursor: pointer 등 설정 가능)
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
      return <div className="summary-box"><span className="label">데이터를 불러오는 중...</span></div>;
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
            // value를 null로 두면 특정 날짜 선택 표시가 사라져 덜 혼란스럽습니다.
            value={null}
            onActiveStartDateChange={({ activeStartDate }) => setCurrentDate(activeStartDate)}
            onClickDay={handleDayClick}
            tileContent={tileContent}
            tileClassName={getTileClassName}
            formatDay={(locale, date) => date.getDate()}
            // 네비게이션 버튼 제한 로직 유지
            prevLabel={
              dayjs(currentDate).isSame(minDate, 'month') ? null : "‹"
            }
            nextLabel={
              dayjs(currentDate).isSame(maxLimitDate, 'month') ? null : "›"
            }
            prev2Label={null}
            next2Label={null}
            view="month"
            minDate={minDate}
            maxDate={maxLimitDate}
          />
          <footer className="calendar-legend">
            <div className="legend-item">
              <span className="dot reservation"></span>
              <span>예약 있음 (클릭 가능)</span>
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

