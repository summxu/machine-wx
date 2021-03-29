/*
 * @Author: Xuxu
 * @Date: 2020-09-10 08:57:16
 * @LastEditTime: 2021-03-28 14:15:14
 * @Msg: Nothing
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Toast } from "vant";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login"),
    meta: {
      title: '闸机管理系统'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  // 修改标题
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // chrome
  document.body.scrollTop = 0;
  // firefox
  document.documentElement.scrollTop = 0;
  // safari
  window.pageYOffset = 0;
  /* sync vuex from localstorage */
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  /* author check */
  // 排除分享名片路由
  if (!userInfo) {
    if (to.name !== "login") {
      router.replace("/login");
      Toast("登录信息失效,请重新登录");
    }
  } else {
    if (!store.getters.getterUserInfo) {
      store.dispatch("initUserInfo", userInfo);
    }
    // store.dispatch("getPersonInfo");
  }
  next();
});

export default router;
