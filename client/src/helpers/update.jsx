import axios from "axios";
const url = "http://localhost:5000/api/books";

export const updateOne = async (id, data) => {
  console.log(data);
  const response = await axios.put(url + "/" + id, data);
  return response.data;
}