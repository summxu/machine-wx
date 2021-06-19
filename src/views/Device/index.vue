<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-02 17:07:07
 * @Msg: Nothing
-->
<template>
  <div class="device center-padding15 bottom-space">
    <!-- 录入设备弹窗 -->
    <ActionSheet
      v-model="actionShow"
      :actions="actions"
      cancel-text="取消"
      close-on-click-action
      @select="onSelect"
      @cancel="actionShow = false"
    />
    <!-- 发送指令弹窗 -->
    <ActionSheet
      v-model="instructActionShow"
      :actions="instructActions"
      cancel-text="取消"
      close-on-click-action
      @select="sendInstruct"
      @cancel="instructActionShow = false"
    />
    <DataList @setData="examList = $event" :request="devicePage">
      <div class="card margin-bottom10" v-for="item in examList" :key="item.id">
        <p class="device-item">设备ID：{{ item.clientid }}</p>
        <p class="device-item">设备名称：{{ item.name }}</p>
        <p class="device-item">通道名称：{{ item.channelName }}</p>
        <p class="device-item">MAC地址：{{ item.mac }}</p>
        <p class="device-item">
          设备状态：
          <Tag v-if="item.status === 1" type="success"> 在线</Tag>
          <Tag v-if="item.status === 0" type="danger"> 离线</Tag>
        </p>
        <div class="card-bottom">
          <span
            v-if="item.status === 1"
            @click="
              tempItem = item;
              instructActionShow = true;
            "
            class="card-bottom-text"
            style="color: #ee0a24"
            >发送指令</span
          >
          <router-link
            :to="{ name: 'deviceParamsDetail', params: { id: item.id } }"
            class="card-bottom-text"
            style="color: #07c160"
            >设置参数</router-link
          >
          <router-link
            :to="{ name: 'devicedetail', params: { id: item.id } }"
            class="card-bottom-text"
            >设备详情</router-link
          >
        </div>
      </div>
    </DataList>
    <Button round type="info" block size="small" @click="actionShow = true">绑定设备</Button>
  </div>
</template>

<script>
import { devicePage, instructList, mqttSend } from "@/axios/api";
import { Tag, Button, ActionSheet, Toast } from "vant";
import DataList from "@/components/DataList";
export default {
  name: "Device",
  components: { Tag, DataList, Button, ActionSheet },
  data () {
    return {
      devicePage,
      tempItem: {},
      instructActionShow: false,
      actionShow: false,
      instructActions: [],
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
  created () {
    this.getInstructList()
  },
  methods: {
    // 获取指令合集
    async getInstructList () {
      try {
        const { data } = await instructList({ type: 1 })
        this.instructActions = data.map(item => ({ ...item, name: item.codeString }))
      } catch (error) {
        console.log(error)
      }
    },
    // 发送指令
    async sendInstruct (item) {
      try {
        await mqttSend({ code: item.code, topic: this.tempItem.clientid })
        Toast.success('发送指令成功！')
      } catch (error) {
        console.log(error)
      }
    },
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
