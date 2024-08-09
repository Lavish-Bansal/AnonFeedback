import axios from "axios";

axios.defaults.withCredentials = true;
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getUserApi = async (userId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/V1/message/getUser/${userId}`
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const sendMessageApi = async (userId, content) => {
  console.log(userId);
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/message/send/${userId}`,
      { content }
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const getUserMessagesApi = async (userId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/v1/message/getMessages/${userId}`
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const deleteUserMessagesApi = async (messageId) => {
  try {
    const response = await axios.delete(
      `${baseUrl}/api/v1/message/deleteMessage/${messageId}`
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const acceptMessageApi = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/message/acceptMessage`
    );
    return response?.data;
  } catch (error) {
    return error.response?.data;
  }
};
