// ReservationDetailPage.jsx
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { reservationsDummy } from "../../data/reservationsDummy.js";
import "./ReservationDetailPage.css";

const ReservationDetailPage = () => {
  const { id } = useParams();
  const reservation = reservationsDummy.find(item => item.id === Number(id));
  const mapRef = useRef(null); // 지도 영역 ref

  useEffect(() => {
    if (!reservation) return;

    // SDK 준비될 때까지 대기
    const waitForKakao = () => {
      if (window.kakao && window.kakao.maps) {
        initMap();
      } else {
        setTimeout(waitForKakao, 100); // 0.1초마다 확인
      }
    };

    const initMap = () => {
      const mapContainer = mapRef.current;
      const mapOption = {
        center: new window.kakao.maps.LatLng(35.8714, 128.6014), // 대구 시청 기본
        level: 3,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);

      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(reservation.address, (result, status) => {
        // 🔹 콘솔 로그 추가
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
          <div className="device-image">이미지</div>
        </div>

        <hr />

        {/* 서비스 정보 */}
        <div className="detail-section">
          <p className="section-label">서비스 | {reservation.service}</p>
          <p className="section-text">예상 소요 시간 | {reservation.duration}</p>
        </div>

        <hr />

        {/* 작업 사진 */}
        <div className="detail-section">
          <p className="section-label">작업 사진</p>
          <div className="photo-buttons">
            <button className="photo-btn">📷 사진 촬영</button>
            <button className="photo-btn">➕ 갤러리에서 추가</button>
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







