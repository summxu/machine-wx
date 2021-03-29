/*
 * @Auth: Chenxu
 * @Date: 2019-12-26 13:07:13
 * @LastEditTime: 2021-03-28 14:27:11
 */
import axios from "axios";
import { Toast } from "vant";
import router from "@/router/index";
import store from "@/store";

const service = axios.create({
  baseURL: "/api",
  timeout: 50000
});

service.interceptors.request.use(
  config => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    /* 登陆状态 */
    config.headers["Content-Type"] = "application/json";
    if (userInfo) {
      config.headers["Authorization"] = userInfo.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code !== 1000) {
      Toast.fail(res.message);
      return Promise.reject(res.message || "Error");
    } else {
      return res;
    }
  },
  error => {
    switch (error.response.status) {
      case 401:
      case 412:
        Toast.fail("用户信息获取失败,请重新登录!");

        store.dispatch("logOut");
        router.push("/login");

        return Promise.reject(error);
      default:
        Toast.fail("服务器开小差了┭┮﹏┭┮");
        return Promise.reject(error);
    }
  }
);

export default service;
