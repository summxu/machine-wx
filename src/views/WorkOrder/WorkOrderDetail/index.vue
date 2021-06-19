<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-02 16:10:25
 * @Msg: Nothing
-->
<template>
  <div class="work-order-detail">
    <CellGroup title=" ">
      <Cell title="工单号" :label="formData.orderNum" />
      <Cell title="对应设备" :value="formData.deviceName" />
      <Cell title="错误码" :value="formData.code" />
      <Cell title="错误说明" :value="formData.codeString" />
      <Cell title="处理人" :value="formData.maintainerName" />
      <Cell title="审核人" :value="formData.userName" />
      <Cell title="工单状态" :value="formData.status">
        <template #default>
          <Tag v-if="formData.status === 1" round type="warning">待处理</Tag>
          <Tag v-if="formData.status === 2" round type="primary ">正在处理</Tag>
          <Tag v-if="formData.status === 3" round type="warning">待审核</Tag>
          <Tag v-if="formData.status === 4" round type="success">处理完成</Tag>
          <Tag v-if="formData.status === 5" round type="danger ">失效</Tag>
        </template>
      </Cell>
      <Cell title="创建时间" :value="formData.createTime" />
    </CellGroup>
    <CellGroup title=" ">
      <Cell title="处理说明" :value="formData.remark" />
    </CellGroup>
    <div class="center-padding15">
      <Button
        v-if="
          formData.status === 1 &&
          (userInfo.userinfo.id === formData.maintainerId ||
            userInfo.userinfo.id === 1)
        "
        type="info"
        block
        round
        size="small"
        @click="save(3)"
        >修复</Button
      >
      <div class="height15" />
      <div
        v-if="
          formData.status === 3 &&
          (userInfo.userinfo.id === formData.userId ||
            userInfo.userinfo.id === 1)
        "
      >
        <Button round type="primary" size="small" block @click="save(4)">通过</Button>
        <div class="height15" />
        <Button round type="danger" size="small" block @click="save(1)">驳回</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { workOrderInfo, workOrderUpdate } from "@/axios/api";
import { CellGroup, Field, Button, Cell,Tag } from "vant";
import { mapState } from 'vuex';
export default {
  name: "WorkOrderDetail",
  components: { Field, CellGroup, Button, Cell,Tag },
  created () {
    this.getData()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  data () {
    return {
      formData: {},
    };
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      if (!id) return
      try {
        const { data } = await workOrderInfo({ id })
        this.formData = data
      } catch (error) {
        console.log(error)
      }
    },
    async save (status) {
      try {
        if (status === 3) {
          var remark = window.prompt("处理说明", "");
          if (!remark) return
        }
        var { message } = await workOrderUpdate({
          ...this.formData,
          remark,
          status
        })
        this.$toast.success(message)
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
