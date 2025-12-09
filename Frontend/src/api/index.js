import axios from "./axios";

// NOTE: backend uses ApiResponse { success, message, data }
// we'll extract data when present

const extract = (resp) => {
  // If backend uses ApiResponse wrapper
  if (resp && resp.data && typeof resp.data === "object" && ("success" in resp.data || "message" in resp.data)) {
    return resp.data;
  }
  // fallback - raw
  return { success: true, data: resp.data };
};

export const auth = {
  signup: async (payload) => {
    const res = await axios.post("/auth/signup", payload);
    return extract(res);
  },
  signin: async (payload) => {
    const res = await axios.post("/auth/signin", payload);
    return extract(res);
  },
  verifyEmail: async (email) => {
    const res = await axios.post("/auth/verify-email", { email });
    return extract(res);
  },
  resetPassword: async (email, newPassword) => {
    const res = await axios.post("/auth/reset-password", { email, newPassword });
    return extract(res);
  },
};

export const parking = {
  searchByCity: async (city) => {
    const res = await axios.get("/parking/search", { params: { city } });
    return extract(res);
  },
  getCities: async () => {
    const res = await axios.get("/cities");
    return extract(res);
  },
  getCitiesWithAddress: async () => {
    const res = await axios.get("/cities-with-address");
    return extract(res);
  },
  addSlot: async (slot) => {
    const res = await axios.post("/parking/add", slot);
    return extract(res);
  },
  book: async (bookingDto) => {
    const res = await axios.post("/parking/book", bookingDto);
    return extract(res);
  },
};

export const misc = {
  home: async () => {
    const res = await axios.get("/home");
    return extract(res);
  },
  about: async () => {
    const res = await axios.get("/about");
    return extract(res);
  },
};

export default { auth, parking, misc };
