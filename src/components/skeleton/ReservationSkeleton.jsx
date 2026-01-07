import React from "react";
import "./ReservationSkeleton.css";

const ReservationSkeleton = () => {
  // 보통 초기 visibleCount인 3개 정도를 보여주는 것이 적당합니다.
  const skeletonCards = [1, 2, 3];

  return (
    <div className="page-wrapper">
      <div className="reservation-container">
        {/* 헤더 영역 스켈레톤 */}
        <header className="list-header sk-header-flex">
          <div className="skeleton-box sk-title-box"></div>
          <div className="skeleton-box sk-total-badge"></div>
        </header>

        {/* 예약 카드 목록 스켈레톤 */}
        <div className="reservation-list">
          {skeletonCards.map((_, index) => (
            <div key={index} className="reservation-card sk-card-no-hover">
              <div className="card-top">
                <div className="skeleton-box sk-time-badge"></div>
                <div className="skeleton-box sk-status-badge"></div>
              </div>

              <div className="card-body">
                <div className="skeleton-box sk-cust-title"></div>
                <div className="skeleton-box sk-address-line"></div>
                <div className="skeleton-box sk-service-tag"></div>
              </div>

              {/* 하단 버튼 영역 */}
              <div className="skeleton-box sk-detail-btn"></div>
            </div>
          ))}
        </div>

        {/* 더보기 버튼 스켈레톤 */}
        <div className="skeleton-box sk-more-btn"></div>
      </div>
    </div>
  );
};

export default ReservationSkeleton;