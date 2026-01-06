import { useState } from "react";
import "./MyPage.css";
// 1. 공통 더미 데이터 임포트
import { reservationsDummy } from "../../data/reservationsDummy.js"; 

const MyPage = () => {
  const [isOuterOpen, setIsOuterOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // 기준이 되는 오늘 날짜
  const todayStr = "2026-01-06";

  // 2. 데이터 가공 로직
  // 오늘 예약 건수 (2026-01-06 기준)
  const todayCount = reservationsDummy.filter(res => res.date === todayStr).length;
  
  // 전체 예약 건수
  const totalWorkCount = reservationsDummy.length;

  // [수정된 부분] 최근 작업 내역: 오늘(1월 6일) 포함 과거 데이터만 필터링 후 최신순 5개 추출
  const recentWorkHistory = [...reservationsDummy]
    .filter(res => res.date <= todayStr) // 오늘(01-06)보다 작거나 같은 날짜만 포함
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // 최신순 정렬
    .slice(0, 5); // 상위 5개

  const reviews = [
    { name: "진중권", date: "2025.12.27", content: "제빙기 내부까지 꼼꼼하게 청소해 주셔서 얼음 상태가 확실히 달라졌어요." },
    { name: "김재인", date: "2025.12.28", content: "약속 시간도 잘 지키시고 설명도 친절하게 해주셔서 믿음이 갑니다." },
    { name: "김상환", date: "2025.12.29", content: "청소 전후 사진을 직접 보여주시니 정말 안심이 되네요. 추천합니다!" },
  ];

  // ... 이하 기존 JSX 및 handleInnerToggle 로직 동일 (생략)

  const handleInnerToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mypage-wrapper">
      <main className="mypage-container">
        <header className="mypage-header">
          <h1 className="mypage-title">마이 페이지</h1>
        </header>

        {/* 내 정보 카드 */}
        <section className="info-card-section">
          <span className="category-label">내 정보 확인</span>
          <div className="profile-wrapper">
            <img className="profile-avatar" src="/icons/profile.png" alt="프로필" />
            <div className="profile-info-text">
              <h2 className="profile-name">홍길동 기사님</h2> {/* 이름 통일 */}
              <div className="profile-meta-list">
                <span>honggil@gmail.com</span>
                <span>010-1212-7777</span>
                <span className="badge-grade">Middle 등급</span>
              </div>
            </div>
          </div>
        </section>

        {/* 작업 내역 통계 카드: 데이터 연동 */}
        <section className="info-card-section">
          <span className="category-label">내 작업 내역</span>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">오늘 예약</span>
              <strong className="stat-value">{todayCount}건</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">전체 예약</span>
              <strong className="stat-value">{totalWorkCount}건</strong>
            </div>
            <div className="stat-item">
              <span className="stat-label">리뷰</span>
              <strong className="stat-value">31건</strong>
            </div>
          </div>
          
          <div className="review-section-header">
            <h3 className="section-sub-title">최근 등록된 리뷰</h3>
          </div>
          <div className="review-scroll-area">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card-item">
                <img className="review-thumb" src="/icons/icemachine.png" alt="작업사진" />
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

        {/* 내 작업 상세 내역: 더미 데이터 연동 */}
        <section className="info-card-section">
          <button className="accordion-toggle-btn" onClick={() => setIsOuterOpen(!isOuterOpen)}>
            <span className="toggle-text">내 작업 상세 내역</span>
            <span className={`toggle-icon-arrow ${isOuterOpen ? "is-open" : ""}`}></span>
          </button>

          {isOuterOpen && (
            <div className="outer-content-area">
              <div className="list-limit-notice">최근 5개의 작업 내역만 표시됩니다.</div>
              <div className="work-history-list">
                {recentWorkHistory.map((work, index) => (
                  <div key={work.id} className={`work-history-item ${expandedIndex === index ? "active" : ""}`}>
                    <div className="inner-list-header" onClick={() => handleInnerToggle(index)}>
                      <div className="inner-header-left">
                        <span className="work-date">{work.date.replace(/-/g, ".")}</span>
                        <span className="work-customer">{work.name} 고객님</span>
                      </div>
                      <span className={`inner-arrow-icon ${expandedIndex === index ? "is-open" : ""}`}></span>
                    </div>

                    {expandedIndex === index && (
                      <div className="inner-detail-content">
                        <div className="detail-info-list">
                          <div className="info-row">
                            <span className="label">지점명</span>
                            <span className="value">{work.storeName}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">제품명</span>
                            <span className="value">{work.model}</span>
                          </div>
                          <div className="info-row">
                            <span className="label">서비스</span>
                            <span className="value">{work.service}</span>
                          </div>
                        </div>
                        <img className="product-full-img" src="/icons/icemachine_model.png" alt="제품" />
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
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MyPage;