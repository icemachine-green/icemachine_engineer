import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        <img
          src="/icons/logo.png"
          alt="Clean Service Logo"
          className="footer-image"
        />
        <p className="footer-copyright">
          © 2026 싹싹제빙기 Clean Service. All rights reserved.
        </p>
      </div>
    </footer>
  );
}