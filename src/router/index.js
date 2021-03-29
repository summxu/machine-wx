/*
 * @Author: Xuxu
 * @Date: 2020-09-10 08:57:16
 * @LastEditTime: 2021-03-29 16:10:16
 * @Msg: Nothing
 */
import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import { Toast } from "vant";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "workorder",
    component: () => import("@/views/WorkOrder"),
    meta: {
      title: '工单列表'
    }
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("@/views/Person"),
    meta: {
      title: '配置中心'
    }
  },
  {
    path: "/device",
    name: "device",
    component: () => import("@/views/Device"),
    meta: {
      title: '设备管理'
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login")
  },
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
