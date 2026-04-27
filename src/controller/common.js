import axios from "axios";
import Cookies from "universal-cookie";
// export const BaseUrl = `https://pickyourslot.com:8080`;
// export const ImageUrl = `https://pickyourslot.com:8080`;
// export const signIn = `https://pickyourslot.com:3001`;

export const BaseUrl = process.env.NEXT_PUBLIC_BASEURL || "https://pickyourslot.com:8080";
export const ImageUrl = process.env.NEXT_PUBLIC_IMAGEURL || "https://pickyourslot.com:8080";
export const signIn = process.env.NEXT_PUBLIC_SIGNIN || "https://pickyourslot.com:3001";

export const instance = axios.create({
  baseURL: BaseUrl,
});

const cookie = new Cookies();

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response;
    switch (status.status) {
      case 401:
        cookie.remove("user");
        cookie.remove("token");
        setToken("");
        window.location = "/sessionExpired";
        throw error;
      case 500:
        throw error;
      default:
        throw error;
    }
  }
);

export const setToken = (token, vendorId) => {
  instance.defaults.headers["x-auth-token"] = token;
  instance.defaults.headers.vendorId = vendorId;
};
