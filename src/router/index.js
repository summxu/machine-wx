/*
 * @Author: Xuxu
 * @Date: 2020-09-10 08:57:16
 * @LastEditTime: 2021-12-25 09:52:04
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
    path: "/workorderDetail/:id",
    name: "workorderDetail",
    component: () => import("@/views/WorkOrder/WorkOrderDetail"),
    meta: {
      title: '工单详情'
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
    path: "/user",
    name: "user",
    component: () => import("@/views/User"),
    meta: {
      title: '推送用户'
    }
  },
  {
    path: "/scan",
    name: "scan",
    component: () => import("@/views/Scan"),
    meta: {
      title: '扫码开门'
    }
  },
  {
    path: "/userdetail/:id",
    name: "userdetail",
    component: () => import("@/views/User/UserDetail"),
    meta: {
      title: '推送用户管理'
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
    path: "/deviceParamsDetail/:id",
    name: "deviceParamsDetail",
    component: () => import("@/views/Device/DeviceParamsDetail"),
    meta: {
      title: '设备参数设置'
    }
  },
  {
    path: "/devicedetail/:id",
    name: "devicedetail",
    component: () => import("@/views/Device/DeviceDetail"),
    meta: {
      title: '设备状态设置'
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
