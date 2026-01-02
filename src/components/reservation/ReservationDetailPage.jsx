// ReservationDetailPage.jsx
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import "./ReservationDetailPage.css";

const ReservationDetailPage = () => {
  const { id } = useParams();
  const reservation = reservationsDummy.find((item) => item.id === Number(id));
  const mapRef = useRef(null);
  const [images, setImages] = useState([]); // 이미지 상태

  useEffect(() => {
    if (!reservation) return;

    const waitForKakao = () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        setTimeout(waitForKakao, 100);
      }
    };

    const initMap = () => {
      const mapContainer = mapRef.current;
      const mapOption = {
        center: new window.kakao.maps.LatLng(35.8714, 128.6014),
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(reservation.address, (result, status) => {
        console.log("주소:", reservation.address, "결과:", result, "상태:", status);
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
          new window.kakao.maps.Marker({ position: coords, map });
          map.setCenter(coords);
        } else {
          console.error("주소 변환 실패, fallback 대구 시청 중심:", reservation.address);
          map.setCenter(new window.kakao.maps.LatLng(35.8714, 128.6014));
        }
      });
    };

    waitForKakao();
  }, [reservation]);

  if (!reservation) {
    return <div className="reservation-detail-page">예약 정보를 찾을 수 없습니다.</div>;
  }

  // 이미지 추가 이벤트
  const handleAddImage = (event) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).slice(0, 2 - images.length); // 최대 2개 제한
    if (newImages.length === 0) return;

    const newImageUrls = newImages.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImageUrls]);
  };

  return (
    <div className="reservation-detail-page">
      <div className="detail-card">
        {/* 날짜 / 시간 */}
        <div className="detail-date">
          <p className="date-text">{reservation.date}</p>
          <p className="time-text">{reservation.time}</p>
        </div>

        {/* 고객 정보 */}
        <div className="detail-section">
          <h3 className="section-title">{reservation.name} 고객님</h3>
          <p className="section-text phone">📞 {reservation.phone}</p>
        </div>

        <hr />

        {/* 주소 & 지도 */}
        <div className="detail-section">
          <p className="section-label">주소</p>
          <p className="section-text">{reservation.address}</p>
          <div
            ref={mapRef}
            className="map-placeholder"
            style={{ width: "100%", height: "300px" }}
          ></div>
        </div>

        <hr />

        {/* 기기 정보 */}
        <div className="detail-section row">
          <div className="device-info">
            <p className="section-label">크기 | {reservation.type}</p>
            <p className="section-text">모델 | {reservation.model}</p>
            <p className="section-text">고객 설치 사진</p>
          </div>

          {/* 이미지 영역: 작업 전 / 작업 후 */}
          <div className="device-image-container">
            {/* 작업 전 */}
            <div className="device-image-box">
              <p className="image-box-label">작업 전</p>
              {images[0] ? (
                <img src={images[0]} alt="작업 전 이미지" className="device-image-item" />
              ) : (
                <div className="placeholder">작업전</div>
              )}
            </div>

            {/* 작업 후 */}
            <div className="device-image-box">
              <p className="image-box-label">작업 후</p>
              {images[1] ? (
                <img src={images[1]} alt="작업 후 이미지" className="device-image-item" />
              ) : (
                <div className="placeholder">작업후</div>
              )}
            </div>
          </div>
        </div>

        <hr />

        {/* 작업 사진 버튼 */}
        <div className="detail-section">
          <p className="section-label">작업 사진</p>
          <div className="photo-buttons">
            <button className="photo-btn">📷 사진 촬영</button>

            {/* 숨겨진 input */}
            <label className="photo-btn" style={{ cursor: "pointer" }}>
              ➕ 갤러리에서 추가
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleAddImage}
              />
            </label>
          </div>
        </div>

        <hr />

        {/* 고객 요청사항 */}
        <div className="detail-section row space-between">
          <p className="section-label">고객 요청사항 여부</p>
          <div className="request-badge">있음</div>
        </div>
      </div>

      {/* 작업 시작 버튼 */}
      <button className="start-btn">
        {reservation.status === "작업 진행중" ? "작업 계속" : "작업 시작"}
      </button>
    </div>
  );
};

export default ReservationDetailPage;
