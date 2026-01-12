// src/utils/dateUtils.js 
// 한국 시간 기준 데이트유틸즈 정리하여 모아둔 곳입니다. 컴포넌트에서 불러와 사용하시면 됩니다.


/**
 * 한국 시간 기준으로 날짜를 YYYY.MM.DD.(요일) 형식으로 반환
 * @param {Date} date - Date 객체, 생략하면 오늘 날짜 사용
 * @returns {string} - 예: 2026.01.01.(목)
 */
export const formatKoreanFullDate = (date = new Date()) => {
  const koreaTime = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getDate()).padStart(2, "0");

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[koreaTime.getDay()];

  return `${year}.${month}.${day}.(${weekday})`;
};



/**
 * 한국 시간 기준으로 날짜를 MM월 DD일 요일 형식으로 반환
 * @param {Date} date - Date 객체, 생략하면 오늘 날짜 사용
 * @returns {string} - 예: 01월 01일 목요일
 */
export const formatKoreanShortDate = (date = new Date()) => {
  const koreaTime = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const month = String(koreaTime.getMonth() + 1).padStart(2, "0");
  const day = String(koreaTime.getDate()).padStart(2, "0");

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  const weekday = weekdays[koreaTime.getDay()];

  return `${month}월 ${day}일 ${weekday}요일`;
};