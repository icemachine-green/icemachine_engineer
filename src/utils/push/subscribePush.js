import axios from "../../api/axiosInstance.js";

export async function registerServiceWorkerAndSubscribe() {
  try {
    if (!("serviceWorker" in navigator)) {
      console.warn("ServiceWorker 미지원 브라우저");
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      console.log("이미 Push 구독됨");
      return;
    }

    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    await axios.post("/api/subscriptions", subscription);

    console.log("Push 구독 완료");
  } catch (error) {
    console.error("Push 구독 실패", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}
