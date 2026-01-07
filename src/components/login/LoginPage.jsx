import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
  const handleKakaoLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/kakao/authorize/engineer";
  };

  return (
    <div className="page-wrapper login-page">
      <div className="login-container">
        <header className="login-header">
          <div className="brand-logo">
            <span className="logo-dot"></span>
            <h1 className="brand-name">Pro <span className="name-highlight">Connect</span></h1>
          </div>
          <div className="login-intro">
            <h2 className="main-title">기사님의 방문을 환영합니다!</h2>
            <p className="sub-title">서비스 이용을 위해 로그인이 필요합니다.</p>
          </div>
        </header>

        <div className="login-content">
          <button className="kakao-login-btn" onClick={handleKakaoLogin}>
            <img src="/icons/kakao.png" alt="카카오" className="kakao-icon" />
            <span>카카오로 시작하기</span>
          </button>
        </div>

        <footer className="login-footer-info">
          <p>© 2026 Pro Connect. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;