import { useState } from "react";
import "./MyPage.css";
// 1. 공통 더미 데이터 임포트
import { reservationsDummy } from "../../data/reservationsDummy.js"; 

const MyPage = () => {
  const [isOuterOpen, setIsOuterOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);        // 로그아웃 확인 모달
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);    // 로그아웃 완료 모달

  const todayStr = "2026-01-06";

  const todayCount = reservationsDummy.filter(res => res.date === todayStr).length;
  const totalWorkCount = reservationsDummy.length;

  const recentWorkHistory = [...reservationsDummy]
    .filter(res => res.date <= todayStr)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const reviews = [
    { name: "진중권", date: "2025.12.27", content: "제빙기 내부까지 꼼꼼하게 청소해 주셔서 얼음 상태가 확실히 달라졌어요." },
    { name: "김재인", date: "2025.12.28", content: "약속 시간도 잘 지키시고 설명도 친절하게 해주셔서 믿음이 갑니다." },
    { name: "김상환", date: "2025.12.29", content: "청소 전후 사진을 직접 보여주시니 정말 안심이 되네요. 추천합니다!" },
  ];

  const handleInnerToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // 1단계: 로그아웃 질문 모달 열기/닫기
  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  // 2단계: 로그아웃 실행 (질문 모달 닫고 완료 모달 열기)
  const handleLogoutConfirm = () => {
    setIsModalOpen(false);
    setIsSuccessOpen(true);
    // 실제 로그아웃 API 호출 등이 필요한 시점입니다.
  };

  // 3단계: 완료 모달 확인 버튼 (최종 종료 및 페이지 이동 등)
  const handleFinalConfirm = () => {
    setIsSuccessOpen(false);
    console.log("로그아웃 완료 후 페이지 이동");
  };

  return (
    <div className="mypage-wrapper">
      <main className="mypage-container">
        <header className="mypage-header">
          <h1 className="mypage-title">마이 페이지</h1>
          <button className="top-logout-btn" onClick={openLogoutModal}>
            로그아웃
          </button>
        </header>

        {/* 내 정보 카드 */}
        <section className="info-card-section">
          <span className="category-label">내 정보 확인</span>
          <div className="profile-wrapper">
            <img className="profile-avatar" src="/icons/profile.png" alt="프로필" />
            <div className="profile-info-text">
              <h2 className="profile-name">홍길동 기사님</h2>
              <div className="profile-meta-list">
                <span>honggil@gmail.com</span>
                <span>010-1212-7777</span>
                <span className="badge-grade">Middle 등급</span>
              </div>
            </div>
          </div>
        </section>

        {/* 작업 내역 통계 카드 */}
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

        {/* 내 작업 상세 내역 */}
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

      {/* 1단계: 로그아웃 확인 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeLogoutModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-status-bar"></div>
            <h3 className="modal-title">로그아웃</h3>
            <p className="modal-desc">작업 종료 후에는<br/>로그아웃을 권장합니다. 진행하시겠습니까?</p>
            <div className="modal-button-group">
              <button className="modal-btn-confirm" onClick={handleLogoutConfirm}>로그아웃 하기</button>
              <button className="modal-btn-cancel" onClick={closeLogoutModal}>닫기</button>
            </div>
          </div>
        </div>
      )}

      {/* 2단계: 로그아웃 완료 알림 모달 */}
      {isSuccessOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-status-bar success"></div>
            <h3 className="modal-title">로그아웃 완료</h3>
            <p className="modal-desc">안전하게 로그아웃 되었습니다.<br/>오늘도 고생 많으셨습니다!</p>
            <div className="modal-button-group">
              <button className="modal-btn-confirm" onClick={handleFinalConfirm}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;