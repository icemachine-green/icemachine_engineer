import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReservationDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { detailThunk } from "../../store/thunks/reservationDetail.thunk.js";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { openNaverMap } from "../../utils/openNaverMap.js";

const DetailSkeleton = () => {
  return (
    <div className="detail-page-wrapper">
      <div className="detail-container">
        <header className="detail-header-card skeleton-bg">
          <div className="sk-item sk-badge"></div>
          <div className="sk-item sk-title"></div>
          <div className="sk-item sk-text"></div>
        </header>
        <main className="detail-main-content">
          {[1, 2, 3, 4].map((i) => (
            <section key={i} className="info-card-section">
              <div className="sk-item sk-label"></div>
              <div className="sk-item sk-content-box"></div>
            </section>
          ))}
        </main>
        <footer className="detail-sticky-footer">
          <div className="sk-item sk-button"></div>
        </footer>
      </div>
    </div>
  );
};

const ReservationDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [latLng, setLatLng] = useState({ lat: 35.8714, lng: 128.6014 });
  const { reservationDetailData, isLoading } = useSelector((state) => state.reservationDetail);

  const [isNotFoundReservation, setIsNotFoundReservation] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [workMemo, setWorkMemo] = useState("");

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  const saveToLocal = useCallback((status, memo) => {
    localStorage.setItem(`reservation_${id}`, JSON.stringify({
      status: status,
      memo: memo
    }));
  }, [id]);

  useEffect(() => {
    async function init() {
      const result = await dispatch(detailThunk(id)).unwrap();

      if (!result) {
        setIsNotFoundReservation(true);
        return;
      }

      const savedData = localStorage.getItem(`reservation_${id}`);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setCurrentStatus(parsed.status);
        setWorkMemo(parsed.memo || "");
      } else {
        setCurrentStatus(result.status || "예약됨");
        setWorkMemo(result.memo || "");
      }

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

  const handleStart = () => {
    const nextStatus = "작업 진행중";
    setCurrentStatus(nextStatus);
    saveToLocal(nextStatus, workMemo);
  };

  const handleComplete = () => setShowCompleteModal(true);

  const handleConfirmComplete = () => {
    const nextStatus = "작업 종료";
    setCurrentStatus(nextStatus);
    saveToLocal(nextStatus, workMemo);
    setShowCompleteModal(false);
    navigate('/reservation'); 
  };

  const handleSaveCancelReason = () => {
    const nextStatus = "작업 취소"; 
    setCurrentStatus(nextStatus);
    saveToLocal(nextStatus, workMemo); 
    closeCancelModal();
  };

  const handleMemoChange = (e) => {
    const nextMemo = e.target.value;
    setWorkMemo(nextMemo);
    saveToLocal(currentStatus, nextMemo);
  };

  const openCancelModal = () => setShowCancelModal(true);
  const closeCancelModal = () => { setShowCancelModal(false); setCancelReason(""); };

  const getStatusClass = (status) => {
    switch (status) {
      case '작업 종료': return 'status-finished';
      case '작업 취소': return 'status-cancelled';
      case '작업 진행중': return 'status-ongoing';
      case '예약됨': return 'status-reserved';
      default: return 'status-reserved';
    }
  };

  if (isLoading) return <DetailSkeleton />;
  if (isNotFoundReservation && !reservationDetailData) {
    return <div className="error-message-box">예약 정보를 찾을 수 없습니다.</div>;
  }

  const statusClass = getStatusClass(currentStatus);

  return (
    <div className="detail-page-wrapper">
      <div className="detail-container">
        <header className={`detail-header-card ${statusClass === 'status-finished' ? 'header-finished' : ''}`}>
          <div className={`status-badge-top ${statusClass}`}>
            <span className="pulse-dot"></span>
            {currentStatus}
          </div>
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
            <span className="category-label">기기 크기 및 모델</span>
            <div className="specs-grid">
              <div className="spec-item"><span className="spec-label">크기</span><span className="spec-value">{reservationDetailData?.type}</span></div>
              <div className="spec-item"><span className="spec-label">서비스 타입</span><span className="spec-value">{reservationDetailData?.service}</span></div>
              <div className="spec-item"><span className="spec-label">모델</span><span className="spec-value">{reservationDetailData?.model}</span></div>
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
          {/* 예약됨 상태일 때만 시작 버튼과 작은 취소 버튼 노출 */}
          {currentStatus === "예약됨" && (
            <div className="action-stack">
              <button className="btn-main-action start" onClick={handleStart}>
                작업 시작하기
              </button>
              <button className="btn-text-action" onClick={openCancelModal}>
                작업 취소하기
              </button>
            </div>
          )}

          {/* 작업 진행중 상태 */}
          {currentStatus === "작업 진행중" && (
            <div className="action-stack">
              <p className="status-notice">진행중인 작업이 있습니다</p>
              <button className="btn-main-action complete" onClick={handleComplete}>작업 완료</button>
            </div>
          )}

          {/* 작업 종료 상태 */}
          {currentStatus === "작업 종료" && (
            <button className="btn-main-action finished" disabled>작업 종료됨</button>
          )}

          {/* 작업 취소 상태일 때 나타나는 큰 상태 버튼 */}
          {currentStatus === "작업 취소" && (
            <button className="btn-main-action finished" disabled style={{ color: '#ff6b6b' }}>취소된 예약</button>
          )}
        </footer>
      </div>

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
            <button 
              className="modal-btn-save" 
              onClick={handleSaveCancelReason}
              disabled={!cancelReason.trim()}
            >
              사유 저장 및 취소
            </button>
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