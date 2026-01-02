import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ReservationDetailPage.css";
import { useDispatch, useSelector } from "react-redux";
import { detailThunk } from "../../store/thunks/reservationDetail.thunk.js";
import { Map } from "react-kakao-maps-sdk";

const ReservationDetailPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [latLng, setLatLng] = useState({ lat: 35.8714, lng: 128.6014});
  const { reservationDetailData } = useSelector(state => state.reservationDetail);
  const [ isNotFoundReservation, setIsNotFoundReservation ] = useState(false);

  const [images, setImages] = useState([]);
  const [currentStatus, setCurrentStatus] = useState(
    reservationDetailData?.status || "예약됨"
  );

  /* 모달 관련 상태 */
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");

  /* ✅ 작업 완료 모달 상태 */
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  useEffect(() => {
    async function init() {
      // 서버에서 예약정보 가져오는 처리
      const result = await dispatch(detailThunk(id)).unwrap();

      if(!result) {
        setIsNotFoundReservation(true);
      } else {
        const waitForKakao = (item) => {
          if (window.kakao && window.kakao.maps) {
            // 위도 경도 획득
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.addressSearch(item.address, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                setLatLng({ lat: result[0].y, lng: result[0].x });
              }
            });
          } else {
            setTimeout(waitForKakao, 100);
          }
        };
  
        waitForKakao(result);
      }
    }

    init();
  }, []);

  if ( isNotFoundReservation && !reservationDetailData) {
    return (
      <div className="reservation-detail-page">
        예약 정보를 찾을 수 없습니다.
      </div>
    );
  }

  /* 이미지 추가 */
  const handleAddImage = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).slice(0, 2 - images.length);
    const newImageUrls = newImages.map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  /* 작업 상태 핸들러 */
  const handleStart = () => setCurrentStatus("작업 진행중");

  /* ✅ 작업 완료 클릭 → 모달 오픈 */
  const handleComplete = () => {
    setShowCompleteModal(true);
  };

  /* ✅ 작업 완료 모달 확인 */
  const handleConfirmComplete = () => {
    setCurrentStatus("작업 종료");
    setShowCompleteModal(false);
  };

  /* 작업 취소 모달 핸들러 */
  const openCancelModal = () => setShowCancelModal(true);
  const closeCancelModal = () => {
    setShowCancelModal(false);
    setCancelReason("");
  };

  const handleSaveCancelReason = () => {
    console.log("취소 사유:", cancelReason);
    setCurrentStatus("예약됨");
    closeCancelModal();
  };

  return (
    <div className="reservation-detail-page">
      <div className="detail-card">
        {/* 날짜 / 시간 */}
        <div className="detail-date">
          <p className="date-text">{reservationDetailData?.date}</p>
          <p className="time-text">{reservationDetailData?.time}</p>
        </div>

        {/* 고객 정보 */}
        <div className="detail-section">
          <h3 className="section-title">
            {reservationDetailData?.name} 고객님
          </h3>
          <p className="section-text phone">
            📞 {reservationDetailData?.phone}
          </p>
        </div>

        <hr />

        {/* 주소 & 지도 */}
        <div className="detail-section">
          <p className="section-label">주소</p>
          <p className="section-text">{reservationDetailData?.address}</p>
          <Map
            center={{ lat: latLng.lat, lng: latLng.lng }}
            className="map-placeholder"
          />
        </div>

        <hr />

        {/* 기기 정보 */}
        <div className="detail-section row">
          <div className="device-info">
            <p className="section-label">
              크기 | {reservationDetailData?.type}
            </p>
            <p className="section-text">
              모델 | {reservationDetailData?.model}
            </p>
            <p className="section-text">고객 설치 사진</p>
          </div>

          <div className="device-image-container">
            <div className="device-image-box">
              <p className="image-box-label">작업 전</p>
              {images[0] ? (
                <img
                  src={images[0]}
                  alt="작업 전"
                  className="device-image-item"
                />
              ) : (
                <div className="placeholder">작업전</div>
              )}
            </div>

            <div className="device-image-box">
              <p className="image-box-label">작업 후</p>
              {images[1] ? (
                <img
                  src={images[1]}
                  alt="작업 후"
                  className="device-image-item"
                />
              ) : (
                <div className="placeholder">작업후</div>
              )}
            </div>
          </div>
        </div>

        <hr />

        {/* 작업 사진 */}
        <div className="detail-section">
          <p className="section-label">작업 사진</p>
          <div className="photo-buttons">
            <button className="photo-btn">📷 사진 촬영</button>
            <label className="photo-btn">
              ➕ 갤러리에서 추가
              <input
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={handleAddImage}
              />
            </label>
          </div>
        </div>

        <hr />

        {/* 작업 상태 버튼 */}
        <div className="button-area">
          {currentStatus === "예약됨" && (
            <button className="start-btn" onClick={handleStart}>
              작업 시작
            </button>
          )}

          {currentStatus === "작업 진행중" && (
            <>
              <p className="status-message">
                지금은 작업중입니다...!
              </p>

              <button
                className="complete-btn"
                onClick={handleComplete}
              >
                작업 완료
              </button>

              <button
                className="cancel-btn"
                onClick={openCancelModal}
              >
                작업 취소
              </button>
            </>
          )}

          {currentStatus === "작업 종료" && (
            <button className="complete-btn" disabled>
              작업 종료
            </button>
          )}
        </div>
      </div>

      {/* 작업 취소 모달 */}
      {showCancelModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">작업 취소 사유</h3>
              <button
                className="modal-close-btn"
                onClick={closeCancelModal}
              >
                ×
              </button>
            </div>

            <textarea
              className="modal-textarea"
              placeholder="기사님! 작업 취소 사유를 작성해주세요."
              value={cancelReason}
              onChange={(e) =>
                setCancelReason(e.target.value)
              }
            />

            <button
              className="modal-submit-btn"
              onClick={handleSaveCancelReason}
            >
              취소 사유 저장하기
            </button>
          </div>
        </div>
      )}

      {/* ✅ 작업 완료 모달 */}
      {showCompleteModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3 className="modal-title">작업 완료</h3>
            <p className="modal-desc">
              작업 완료 되었습니다.
            </p>
            <button
              className="modal-confirm-btn"
              onClick={handleConfirmComplete}
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationDetailPage;
