import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동
import { useDispatch } from "react-redux"; // Redux 상태 변경
import { logout } from "../../store/slices/authSlice"; // 로그아웃 액션
import "./MyPage.css";
// 공통 더미 데이터 임포트
import { reservationsDummy } from "../../data/reservationsDummy.js"; 


const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


// ✅ 고정된 문자열 대신 실제 날짜를 생성하는 로직
const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
const day = String(now.getDate()).padStart(2, "0");
const todayStr = `${year}-${month}-${day}`; 
// 오늘이 1월 7일이면 자동으로 "2026-01-07"이 됩니다.

  const [isOuterOpen, setIsOuterOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);        // 1단계: 로그아웃 확인
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);    // 2단계: 완료 알림

  const todayCount = reservationsDummy.filter(res => res.date === todayStr).length;
  const totalWorkCount = reservationsDummy.length;

  const recentWorkHistory = [...reservationsDummy]
    .filter(res => res.date <= todayStr)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const handleInnerToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // 오늘 예약 통계 클릭 핸들러
  const handleTodayCountClick = () => {
    if (todayCount > 0) {
      navigate("/reservation"); // 오늘 예약이 있을 때만 이동
    }
  };

  // 1단계: 로그아웃 질문 모달 열기/닫기
  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  // 2단계: 로그아웃 실행 (Redux 디스패치 + 완료 모달 전환)
  const handleLogoutConfirm = () => {
    dispatch(logout()); // Redux 상태를 로그아웃으로 변경
    setIsModalOpen(false);
    setIsSuccessOpen(true);
  };

  // 3단계: 완료 모달 확인 버튼 (메인 페이지로 이동)
  const handleFinalConfirm = () => {
    setIsSuccessOpen(false);
    navigate("/login"); // 로그아웃 완료 후 초기 화면(로그인 화면)으로 이동
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
            {/* 오늘 예약 건수 클릭 가능 영역 */}
            <div 
              className={`stat-item click-enabled ${todayCount > 0 ? "has-data" : ""}`} 
              onClick={handleTodayCountClick}
            >
              <span className="stat-label">오늘 예약</span>
              <strong className="stat-value">{todayCount}건</strong>
              {todayCount > 0 && <span className="stat-click-hint">이동하기</span>}
            </div>

            <div className="stat-item">
              <span className="stat-label">전체 예약</span>
              <strong className="stat-value">{totalWorkCount}건</strong>
            </div>
          </div>
        </section>

        {/* 내 작업 상세 내역 (아코디언) */}
        <section className="info-card-section">
          <button className="accordion-toggle-btn" onClick={() => setIsOuterOpen(!isOuterOpen)}>
            <span className="toggle-text">내 작업 상세 내역</span>
            <span className={`toggle-icon-arrow ${isOuterOpen ? "is-open" : ""}`}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                style={{ width: '100%', height: '100%' }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </span>
          </button>

          {isOuterOpen && (
            <div className="outer-content-area">
              <div className="list-limit-notice">최근 5개의 완료된 작업 내역만 표시됩니다.</div>
              <div className="work-history-list">
                {recentWorkHistory.map((work, index) => (
                  <div key={work.id} className={`work-history-item ${expandedIndex === index ? "active" : ""}`}>
                    <div className="inner-list-header" onClick={() => handleInnerToggle(index)}>
                      <div className="inner-header-left">
                        <span className="work-date">{work.date.replace(/-/g, ".")}</span>
                        <span className="work-customer">{work.name} 고객님</span>
                      </div>
                      <span className={`inner-arrow-icon ${expandedIndex === index ? "is-open" : ""}`}>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth={1.5} 
                          stroke="currentColor" 
                          style={{ width: '100%', height: '100%' }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                      </span>
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
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* 🔔 1단계: 로그아웃 확인 모달 */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeLogoutModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-status-bar"></div>
            <h3 className="modal-title">로그아웃</h3>
            <p className="modal-desc">정말 로그아웃 하시겠습니까?<br/>안전한 서비스 종료를 위해 권장합니다.</p>
            <div className="modal-button-group">
              <button className="modal-btn-confirm" onClick={handleLogoutConfirm}>예</button>
              <button className="modal-btn-cancel" onClick={closeLogoutModal}>아니오</button>
            </div>
          </div>
        </div>
      )}

      {/* 🔔 2단계: 로그아웃 완료 알림 모달 */}
      {isSuccessOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-status-bar success"></div>
            <div className="modal-body-with-icon">               
                <h3 className="modal-title">로그아웃 완료</h3>
                <p className="modal-desc">안전하게 로그아웃 되었습니다.<br/>오늘도 고생 많으셨습니다!</p>
            </div>
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