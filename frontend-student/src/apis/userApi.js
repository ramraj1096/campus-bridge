import axios from "../config/axiosConfig";

export const register = async (req) => {
  try {
    console.log(req);
    const response = await axios.post("/api/users/register", req);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const login = async (req) => {
  try {
    const response = await axios.post("/api/users/login", req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

export const resetPassword = async (req) => {
  console.log(req);
  try {
    const response = await axios.post("/api/users/resetPassword", req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error;
  }
};

export const updateUser = async (req) => {
  try {
    const response = await axios.put("/api/users/update-user", req);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
