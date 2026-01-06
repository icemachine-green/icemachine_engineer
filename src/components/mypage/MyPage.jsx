import { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  // 1단계: 내 작업 상세 내역 전체 열림/닫힘 상태
  const [isOuterOpen, setIsOuterOpen] = useState(false);
  
  // 2단계: 목록 중 어떤 아이템이 열려있는지 관리 (null이면 모두 닫힘)
  const [expandedIndex, setExpandedIndex] = useState(null);

  const reviews = [
    { name: "진중권", date: "2025.12.27", content: "제빙기 내부까지 꼼꼼하게 청소해 주셔서 얼음 상태가 확실히 달라졌어요." },
    { name: "김재인", date: "2025.12.28", content: "약속 시간도 잘 지키시고 설명도 친절하게 해주셔서 믿음이 갑니다." },
    { name: "김상환", date: "2025.12.29", content: "청소 전후 사진을 직접 보여주시니 정말 안심이 되네요. 추천합니다!" },
  ];

  // 작업 이력 더미 데이터 (5개 이상 존재한다고 가정)
  const workHistory = [
    { id: 1, date: "2026.01.02", customer: "정연자", product: "Hoshizaki IM-65", service: "DEEP CLEAN" },
    { id: 2, date: "2025.12.28", customer: "이영희", product: "Brema CB-425", service: "REGULAR" },
    { id: 3, date: "2025.12.20", customer: "박철수", product: "Manitowoc UDE", service: "DEEP CLEAN" },
    { id: 4, date: "2025.12.15", customer: "최지민", product: "Hoshizaki IM-100", service: "REGULAR" },
    { id: 5, date: "2025.12.10", customer: "윤준호", product: "Brema CB-246", service: "DEEP CLEAN" },
    { id: 6, date: "2025.12.05", customer: "강석훈", product: "Manitowoc NEO", service: "REGULAR" }, // 출력되지 않음
  ];

  const handleInnerToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mypage-wrapper">
      <main className="mypage-container">
        <header className="mypage-header">
          <h1 className="mypage-title">마이 페이지</h1>
        </header>

        {/* ========================= 내 정보 카드 ========================= */}
        <section className="info-card-section">
          <span className="category-label">내 정보 확인</span>
          <div className="profile-wrapper">
            <img className="profile-avatar" src="/icons/profile.png" alt="프로필" />
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

        {/* ========================= 작업 내역 통계 카드 ========================= */}
        <section className="info-card-section">
          <span className="category-label">내 작업 내역</span>
          <div className="stats-grid">
            <div className="stat-item"><span className="stat-label">예약</span><strong className="stat-value">8건</strong></div>
            <div className="stat-item"><span className="stat-label">완료</span><strong className="stat-value">45건</strong></div>
            <div className="stat-item"><span className="stat-label">리뷰</span><strong className="stat-value">116건</strong></div>
          </div>
          <div className="review-section-header"><h3 className="section-sub-title">최근 등록된 리뷰</h3></div>
          <div className="review-scroll-area">
            {reviews.map((review, idx) => (
              <div key={idx} className="review-card-item">
                <img className="review-thumb" src="/icons/icemachine.png" alt="작업사진" />
                <div className="review-body">
                  <div className="review-header">
                    <span className="review-stars">★★★★★</span>
                    <div className="review-writer-info"><span className="writer-name">{review.name}</span><span className="write-date">{review.date}</span></div>
                  </div>
                  <p className="review-comment">{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================= 내 작업 상세 내역 (최근 5개 제한) ========================= */}
        <section className="info-card-section">
          <button className="accordion-toggle-btn" onClick={() => setIsOuterOpen(!isOuterOpen)}>
            <span className="toggle-text">내 작업 상세 내역</span>
            <span className={`toggle-icon-arrow ${isOuterOpen ? "is-open" : ""}`}></span>
          </button>

          {isOuterOpen && (
            <div className="outer-content-area">
              <div className="list-limit-notice">최근 5개의 작업 내역만 표시됩니다.</div>
              <div className="work-history-list">
                {/* slice(0, 5)를 사용하여 최근 5개만 렌더링 */}
                {workHistory.slice(0, 5).map((work, index) => (
                  <div key={work.id} className={`work-history-item ${expandedIndex === index ? "active" : ""}`}>
                    <div className="inner-list-header" onClick={() => handleInnerToggle(index)}>
                      <div className="inner-header-left">
                        <span className="work-date">{work.date}</span>
                        <span className="work-customer">{work.customer} 고객님</span>
                      </div>
                      <span className={`inner-arrow-icon ${expandedIndex === index ? "is-open" : ""}`}></span>
                    </div>

                    {expandedIndex === index && (
                      <div className="inner-detail-content">
                        <div className="detail-info-list">
                          <div className="info-row"><span className="label">제품명</span><span className="value">{work.product}</span></div>
                          <div className="info-row"><span className="label">서비스</span><span className="value">{work.service}</span></div>
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