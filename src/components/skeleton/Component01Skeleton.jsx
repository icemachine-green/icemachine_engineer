import React from "react";
import "./Component01Skeleton.css";

const Component01Skeleton = () => {
  return (
    <div className="component01-container">
      {/* 상단 프로필 섹션 스켈레톤 */}
      <section className="sk-profile-section">
        <div className="skeleton-box sk-profile-image"></div>
        <div className="sk-profile-info">
          <div className="skeleton-box sk-profile-name"></div>
          <div className="skeleton-box sk-profile-message"></div>
        </div>
      </section>

      {/* 요약 카드 그리드 스켈레톤 */}
      <section className="summary-grid">
        <div className="sk-summary-card">
          <div className="sk-card-content">
            <div className="skeleton-box sk-card-label"></div>
            <div className="skeleton-box sk-card-value"></div>
          </div>
          <div className="skeleton-box sk-card-arrow"></div>
        </div>
        
        <div className="sk-summary-card">
          <div className="sk-card-content">
            <div className="skeleton-box sk-card-label"></div>
            <div className="skeleton-box sk-card-value"></div>
          </div>
          <div className="skeleton-box sk-card-arrow"></div>
        </div>
      </section>
    </div>
  );
};

export default Component01Skeleton;