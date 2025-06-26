import axios from "axios";
const url = "http://localhost:5000/api/books";

export const getAll = async () => {
  const response = await axios.get(url);
  //cia bus grazinamas masyvas objektu
  return response.data;
};

export const getOne = async (id) => {
  const response = await axios.get(url + "/" + id);
  //cia vienas objektas bus grazinamas
  return response.data;
}
