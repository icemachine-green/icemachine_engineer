import React from "react";
import "./MonthReservationSkeleton.css";

const MonthReservationSkeleton = () => {
  // 캘린더의 날짜 타일 35개(5주 기준) 생성
  const skeletonTiles = Array.from({ length: 35 });

  return (
    <div className="calendar-page-wrapper">
      {/* 상단 요약 헤더 스켈레톤 */}
      <header className="month-summary-header">
        <div className="sk-summary-box">
          <div className="skeleton-box sk-summary-label"></div>
          <div className="skeleton-box sk-summary-count"></div>
          <div className="skeleton-box sk-summary-text"></div>
        </div>
      </header>

      <main className="calendar-main-section">
        <div className="calendar-card sk-card-no-padding">
          {/* 캘린더 상단 네비게이션 영역 */}
          <div className="sk-calendar-nav">
            <div className="skeleton-box sk-nav-btn"></div>
            <div className="skeleton-box sk-nav-label"></div>
            <div className="skeleton-box sk-nav-btn"></div>
          </div>

          {/* 요일 표시 영역 */}
          <div className="sk-weekdays">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="skeleton-box sk-weekday-item"></div>
            ))}
          </div>

          {/* 날짜 그리드 영역 */}
          <div className="sk-calendar-grid">
            {skeletonTiles.map((_, i) => (
              <div key={i} className="sk-calendar-tile">
                <div className="skeleton-box sk-tile-number"></div>
                <div className="skeleton-box sk-tile-badge"></div>
              </div>
            ))}
          </div>

          {/* 하단 범례 영역 */}
          <footer className="sk-calendar-legend">
            <div className="sk-legend-item">
              <div className="skeleton-box sk-dot"></div>
              <div className="skeleton-box sk-legend-text"></div>
            </div>
            <div className="sk-legend-item">
              <div className="skeleton-box sk-dot"></div>
              <div className="skeleton-box sk-legend-text"></div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default MonthReservationSkeleton;