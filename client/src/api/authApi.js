import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const authApi = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/login`, formData);
    return response?.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const registerApi = async (formData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/auth/register`,
      formData
    );
    return response?.data;
  } catch (error) {
    return { success: false, message: error.response.data.message };
  }
};

export const getUserApi = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/auth/getUser`);
    return response?.data;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const logoutUserApi = async () => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/auth/logout`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
