<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 08:57:16
 * @LastEditTime: 2021-03-28 10:46:27
 * @Msg: Nothing
-->
<template>
  <div id="app">
    <router-view />
    <!-- <Tabbar
      v-show="tabShow"
      active-color="var(--ion-color-primary)"
      inactive-color="var(--ion-color-dim)"
      route
    >
      <TabbarItem to="/" replace :icon="tabBarImg('Home')">工单</TabbarItem>
      <TabbarItem to="/exam" replace :icon="tabBarImg('exam')">设备</TabbarItem>
      <TabbarItem to="/person" replace :icon="tabBarImg('person')"
        >我的</TabbarItem
      >
    </Tabbar> -->
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
  name: "App",
  components: { Tabbar, TabbarItem },
  data () {
    return {
      tabShow: true
    };
  },
  methods: {},
  watch: {
    /**
     * 哪个路由下显示tabbar
     */
    $route () {
      switch (this.$route.name) {
        case "Home":
        case "exam":
        case "person":
          this.tabShow = true;
          break;
        default:
          this.tabShow = false;
          break;
      }
    }
  }
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
