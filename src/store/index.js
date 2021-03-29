/*
 * @Author: Xuxu
 * @Date: 2020-09-10 08:57:16
 * @LastEditTime: 2021-03-28 14:23:46
 * @Msg: Nothing
 */
import { person } from "@/axios/api";
import router from "@/router";
import { Toast } from "vant";
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  mutations: {
    USER_INFO (state, { userInfo }) {
      // 7.1 把外界传来的userInfo保存到state中的userInfo
      state.userInfo = {
        ...state.userInfo,
        ...userInfo
      };
      // 7.2 保存到本地缓存中
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    INIT_INFO (state, { userInfo }) {
      // 7.1 把外界传来的userInfo保存到state中的userInfo
      state.userInfo = userInfo;
    },
    LOG_OUT (state) {
      state.userInfo = {};
      localStorage.clear();
      router.replace("/login");
    }
  },
  getters: {
    getterUserInfo ({ userInfo }) {
      return userInfo;
    }
  },
  actions: {
    syncUserInfo ({ commit }, userInfo) {
      commit("USER_INFO", { userInfo });
    },
    initUserInfo ({ commit }, userInfo) {
      commit("INIT_INFO", { userInfo });
    },
    logOut ({ commit }) {
      commit("LOG_OUT");
    },
    async getPersonInfo ({ commit }) {
      try {
        let { data } = await person()
        let payLoad = { userinfo: data }
        if (!payLoad.userinfo.status) {
          commit("LOG_OUT");
          Toast('用户被封禁，请联系管理员')
        } else {
          commit('USER_INFO', { userInfo: payLoad })
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {}
});
