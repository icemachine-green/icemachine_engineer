import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReservationDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { detailThunk } from "../../store/thunks/reservationDetail.thunk.js";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { openNaverMap } from "../../utils/openNaverMap.js";

const ReservationDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [latLng, setLatLng] = useState({ lat: 35.8714, lng: 128.6014 });
  const { reservationDetailData } = useSelector((state) => state.reservationDetail);

  const [isNotFoundReservation, setIsNotFoundReservation] = useState(false);
  const [images, setImages] = useState([]);
  
  const [currentStatus, setCurrentStatus] = useState("");
  const [workMemo, setWorkMemo] = useState("");

  /* 모달 상태 */
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  // 로컬 저장 로직: 목록 페이지와 공유되는 핵심 데이터
  const saveToLocal = useCallback((status, memo) => {
    localStorage.setItem(`reservation_${id}`, JSON.stringify({
      status: status,
      memo: memo !== undefined ? memo : workMemo
    }));
  }, [id, workMemo]);

  useEffect(() => {
    async function init() {
      const result = await dispatch(detailThunk(id)).unwrap();

      if (!result) {
        setIsNotFoundReservation(true);
        return;
      }

      // 초기 로드 시 저장된 데이터 확인
      const savedData = localStorage.getItem(`reservation_${id}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setCurrentStatus(parsed.status);
        setWorkMemo(parsed.memo || "");
      } else {
        setCurrentStatus(result.status || "예약됨");
        setWorkMemo(result.memo || "");
      }

      // 카카오 맵 Geocoding (기존 로직 유지)
      const waitForKakao = (item) => {
        if (window.kakao && window.kakao.maps) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(item.address, (res, status) => {
            if (status === window.kakao.maps.services.Status.OK && res.length > 0) {
              setLatLng({ lat: Number(res[0].y), lng: Number(res[0].x) });
            }
          });
        } else {
          setTimeout(() => waitForKakao(item), 100);
        }
      };
      waitForKakao(result);
    }
    init();
  }, [dispatch, id]);

  /* 상태 변경 핸들러 */
  const handleStart = () => {
    const nextStatus = "작업 진행중";
    setCurrentStatus(nextStatus);
    saveToLocal(nextStatus, workMemo);
  };

  const handleComplete = () => {
    setShowCompleteModal(true);
  };

  const handleConfirmComplete = () => {
    const nextStatus = "작업 종료";
    setCurrentStatus(nextStatus);
    saveToLocal(nextStatus, workMemo);
    setShowCompleteModal(false);
    // 선택 사항: 완료 후 목록으로 이동
    // navigate('/reservation'); 
  };

  const handleSaveCancelReason = () => {
    const nextStatus = "예약됨"; // 혹은 '취소됨'으로 설정 가능
    setCurrentStatus(nextStatus);
    saveToLocal(nextStatus, `취소사유: ${cancelReason}\n${workMemo}`);
    closeCancelModal();
  };

  const handleMemoChange = (e) => {
    const nextMemo = e.target.value;
    setWorkMemo(nextMemo);
    saveToLocal(currentStatus, nextMemo);
  };

  /* 이미지 메모리 해제 로직 추가 */
  useEffect(() => {
    return () => {
      images.forEach(url => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleRemoveImage = () => setImages((prev) => prev.slice(0, prev.length - 1));
  const handleAddImage = (event) => {
    const files = event.target.files;
    if (!files) return;
    const newImages = Array.from(files).slice(0, 2 - images.length);
    const urls = newImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const openCancelModal = () => setShowCancelModal(true);
  const closeCancelModal = () => { setShowCancelModal(false); setCancelReason(""); };

  if (isNotFoundReservation && !reservationDetailData) {
    return <div className="error-message-box">예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="detail-page-wrapper">
      <div className="detail-container">
        <header className="detail-header-card">
          <div className="status-badge-top">{currentStatus}</div>
          <h1 className="header-date">{reservationDetailData?.date}</h1>
          <p className="header-time">{reservationDetailData?.time}</p>
        </header>

        <main className="detail-main-content">
          <section className="info-card-section">
            <div className="section-header">
              <span className="category-label">고객 정보</span>
              <h2 className="store-name">{reservationDetailData?.storeName}</h2>
              <p className="customer-name">{reservationDetailData?.name} 고객님</p>
              <div className="customer-phone-info">연락처: {reservationDetailData?.phone}</div>
            </div>
          </section>

          <section className="info-card-section">
            <div className="section-title-row">
              <span className="category-label">방문 주소</span>
              <button 
                className="external-map-btn"
                onClick={() => openNaverMap({ lat: latLng.lat, lng: latLng.lng, name: reservationDetailData?.storeName })}
              >
                네이버 지도로 보기
              </button>
            </div>
            <p className="address-display">📍 {reservationDetailData?.address}</p>
            <div className="map-view-box">
              <Map center={{ lat: latLng.lat, lng: latLng.lng }} level={3} className="kakao-map-instance">
                <MapMarker position={{ lat: latLng.lat, lng: latLng.lng }} />
                <CustomOverlayMap position={{ lat: latLng.lat, lng: latLng.lng }}>
                  <div className="map-marker-label">{reservationDetailData?.storeName}</div>
                </CustomOverlayMap>
              </Map>
            </div>
          </section>

          <section className="info-card-section">
            <span className="category-label">기기 및 작업 사진</span>
            <div className="specs-grid">
              <div className="spec-item"><span className="spec-label">크기</span><span className="spec-value">{reservationDetailData?.type}</span></div>
              <div className="spec-item"><span className="spec-label">모델</span><span className="spec-value">{reservationDetailData?.model}</span></div>
            </div>

            <div className="photo-comparison-grid">
              <div className="photo-unit">
                <p className="photo-type">작업 전</p>
                {images[0] ? <img src={images[0]} alt="전" className="captured-img" /> : <div className="photo-empty">사진 없음</div>}
              </div>
              <div className="photo-unit">
                <p className="photo-type">작업 후</p>
                {images[1] ? <img src={images[1]} alt="후" className="captured-img" /> : <div className="photo-empty">사진 없음</div>}
              </div>
            </div>

            <div className="photo-controls">
              <button className="photo-btn-sub delete" onClick={handleRemoveImage} disabled={images.length === 0}>사진 삭제</button>
              <label className="photo-btn-sub upload">
                사진 추가
                <input type="file" accept="image/*" multiple hidden onChange={handleAddImage} />
              </label>
            </div>
          </section>

          <section className="info-card-section">
            <span className="category-label">고객 요구사항</span>
            <div className="memo-readonly">
              {reservationDetailData?.customerRequest || "상세 요구사항이 없습니다."}
            </div>
          </section>

          <section className="info-card-section">
            <span className="category-label">업무 메모</span>
            <textarea 
              className="memo-edit-area" 
              placeholder="특이사항을 메모해주세요."
              value={workMemo}
              onChange={handleMemoChange}
            />
          </section>
        </main>

        <footer className="detail-sticky-footer">
          {currentStatus === "예약됨" && (
            <button className="btn-main-action start" onClick={handleStart}>작업 시작하기</button>
          )}

          {currentStatus === "작업 진행중" && (
            <div className="action-stack">
              <p className="status-notice">진행중인 작업이 있습니다</p>
              <button className="btn-main-action complete" onClick={handleComplete}>작업 완료</button>
              <button className="btn-text-action" onClick={openCancelModal}>작업 취소</button>
            </div>
          )}

          {currentStatus === "작업 종료" && (
            <button className="btn-main-action finished" disabled>작업 종료됨</button>
          )}
        </footer>
      </div>

      {/* 모달 로직들 생략 없이 동일하게 유지 */}
      {showCancelModal && (
        <div className="modal-root">
          <div className="modal-paper">
            <div className="modal-head">
              <h3>작업 취소 사유</h3>
              <button className="btn-close" onClick={closeCancelModal}>&times;</button>
            </div>
            <textarea 
              className="modal-text-input" 
              placeholder="취소 사유를 적어주세요."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            />
            <button className="modal-btn-save" onClick={handleSaveCancelReason}>사유 저장 및 취소</button>
          </div>
        </div>
      )}

      {showCompleteModal && (
        <div className="modal-root">
          <div className="modal-paper alert-type">
            <h3>작업 완료</h3>
            <p>모든 공정을 마쳤습니까?</p>
            <button className="modal-btn-confirm" onClick={handleConfirmComplete}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetailPage;