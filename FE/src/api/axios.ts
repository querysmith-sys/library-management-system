import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // your backend
  withCredentials: true, // VERY IMPORTANT
});

api.interceptors.response.use(
  (response) => response, // Return the response if it's successful
  async (error) => {
    const originalRequest = error.config; // Store the original request configuration
    console.log("Error config:", originalRequest); // Log the original request configuration for debugging
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to prevent infinite loops

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (err) {
        window.location.href = "/auth/login"; // Redirect to login page on refresh failure
      }
    }
    if (error.response?.status === 403) {
      window.location.href = "/forbidden";
    }
    return Promise.reject(error); // Reject the error if it's not a 401 or if the request has already been retried
  },
);

export default api;
