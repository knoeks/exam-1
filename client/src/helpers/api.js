// src/helpers/api.js
import api from './axiosConfig'; // Your configured axios instance

// ... other functions like getAllMechanics ...

export const createMechanic = async (mechanicData) => {
    const response = await api.post('/mechanics', mechanicData);
    return response.data;
};