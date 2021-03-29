/*
 * @Author: Xuxu
 * @Date: 2020-09-09 12:51:00
 * @LastEditTime: 2021-03-28 10:37:44
 * @Msg: Nothing
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Switch } from "vant";
import vueMoment from "vue-moment";
import moment from "moment";

require('moment/locale/zh-cn')

Vue.config.productionTip = false;

Vue.use(vueMoment, { moment });
Vue.moment().locale()
Vue.use(Switch);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
