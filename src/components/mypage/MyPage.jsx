import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { engineerMyPageThunk } from "../../store/thunks/engineerMyPageThunk.js";
import "./MyPage.css";
import { logoutThunk } from "../../store/thunks/authThunk.js";

const MyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { engineer, workSummary, completedWorks } = useSelector((state) => state.engineerMyPage);

  useEffect(() => {
    dispatch(engineerMyPageThunk());
  }, [])

  // ---------- 오늘 날짜 문자열 생성 ----------
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  // ---------- 모달 상태 관리 ----------
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLogoutSuccessOpen, setIsLogoutSuccessOpen] = useState(false);

  // ---------- 오늘 예약 수 ----------
  const todayCount = workSummary?.todayCount ?? 0;

  // ---------- 이벤트 핸들러 ----------

  // 오늘 예약 클릭 → 날짜별 예약 목록
  const handleTodayReservationClick = () => {
    if (todayCount > 0) {
      navigate(`/reservation?date=${todayStr}`); // 날짜 쿼리 전달
    }
  };

  // 로그아웃 플로우
  const handleLogoutConfirm = () => {
    dispatch(logoutThunk());
    setIsLogoutModalOpen(false);
    setIsLogoutSuccessOpen(true);
  };

  const handleLogoutComplete = () => {
    setIsLogoutSuccessOpen(false);
    navigate("/login");
  };

  return (
    <div className="mypage-wrapper">
      <main className="mypage-container">

        {/* 헤더 */}
        <header className="mypage-header">
          <h1 className="mypage-title">마이 페이지</h1>
          <button className="top-logout-btn" onClick={() => setIsLogoutModalOpen(true)}>로그아웃</button>
        </header>

        {/* 내 정보 확인 */}
        <section className="info-card-section">
          <span className="category-label">내 정보 확인</span>
          <div className="profile-wrapper">
            <img className="profile-avatar" src="/icons/profile.png" alt="프로필" />
            <div className="profile-info-text">
              <h2 className="profile-name">{engineer?.name} 기사님</h2>
              <div className="profile-meta-list">
                <span>{engineer?.email}</span>
                <span>{engineer?.phoneNumber}</span>
                <span className="badge-grade">{engineer?.skillLevel} 등급</span>
              </div>
            </div>
          </div>
        </section>

        {/* 내 작업 내역 (통계) */}
        <section className="info-card-section">
          <span className="category-label">내 작업 내역</span>
          <div className="stats-grid">
            {/* 오늘 예약 */}
            <div 
              className={`stat-item click-enabled ${todayCount > 0 ? "has-data" : ""}`} 
              onClick={handleTodayReservationClick}
            >
              <span className="stat-label">오늘 예약</span>
              <strong className="stat-value">{todayCount}건</strong>
              {todayCount > 0 && <span className="stat-click-hint">이동하기</span>}
            </div>

            {/* 전체 예약 */}
            <div className="stat-item">
              <span className="stat-label">전체 예약</span>
              <strong className="stat-value">{workSummary?.totalCount ?? 0}건</strong>
            </div>
          </div>
        </section>

        {/* 내 작업 요약 정보 */}
        <section className="info-card-section">
          <div>
            <div className="info-card-section-head">
              <span className="toggle-text">내 작업 요약 정보</span>
              <div className="list-limit-notice">최근 5개의 완료된 작업 내역만 표시됩니다.</div>
            </div>
            <span className="work-history-hint">* 클릭시 상세내역 확인 가능</span>
          </div>
          <div className="outer-content-area">
            <div className="work-history-list">
              {completedWorks.map((work) => (
                <div
                  key={work.reservationId}
                  className={"work-history-item clickable"}
                  onClick={() => navigate(`/reservation/${work.reservationId}`)}>
                  <div className="inner-list-header">
                    <div className="inner-header-left">
                      <span className="work-id">예약ID : {work.reservationId}</span>
                      <span className="work-date">{work.reservedDate.replace(/-/g, ".")}</span>
                      <span className="work-customer">{work.businessManagerName} 고객님</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 로그아웃 확인 모달 */}
      {isLogoutModalOpen && (
        <div className="modal-overlay" onClick={() => setIsLogoutModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-status-bar"></div>
            <h3 className="modal-title">로그아웃</h3>
            <p className="modal-desc">정말 로그아웃 하시겠습니까?<br/>안전한 서비스 종료를 위해 권장합니다.</p>
            <div className="modal-button-group">
              <button className="modal-btn-confirm" onClick={handleLogoutConfirm}>예</button>
              <button className="modal-btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>아니오</button>
            </div>
          </div>
        </div>
      )}

      {/* 로그아웃 완료 모달 */}
      {isLogoutSuccessOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-status-bar success"></div>
            <div className="modal-body-with-icon">               
                <h3 className="modal-title">로그아웃 완료</h3>
                <p className="modal-desc">안전하게 로그아웃 되었습니다.<br/>오늘도 고생 많으셨습니다!</p>
            </div>
            <div className="modal-button-group">
              <button className="modal-btn-confirm" onClick={handleLogoutComplete}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;