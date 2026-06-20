// API configuration
export const API_BASE_URL = import.meta.env.PROD
  ? "https://e-minister-portal.vercel.app/api" // Your Vercel URL
  : "/api";

export default API_BASE_URL;
