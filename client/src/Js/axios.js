import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.rawg.io/api`,
});

export default instance