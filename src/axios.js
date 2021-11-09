import axios from "axios";

const instance = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3",
});
export default instance;
