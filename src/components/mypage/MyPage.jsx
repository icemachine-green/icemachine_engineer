import { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [open, setOpen] = useState(false);

  // 리뷰 데이터 (별도 관리 가능)
  const reviews = [
    { name: "진중권", date: "2025.12.27", content: "제빙기 내부까지 꼼꼼하게 청소해 주셔서 얼음 상태가 확실히 달라졌어요." },
    { name: "김재인", date: "2025.12.28", content: "약속 시간도 잘 지키시고 설명도 친절하게 해주셔서 믿음이 갑니다." },
    { name: "김상환", date: "2025.12.29", content: "청소 전후 사진을 직접 보여주시니 정말 안심이 되네요. 추천합니다!" },
  ];

  return (
    <div className="mypage-wrapper">
      <main className="mypage-container">
        {/* 페이지 타이틀 */}
        <header className="mypage-header">
          <h1 className="mypage-title">마이 페이지</h1>
        </header>

        {/* ========================= 내 정보 카드 ========================= */}
        <section className="info-card-section">
          <span className="category-label">내 정보 확인</span>
          <div className="profile-wrapper">
            <img
              className="profile-avatar"
              src="/icons/profile.png"
              alt="프로필"
            />
            <div className="profile-info-text">
              <h2 className="profile-name">김정현 기사님</h2>
              <div className="profile-meta-list">
                <span>honghyun122@gmail.com</span>
                <span>010-3355-2277</span>
                <span className="badge-grade">Middle 등급</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================= 작업 내역 카드 ========================= */}
        <section className="info-card-section">
          <span className="category-label">내 작업 내역</span>
          
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">예약</span>
              <strong className="stat-value">8건</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">완료</span>
              <strong className="stat-value">45건</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">리뷰</span>
              <strong className="stat-value">116건</strong>
            </div>
          </div>

          <div className="review-section-header">
            <h3 className="section-sub-title">최근 등록된 리뷰</h3>
          </div>

          <div className="review-scroll-area">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card-item">
                <img
                  className="review-thumb"
                  src="/icons/icemachine.png"
                  alt="작업사진"
                />
                <div className="review-body">
                  <div className="review-header">
                    <span className="review-stars">★★★★★</span>
                    <div className="review-writer-info">
                      <span className="writer-name">{review.name}</span>
                      <span className="write-date">{review.date}</span>
                    </div>
                  </div>
                  <p className="review-comment">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================= 작업 상세 내역 (토글) ========================= */}
        <section className="info-card-section">
          <button className="accordion-toggle-btn" onClick={() => setOpen(!open)}>
            <span className="toggle-text">내 작업 상세 내역</span>
            <span className={`toggle-icon-arrow ${open ? "is-open" : ""}`}></span>
          </button>

          {open && (
            <div className="accordion-content-detail">
              <div className="detail-info-list">
                <div className="info-row">
                  <span className="label">방문일자</span>
                  <span className="value">2026년 01월 02일</span>
                </div>
                <div className="info-row">
                  <span className="label">고객명</span>
                  <span className="value">정연자 고객님</span>
                </div>
                <div className="info-row">
                  <span className="label">제품명</span>
                  <span className="value">Hoshizaki IM-65</span>
                </div>
                <div className="info-row">
                  <span className="label">서비스</span>
                  <span className="value">DEEP CLEAN</span>
                </div>
              </div>

              <img
                className="product-full-img"
                src="/icons/icemachine_model.png"
                alt="제품 이미지"
              />

              <div className="work-photo-comparison">
                <div className="photo-box">
                  <span className="photo-label">Before</span>
                  <img src="/icons/icemachine_dark.png" alt="작업전" />
                </div>
                <div className="photo-box">
                  <span className="photo-label">After</span>
                  <img src="/icons/icemachine.png" alt="작업후" />
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyPage;
