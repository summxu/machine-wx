<!--
 * @Author: Xuxu
 * @Date: 2020-09-11 19:20:36
 * @LastEditTime: 2021-03-29 17:27:31
 * @Msg: Nothing
-->
<template>
  <div class="person bottom-space">
    <section class="user-info">
      <div class="info">
        <img
          v-if="userInfo.userinfo.headImg"
          class="header-img"
          :src="userInfo.userinfo.headImg"
          alt="headerImg"
        />
        <img
          v-else
          class="header-img"
          :src="require('@/assets/beifen6@2x.png')"
          alt="headerImg"
        />
        <div class="info-text-box">
          <p class="name">{{ userInfo.userinfo.username }}</p>
        </div>
      </div>
    </section>
    <section class="grid">
      <CellGroup>
        <Cell is-link to="index" title="推送用户管理" value="内容" />
        <Cell is-link to="index" title="推送内容列表" value="内容" label="描述信息" />
      </CellGroup>
    </section>
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
    ...mapActions(["getPersonInfo"]),
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
