<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-02 14:44:23
 * @Msg: Nothing
-->
<template>
  <div class="device-params-detail">
    <CellGroup title="基本配置">
      <Field
        v-model="formData.params.open"
        label="开闸时间"
        placeholder="请输入开闸时间"
        type="digit"
      >
        <template #right-icon>秒</template>
      </Field>
      <Field
        v-model="formData.params.close"
        label="关闸时间"
        placeholder="请输入关闸时间"
        type="digit"
      >
        <template #right-icon>秒</template>
      </Field>
    </CellGroup>
    <CellGroup title="高级配置">
      <Field
        v-model="formData.params.open1"
        label="开闸时间"
        placeholder="请输入开闸时间"
        type="digit"
      >
        <template #right-icon>秒</template>
      </Field>
      <Field
        v-model="formData.params.close1"
        label="关闸时间"
        placeholder="请输入关闸时间"
        type="digit"
      >
        <template #right-icon>秒</template>
      </Field>
    </CellGroup>
    <div class="center-padding15">
      <Button round type="info" size="small" block @click="save">保存</Button>
    </div>
  </div>
</template>

<script>
import { deviceInfo, deviceUpdate } from "@/axios/api";
import { CellGroup, Field, Button, Cell } from "vant";
export default {
  name: "DeviceParamsDetail",
  components: { Field, CellGroup, Button, Cell },
  created () {
    this.getData()
  },
  data () {
    return {
      formData: {
        params: {}
      },
    };
  },
  methods: {
    async getData () {
      const id = this.$route.params.id
      if (!id) return
      try {
        const { data } = await deviceInfo({ id })
        this.formData = data
        if (data.params) {
          this.formData.params = JSON.parse(data.params)
        }else {
          this.formData.params = {}
        }
      } catch (error) {
        console.log(error)
      }
    },
    async save () {
      try {
        var { message } = await deviceUpdate({
          ...this.formData,
          params: JSON.stringify(this.formData.params)
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
