import axios from "../config/axiosConfig";

export const sendOtp = async (req) => {
  try {
    const response = await axios.post("/api/otp/sendOtp", req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

export const verifyOtp = async (req) => {
  console.log(req);
  try {
    console.log(req);
    const response = await axios.post("/api/otp/verifyOtp", req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};
