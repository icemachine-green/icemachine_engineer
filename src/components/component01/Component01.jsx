import "./Component01.css";

const Component01 = () => {
  return (
    <div className="component01-container">

      {/* 상단 프로필 영역 */}
      <section className="profile-section">
          <img
            src="/public/icons/profile.png"
            alt="기사프로필이미지"
            className="profile-image-placeholder"
          />       
        <div className="profile-info">
          <p className="profile-name">
            김정현 <span>기사님</span>
          </p>
          <div className="profile-message">
            <p>
              <strong className="highlight">12월 22일 월요일</strong>입니다.<br />
              오늘 예약은 <strong className="highlight">2건</strong> 입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 예약 요약 카드 */}
      <section className="summary-section">
        <div className="summary-card">
          <p className="card-title">오늘 예약</p>
          <p className="card-count highlight">2<span>건</span></p>
        </div>

        <div className="summary-card">
          <p className="card-title">이번 달 예약</p>
          <p className="card-count highlight">31<span>건</span></p>
        </div>
      </section>

    </div>
  );
};

export default Component01;

