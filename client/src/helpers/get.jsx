import api from "./axiosConfig.js";

export const getAllMechanics = async () => {
  const response = await api.get('/mechanics'); // The auth header is added automatically!
  return response.data;
};

// For Servicers
export const getAllServicers = async () => {
  const response = await api.get('/servicers'); // The auth header is added automatically!
  return response.data;
};