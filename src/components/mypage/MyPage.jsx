import { useState } from "react";
import "./MyPage.css";

const MyPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <main className="mypage">
      {/* 페이지 타이틀 */}
      <h1 className="mypage-title">마이 페이지</h1>

      {/* ========================= 내 정보 카드 ========================= */}
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

      {/* ========================= 작업 내역 카드 ========================= */}
      <section className="card">
        <h2 className="card-title">내 작업 내역</h2>
        <div className="card-subtitle">작업수</div>
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

        <div className="card-subtitle">
          등록된 리뷰 내역<span> (최신순)</span>
        </div>

        <div className="review-list">
          {[
            { name: "진중권", date: "2025.12.27" },
            { name: "김재인", date: "2025.12.28" },
            { name: "김상환", date: "2025.12.29" },
          ].map((review, idx) => (
            <div key={idx} className="review-item">
              <img
                className="review-image"
                src="/icons/icemachine.png"
                alt="제빙기 작업 이미지"
              />
              <div className="review-content">
                <div className="review-top">
                  <div className="review-stars">★★★★★</div>
                  <div className="review-meta">
                    <span className="review-name">{review.name}</span>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>
                <p className="review-text">
                  제빙기 내부까지 꼼꼼하게 청소해 주셔서
                  <br />
                  얼음 상태가 확실히 달라졌어요.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================= 작업 상세 카드 ========================= */}
      <section className="card">
        <button className="toggle" onClick={() => setOpen(!open)}>
          내 작업 상세 내역
          <span className={open ? "arrow open" : "arrow"}></span>
        </button>

        {open && (
          <div className="detail">
            <div className="detail-row">
              <span>방문일자</span>
              <span>2026년 01월 02일</span>
            </div>
            <div className="detail-row">
              <span>고객명</span>
              <span>정연자</span>
            </div>
            <div className="detail-row">
              <span>제품명</span>
              <span>Hoshizaki IM-65</span>
            </div>

            <img
              className="detail-image"
              src="/icons/icemachine_model.png"
              alt="제빙기 제품 이미지"
            />

            <div className="detail-row">
              <span>서비스 종류</span>
              <span>DEEP CLEAN</span>
            </div>
            <div className="detail-row">
              <span>소요 시간</span>
              <span>2시간</span>
            </div>

            <div className="before-after">
              <img
                className="review-image"
                src="/icons/icemachine_dark.png"
                alt="제빙기 작업 전 이미지"
              />
              <img
                className="review-image"
                src="/icons/icemachine.png"
                alt="제빙기 작업 후 이미지"
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default MyPage;
