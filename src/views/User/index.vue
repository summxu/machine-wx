<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-02 14:54:04
 * @Msg: Nothing
-->
<template>
  <div class="user center-padding15 ">
    <DataList @setData="examList = $event" :request="userPage">
      <div
        @click="toDetail(item.id)"
        class="card margin-bottom10"
        v-for="item in examList"
        :key="item.id"
      >
        <p class="user-item">客户姓名：{{ item.name }}</p>
        <p class="user-item">登录账号：{{ item.username }}</p>
        <p class="user-item">手机号：{{ item.phone }}</p>
        <p class="user-item">邮箱：{{ item.email }}</p>
        <p class="user-item">
          所在部门：
          <Tag color="#7232dd">{{ item.roleName }}</Tag>
        </p>
        <p class="user-item van-multi-ellipsis--l2">备注：{{ item.remark }}</p>
        <p class="user-item">
          状态：<Tag v-if="item.status" type="success">启用</Tag>
          <Tag v-else type="danger">封禁</Tag>
        </p>
      </div>
    </DataList>
    <Button round type="info" block @click="toDetail(false)">添加客户</Button>
  </div>
</template>

<script>
import { userPage } from "@/axios/api";
import { Tag, Button } from "vant";
import DataList from "@/components/DataList";
export default {
  name: "User",
  components: { Tag, DataList, Button },
  data () {
    return {
      userPage,
      examList: []
    };
  },
  watch: {

  },
  methods: {
    toDetail (id) {
      this.$router.push({
        name: 'userdetail',
        params: id ? { id } : null
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
