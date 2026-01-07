import React, { useState, useEffect } from "react";
import "./TopButton.css";

const TopButton = () => {
  const [isAtFooter, setIsAtFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = document.documentElement.clientHeight;
      
      // 푸터 높이 (본인의 푸터 높이에 맞춰 조절하세요)
      const footerHeight = 250; 
      // 바닥까지 남은 거리 계산
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

      // 움찔거림 방지: 단순하게 "푸터 영역인가 아닌가"만 판단
      if (distanceFromBottom < footerHeight) {
        setIsAtFooter(true);
      } else {
        setIsAtFooter(false);
      }
    };

    // 성능 최적화: requestAnimationFrame을 사용하면 떨림 현상이 줄어듭니다.
    let requestRunning = false;
    const scrollListener = () => {
      if (!requestRunning) {
        window.requestAnimationFrame(() => {
          handleScroll();
          requestRunning = false;
        });
        requestRunning = true;
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`top-button ${isAtFooter ? "at-footer" : ""}`}
      onClick={scrollToTop}
    >
      <img src="/icons/topbutton.png" alt="Top" />
    </button>
  );
};

export default TopButton;