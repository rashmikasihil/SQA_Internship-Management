import axios from "axios";


const API_URL = "http://localhost:5000/api";

export const userService = {
  login: async (email, password) => {
    return await axios.post(`${API_URL}/users/login-intern`, { email, password });
  },
  loginAdmin: async (adminID, password) => {
    return await axios.post(`${API_URL}/users/login-admin`, { adminID, password });
  },

  registerIntern: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      console.log("Response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error from backend:", error.response?.data || error.message);
      throw error;
    }
  },
  AddNewCv: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/internships/cv/add`, formData);
      console.log("Response from backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error from backend:", error.response?.data || error.message);
      throw error;
    }
  }
  
};


