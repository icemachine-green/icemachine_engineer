import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ReservationDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { reservationDetailThunk } from "../../store/thunks/reservationDetail.thunk.js";
import { reservationStartThunk } from "../../store/thunks/reservationStart.thunk";
import { reservationCompleteThunk } from "../../store/thunks/reservationComplete.thunk";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { openNaverMap } from "../../utils/openNaverMap.js";
import dayjs from "dayjs";

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

  // --------------------
  // 스테이터스 한글 변환 함수
  // --------------------
  const getKrStatus = (status) => {
    switch (status) {
      case 'CONFIRMED': return '예약됨';
      case 'START': return '작업진행중';
      case 'COMPLETED': return '작업종료';
      case 'CANCELED': return '작업취소';
      default: return status; // 이미 한글인 경우 그대로 반환
    }
  };

  const [latLng, setLatLng] = useState({ lat: 35.8714, lng: 128.6014 });
  const { reservationDetailData, isLoading } = useSelector((state) => state.reservationDetail);

  const status = reservationDetailData?.status;
  const krStatusText = getKrStatus(status);
  const statusClass = String(status || "").toLowerCase();


  const [isNotFoundReservation, setIsNotFoundReservation] = useState(false);
  const [workMemo, setWorkMemo] = useState("");
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    async function init() {
      const result = await dispatch(reservationDetailThunk(id));
      if (!result || result.payload === undefined) {
        // thunk 결과값 확인 로직 (rejected 대응)
        if(!reservationDetailData) setIsNotFoundReservation(true);
        return;
      }

      const savedMemo = localStorage.getItem(`reservation_${id}_memo`);
      if (savedMemo !== null) {
        setWorkMemo(savedMemo);
      } else {
        setWorkMemo(result.payload?.memo || "");
      }

      const waitForKakao = (item) => {
        if (window.kakao && window.kakao.maps) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          const address = item?.payload?.business?.address || item?.business?.address;
          if (address) {
            geocoder.addressSearch(address, (res, status) => {
              if (status === window.kakao.maps.services.Status.OK && res.length > 0) {
                setLatLng({ lat: Number(res[0].y), lng: Number(res[0].x) });
              }
            });
          }
        } else {
          setTimeout(() => waitForKakao(item), 100);
        }
      };
      waitForKakao(result);
    }
    init();
  }, [dispatch, id]);

  // --------------------
  // 핸들러: 내부 상태는 '영문'으로 관리해야 switch문이 안 꼬임
  // --------------------
  const handleStart = async () => {
  try {
    const result = await dispatch(reservationStartThunk(id)).unwrap();

    if (result.message === "WORK_STARTED") {
      dispatch(reservationDetailThunk(id));
    }
  } catch (err) {
    alert("작업 시작 처리에 실패했습니다.", err);
  }
  };

  const handleComplete = () => setShowCompleteModal(true);

  const handleConfirmComplete = async () => {
  try {
    const result = await dispatch(reservationCompleteThunk(id)).unwrap();

    if (result.message === "WORK_COMPLETED") {
      dispatch(reservationDetailThunk(id));
      setShowCompleteModal(false);
      navigate("/reservation");
    }
  } catch (err) {
    alert("작업 완료 처리에 실패했습니다.", err);
  }
  };

  const handleMemoChange = (e) => {
    const nextMemo = e.target.value;
    setWorkMemo(nextMemo);

    localStorage.setItem(
    `reservation_${id}_memo`,
    nextMemo
  );
  };

  if (isLoading) return <DetailSkeleton />;
  if (isNotFoundReservation && !reservationDetailData) {
    return <div className="error-message-box">예약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="detail-page-wrapper">
      <div className="detail-container">
        <header className={`detail-header-card ${status === 'COMPLETED' ? 'card-finished' : ''}`}>
          {/* 클래스명은 status-confirmed, status-start 등으로 적용됨 */}
          <div className={`status-badge-top status-${statusClass}`}>
            <span className="pulse-dot"></span>
            {krStatusText} 
          </div>
          <p className="header-time">
           {/* 1. 연도와 날짜 (위쪽) */}
              <p className="date-display">
                <strong style={{ fontWeight: '800' }}>
                  {dayjs(reservationDetailData?.time?.start).format('YYYY-MM-DD')}
                </strong>
              </p>
              
              {/* 2. 시간 범위 (아래쪽) */}
              <span className="time-range-display">
                {dayjs(reservationDetailData?.time?.start).format('HH:mm')} ~ {dayjs(reservationDetailData?.time?.end).format('HH:mm')}
              </span>
            </p>
        </header>

        <main className="detail-main-content">
          <section className="info-card-section">
            <div className="section-header">
              <span className="category-label">고객 정보</span>
              <h2 className="store-name">{reservationDetailData?.business?.name}</h2>
              <div className="detail-id-num">예약 ID : {reservationDetailData?.reservationId}</div>
              <p className="customer-name">{`${reservationDetailData?.business?.managerName} 고객님`}</p>
              <div className="customer-phone-info">연락처: {reservationDetailData?.business?.phoneNumber}</div>
            </div>
          </section>

          <section className="info-card-section">
            <div className="section-title-row">
              <span className="category-label">방문 주소</span>
              <button 
                className="external-map-btn"
                onClick={() => openNaverMap({ lat: latLng.lat, lng: latLng.lng, name: reservationDetailData?.business?.name })}
              >
                네이버 지도로 보기
              </button>
            </div>
            <p className="address-display">📍 {reservationDetailData?.business?.address}</p>
            <div className="map-view-box">
              <Map center={{ lat: latLng.lat, lng: latLng.lng }} level={3} className="kakao-map-instance">
                <MapMarker position={{ lat: latLng.lat, lng: latLng.lng }} />
                <CustomOverlayMap position={{ lat: latLng.lat, lng: latLng.lng }}>
                  <div className="map-marker-label">{reservationDetailData?.business?.name}</div>
                </CustomOverlayMap>
              </Map>
            </div>
          </section>

          <section className="info-card-section">
            <span className="category-label">기기 크기 &middot; 서비스 타입 &middot; 모델</span>
            <div className="specs-grid">
              <div className="spec-item"><span className="spec-label">크기</span><span className="spec-value">{reservationDetailData?.iceMachine?.sizeType}</span></div>
              <div className="spec-item"><span className="spec-label">서비스</span><span className="spec-value">{reservationDetailData?.service?.type}</span></div>
              <div className="spec-item"><span className="spec-label">모델</span><span className="spec-value">{reservationDetailData?.iceMachine?.modelName}</span></div>
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
          {status === "CONFIRMED" && (
            <div className="action-stack">
              <button className="btn-main-action start" onClick={handleStart}>
                작업 시작하기
              </button>
            </div>
          )}

          {status === "START" && (
            <div className="action-stack">
              <p className="status-notice">진행중인 작업이 있습니다</p>
              <button className="btn-main-action complete" onClick={handleComplete}>작업 완료</button>
            </div>
          )}

          {status === "COMPLETED" && (
            <button className="btn-main-action finished" disabled>작업 종료됨</button>
          )}

          {status === "CANCELED" && (
            <button className="btn-main-action finished" disabled style={{ color: '#727272ff' }}>취소된 예약</button>
          )}
        </footer>
      </div>

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