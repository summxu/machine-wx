<!--
 * @Author: Xuxu
 * @Date: 2020-09-11 19:20:36
 * @LastEditTime: 2021-04-06 15:10:31
 * @Msg: Nothing
-->
<template>
  <div class="person bottom-space">
    <section class="user-info">
      <div class="info">
        <div class="info-text-box">
          <p class="name">{{ userInfo.userinfo.name }}</p>
        </div>
      </div>
    </section>
    <CellGroup v-if="userInfo.userinfo.roleId !== '11'">
      <Cell is-link to="user" title="推送用户管理" />
      <!-- <Cell
          is-link
          to="index"
          title="推送内容列表"
          value="内容"
          label="描述信息"
        /> -->
    </CellGroup>
    <div style="padding: 35px 15px">
      <Button round type="warning " block @click="logOut">退出登录</Button>
    </div>
  </div>
</template>

<script>
import { Button, Cell, CellGroup } from "vant";
import { mapActions, mapState } from 'vuex';
export default {
  name: "Person",
  components: { Button, Cell, CellGroup },
  data () {
    return {
      kaitong: '',
      weikaitong: '',
      messageCount: 0
    };
  },
  created () {
    this.getPersonInfo()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(["getPersonInfo", "logOut"]),
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
