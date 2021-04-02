<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 08:57:16
 * @LastEditTime: 2021-04-02 14:45:54
 * @Msg: Nothing
-->
<template>
  <div id="app">
    <router-view />
    <Tabbar route v-show="show">
      <TabbarItem replace to="/" icon="wap-nav">工单</TabbarItem>
      <TabbarItem replace to="/device" icon="cluster">设备</TabbarItem>
      <!-- <TabbarItem replace to="/setting" icon="setting">配置</TabbarItem> -->
      <TabbarItem replace to="/user" icon="friends">客户</TabbarItem>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "App",
  components: { Tabbar, TabbarItem },
  data () {
    return {
      show: true
    };
  },
  methods: {},
  watch: {
    $route ({ name }) {
      switch (name) {
        case "workorder":
        case "device":
        case "setting":
        case "user":
          this.show = true;
          break;
        default:
          this.show = false;
          break;
      }
    }
  },
};
</script>
<style lang="less">
@import url("./utils/normalize.css");
@import url("./utils/variables.css");
@import url("./utils/base.less");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--ion-text-color); // 基本字体颜色
  background-color: var(--ion-background-color);
}
</style>
