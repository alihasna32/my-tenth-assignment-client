import axios from "axios";
import { use, useEffect } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const instance = axios.create({
  baseURL: "https://freelance-market-place-flax.vercel.app",
});
const UseAxiosSecure = () => {
  const { user, signOutUser } = use(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptors = instance.interceptors.request.use((config) => {
      const token = user.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    const responseInterceptors = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        const status = err.status;
        if (status === 401 || status === 403) {
          signOutUser().then(() => {
            navigate("/registration");
          });
        }
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptors);
      instance.interceptors.response.eject(responseInterceptors);
    };
  }, [user, instance, signOutUser, navigate]);
  return instance;
};
export default UseAxiosSecure;
