import axios from "axios";

const instance = axios.create({
  // URL of the payment server (server/ folder); set VITE_PAYMENT_API_URL when deploying
  baseURL: import.meta.env.VITE_PAYMENT_API_URL || "http://localhost:3001",
});

export default instance;
