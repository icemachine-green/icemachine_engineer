import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { registerServiceWorkerAndSubscribe } from "../utils/push/subscribePush.js";

const EngineerLayout = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    // ✅ 기사 로그인 이후 1회만 Push 구독
    registerServiceWorkerAndSubscribe();
  }, [isAuthenticated, user]);

  return (
    <div className="engineer-layout">
      {/* 🔽 공통 헤더 (필요하면 나중에 추가) */}
      {/* <EngineerHeader /> */}

      <main>
        <Outlet />
      </main>

      {/* 🔽 공통 하단탭 (선택) */}
      {/* <EngineerBottomNav /> */}
    </div>
  );
};

export default EngineerLayout;
