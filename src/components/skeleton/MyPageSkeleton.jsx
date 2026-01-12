import React from "react";
import "./MyPageSkeleton.css";

const MyPageSkeleton = () => {
  return (
    <div className="mypage-wrapper">
      <main className="mypage-container">
        {/* 헤더 스켈레톤 */}
        <header className="mypage-header">
          <div className="skeleton-box sk-title"></div>
          <div className="skeleton-box sk-top-btn"></div>
        </header>

        {/* 내 정보 카드 스켈레톤 */}
        <section className="info-card-section">
          <div className="skeleton-box sk-label"></div>
          <div className="profile-wrapper">
            <div className="skeleton-box sk-avatar"></div>
            <div className="profile-info-text">
              <div className="skeleton-box sk-name"></div>
              <div className="sk-meta-group">
                <div className="skeleton-box sk-meta-line"></div>
                <div className="skeleton-box sk-meta-line short"></div>
              </div>
            </div>
          </div>
        </section>

        {/* 통계 카드 스켈레톤 */}
        <section className="info-card-section">
          <div className="skeleton-box sk-label"></div>
          <div className="stats-grid">
            <div className="skeleton-box sk-stat-item"></div>
            <div className="skeleton-box sk-stat-item"></div>
          </div>
        </section>

        {/* 아코디언 섹션 스켈레톤 */}
        <section className="info-card-section">
          <div className="sk-accordion-header">
            <div className="skeleton-box sk-accordion-title"></div>
            <div className="skeleton-box sk-arrow"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyPageSkeleton;