import { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="mypage">

      <h1 className="mypage-title">마이 페이지</h1>

      {/* 내 정보 */}
      <section className="card">
        <h2 className="card-title">내 정보 확인</h2>

        <div className="profile">
          <img 
            className="profile-img"
            src="/icons/profile.png"
            alt="프로필 이미지"
         />
          <div className="profile-text">
            <strong>김정현 기사님</strong>
            <span>honghyun122@gmail.com</span>
            <span>010-3355-2277</span>
            <span>나의 등급 / Middle</span>
          </div>
        </div>
      </section>

      {/* 내 작업 내역 */}
      <section className="card">
        <h2 className="card-title">내 작업 내역</h2>

        <div className="work-count">
          <div>
            <span>예약</span>
            <strong>8건</strong>
          </div>
          <div>
            <span>완료</span>
            <strong>45건</strong>
          </div>
          <div>
            <span>리뷰</span>
            <strong>116건</strong>
          </div>
        </div>

        <div className="review-list">
          <div className="review-card" />
          <div className="review-card" />
          <div className="review-card" />
        </div>
      </section>

      {/* 작업 상세 */}
      <section className="card">
        <button className="toggle" onClick={() => setOpen(!open)}>
          내 작업 상세 내역
          <span className={open ? "arrow open" : "arrow"}>▼</span>
        </button>

        {open && (
          <div className="detail">

            <div className="detail-row">
              <span>방문일자</span>
              <span>2025년 12월 27일</span>
            </div>
            <div className="detail-row">
              <span>고객명</span>
              <span>정연자</span>
            </div>
            <div className="detail-row">
              <span>제품명</span>
              <span>Hoshizaki IM-65</span>
            </div>

            <div className="detail-image" />

            <div className="detail-row">
              <span>서비스 종류</span>
              <span>DEEP CLEAN</span>
            </div>
            <div className="detail-row">
              <span>소요 시간</span>
              <span>2시간</span>
            </div>

            <div className="before-after">
              <div />
              <div />
            </div>

          </div>
        )}
      </section>

    </main>
  );
};

export default MyPage;

