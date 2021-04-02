<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-01 22:26:02
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
      <Cell title="工单状态" :value="formData.status" />
      <Cell title="创建时间" :value="formData.createTime" />
    </CellGroup>
    <CellGroup title=" ">
      <Cell title="处理说明" :value="formData.remark" />
    </CellGroup>
    <div class="center-padding15">
      <Button type="info" block @click="save">提交</Button>
      <div class="height15" />
      <Button
        type="primary"
        v-if="
          formData.status === 3 &&
          ($store.getters.userInfo.id === formData.userId ||
            $store.getters.userInfo.id === 1)
        "
        block
        @click="save"
        >审核</Button
      >
    </div>
  </div>
</template>

<script>
import { workOrderInfo, workOrderUpdate } from "@/axios/api";
import { CellGroup, Field, Button, Cell } from "vant";
export default {
  name: "WorkOrderDetail",
  components: { Field, CellGroup, Button, Cell },
  created () {
    this.getData()
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
    async save () {
      try {
        var { message } = await workOrderUpdate({
          id,
          ...this.formData
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
