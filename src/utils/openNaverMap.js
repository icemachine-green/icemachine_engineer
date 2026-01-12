// TODO: 모바일 실기기로 네이버지도앱 연결 확인 필수

export const openNaverMap = ({ lat, lng, name }) => {
  const encodedName = encodeURIComponent(name || "목적지");

  // 네비게이션 전용 스킴
  const appUrl = `nmap://navigation?lat=${lat}&lng=${lng}&name=${encodedName}`;

  // 웹 fallback
  // const webUrl = `https://map.naver.com/p/search/${encodedName}`; // 고객이 매장명을 정확하게 입력하지 않을 경우 에러
  // const webUrl = `https://map.naver.com/p/directions/-/-/${lng},${lat}/-/car`; // 경유지로 찍힘(비추천)
  // const webUrl = `https://map.naver.com/p/directions/-/${lng},${lat}/-/car`; // 강제로 도착지 설정(불안정/언제 막힐지 모름)
  const webUrl = `https://map.naver.com/v5/?c=${lng},${lat},15,0,0,0`; // 네비없이 지도만 제공

  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  if (isMobile) {
    // 모바일에서는 반드시 location.href
    window.location.href = appUrl;

    // 앱 미설치 대비 fallback
    setTimeout(() => {
      window.location.href = webUrl;
    }, 800);
  } else {
    // PC → 검색 페이지 (네비 개념 없음)
    window.open(webUrl, "_blank");
  }
};
