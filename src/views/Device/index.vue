<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-03-29 22:17:59
 * @Msg: Nothing
-->
<template>
  <div class="device center-padding15 bottom-space">
    <DataList @setData="examList = $event" :request="devicePage">
      <div class="card margin-bottom10" v-for="item in examList" :key="item.id">
        <p class="device-item">设备名称：{{ item.name }}</p>
        <p class="device-item">通道名称：{{ item.channelName }}</p>
        <p class="device-item">MAC地址：{{ item.mac }}</p>
        <p class="device-item">
          设备状态：<Tag v-if="item.status === 1" type="success"> 在线</Tag>
          <Tag v-if="item.status === 2" type="danger"> 离线</Tag>
        </p>
        <div class="card-bottom">
          <div class="card-bottom-text">设置参数</div>
          <router-link
            :to="{ name: 'devicedetail', params: { id: item.id } }"
            class="card-bottom-text"
            >查看状态</router-link
          >
        </div>
      </div>
    </DataList>
    <Button type="info" block @click="toDetail">新增设备</Button>
  </div>
</template>

<script>
import { devicePage } from "@/axios/api";
import { Tag, Button } from "vant";
import DataList from "@/components/DataList";
export default {
  name: "Device",
  components: { Tag, DataList, Button },
  data () {
    return {
      devicePage,
      examList: []
    };
  },
  watch: {

  },
  methods: {
    toDetail () {
      this.$router.push({
        name: 'devicedetail'
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");

</style>
