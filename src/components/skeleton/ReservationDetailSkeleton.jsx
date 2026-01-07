import React from "react";
import "./ReservationDetailSkeleton.css";

const ReservationDetailSkeleton = () => {
  return (
    <div className="detail-page-wrapper">
      <div className="detail-container">
        {/* 상단 헤더 카드: 실제와 동일한 padding/margin 적용됨 */}
        <header className="detail-header-card is-loading">
          <div className="skeleton-box sk-badge-top"></div>
          <div className="skeleton-box sk-header-date"></div>
          <div className="skeleton-box sk-header-time"></div>
        </header>

        <main className="detail-main-content">
          {/* 고객 정보 섹션: 실제 padding 28px 반영 */}
          <section className="info-card-section">
            <div className="skeleton-box sk-label-text"></div>
            <div className="skeleton-box sk-store-name"></div>
            <div className="skeleton-box sk-cust-name"></div>
            <div className="skeleton-box sk-cust-phone"></div>
          </section>

          {/* 방문 주소 섹션 */}
          <section className="info-card-section">
            <div className="section-title-row">
              <div className="skeleton-box sk-label-text"></div>
            </div>
            <div className="skeleton-box sk-address"></div>
            <div className="skeleton-box sk-map-area"></div>
          </section>

          {/* 사진 섹션: 실제 Grid 레이아웃 활용 */}
          <section className="info-card-section">
            <div className="skeleton-box sk-label-text"></div>
            <div className="specs-grid">
              <div className="skeleton-box sk-spec-box"></div>
              <div className="skeleton-box sk-spec-box"></div>
            </div>
            <div className="photo-comparison-grid">
              <div className="skeleton-box sk-photo-box"></div>
              <div className="skeleton-box sk-photo-box"></div>
            </div>
          </section>

          {/* 메모 섹션 */}
          <section className="info-card-section">
            <div className="skeleton-box sk-label-text"></div>
            <div className="skeleton-box sk-memo-area"></div>
          </section>
        </main>

        {/* 하단 고정 영역 */}
        <footer className="detail-sticky-footer">
          <div className="skeleton-box sk-main-btn"></div>
        </footer>
      </div>
    </div>
  );
};

export default ReservationDetailSkeleton;