import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://freelance-market-place-flax.vercel.app",
});
const UseAxios = () => {
  return axiosInstance;
};
export default UseAxios;
