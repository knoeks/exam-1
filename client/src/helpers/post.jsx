import axios from "axios";
const url = "http://localhost:5000/api/mechanic"

export const postData = async (data) => {
  let response = await axios.post(url, data)
  return response.data;
}