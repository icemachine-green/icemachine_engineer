import axios from "./axiosInstance.js";

export async function saveSubscription(subscription) {
  return axios.post("/api/subscriptions", subscription);
}
