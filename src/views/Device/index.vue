<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-02 17:07:07
 * @Msg: Nothing
-->
<template>
  <div class="device center-padding15 bottom-space">
    <ActionSheet
      v-model="actionShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="actionShow = false"
    />
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
          <router-link
            :to="{ name: 'deviceParamsDetail', params: { id: item.id } }"
            class="card-bottom-text"
            >设置参数</router-link
          >
          <router-link
            :to="{ name: 'devicedetail', params: { id: item.id } }"
            class="card-bottom-text"
            >查看状态</router-link
          >
        </div>
      </div>
    </DataList>
    <Button round type="info" block @click="actionShow = true">绑定设备</Button>
  </div>
</template>

<script>
import { devicePage } from "@/axios/api";
import { Tag, Button, ActionSheet } from "vant";
import DataList from "@/components/DataList";
export default {
  name: "Device",
  components: { Tag, DataList, Button, ActionSheet },
  data () {
    return {
      devicePage,
      actionShow: false,
      actions: [{
        type: 1,
        name: '手动录入'
      }, {
        type: 2,
        name: '扫描二维码'
      }],
      examList: []
    };
  },
  methods: {
    onSelect (item) {
      if (item.type === 1) {
        this.toDetail()
      } else {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // 回调
            console.log(res)
          },
          error: function (res) {
            console.log(res)
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        });
      }
    },
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
