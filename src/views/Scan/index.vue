<template>
  <div class="scan">
    <CellGroup title=" ">
      <Field v-model="formData.name" label="设备名称" />
      <Field v-model="formData.channelName" label="通道名称" />
      <Field v-model="formData.mac" label="MAC地址" />
    </CellGroup>
    <div @click="sendInstruct" class="big-blue-button">开门</div>
  </div>
</template>

<script>
import { deviceInfo, mqttSend } from '@/axios/api'
import { CellGroup, Field, Toast } from 'vant'
export default {
  name: 'Scan',
  components: { Field, CellGroup },
  data() {
    return {
      formData: {}
    }
  },
  created() {
    this.getData()
  },
  computed: {},
  methods: {
    async getData() {
      console.log(this.$route)
      const id = this.$route.query.id
      if (!id) return
      try {
        const { data } = await deviceInfo({ id })
        this.formData = data
      } catch (error) {
        console.log(error)
      }
    },
    // 发送指令
    async sendInstruct() {
      try {
        await mqttSend({ code: '0xa0', topic: this.$route.query.id })
        await mqttSend({ code: '0xa1', topic: this.$route.query.id })
        Toast.success('开门成功！')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
