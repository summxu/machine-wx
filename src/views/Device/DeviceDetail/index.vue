<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-06 15:00:42
 * @Msg: Nothing
-->
<template>
  <div class="device-detail ">
    <Popup v-model="userPicker" position="bottom">
      <Picker
        show-toolbar
        :columns="userPickerColumns"
        @confirm="userPickerOk"
        @cancel="userPicker = false"
      />
    </Popup>
    <CellGroup title=" ">
      <Field
        v-model="formData.name"
        label="设备名称"
        placeholder="请输入设备名称"
      />
      <Field
        v-model="formData.channelName"
        label="通道名称"
        placeholder="请输入通道名称"
      />
      <Field
        v-model="formData.mac"
        label="MAC地址"
        placeholder="请输入MAC地址"
      />
      <Field
        readonly
        clickable
        :value="getUserNameByID(formData.maintainerId)"
        label="检修员"
        placeholder="点击选择检修员"
        is-link
        @click="userPicker = true"
      />
    </CellGroup>
    <CellGroup title=" ">
      <Cell title="设备状态">
        <template #right-icon>
          <van-switch
            v-model="formData.status"
            :active-value="1"
            :inactive-value="2"
            size="20"
          />
        </template>
      </Cell>
    </CellGroup>
    <div class="center-padding15">
      <Button round type="info" block @click="save">保存</Button>
      <div class="height15"></div>
      <Button round v-if="$route.params.id" type="danger" block @click="del"
        >删除</Button
      >
    </div>
  </div>
</template>

<script>
import { deviceInfo, deviceUpdate, deviceAdd, deviceDel, userList } from "@/axios/api";
import { CellGroup, Field, Button, Cell, Popup, Picker } from "vant";
export default {
  name: "DeviceDetail",
  components: { Field, CellGroup, Button, Cell, Popup, Picker },
  created () {
    this.getData()
    this.getUserList()
  },
  data () {
    return {
      formData: {},
      userPickerColumns: [],
      userPicker: false
    };
  },
  methods: {
    getUserNameByID (id) {
      const obj = this.userPickerColumns.find(item => item.id === id)
      if (obj) {
        return obj.text
      }
    },
    userPickerOk (e) {
      this.formData.maintainerId = e.id
      this.formData.maintainer = e.id
      this.userPicker = false
    },
    async getUserList () {
      try {
        const { data } = await userList()
        this.userPickerColumns = data.map(item => ({
          id: item.id,
          text: item.name
        }))
      } catch (error) {
        console.log(error)
      }
    },
    async del () {
      try {
        const { message } = await deviceDel({
          ids: `${this.$route.params.id}`
        })
        this.$toast.success(message)
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    },
    async getData () {
      const id = this.$route.params.id
      if (!id) return
      try {
        const { data } = await deviceInfo({ id })
        this.formData = data
      } catch (error) {
        console.log(error)
      }
    },
    async save () {
      const id = this.$route.params.id
      try {
        if (id) {
          var { message } = await deviceUpdate({
            id,
            ...this.formData
          })
        } else {
          var { message } = await deviceAdd(this.formData)
        }
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
