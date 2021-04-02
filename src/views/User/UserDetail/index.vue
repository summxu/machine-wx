<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-02 09:34:10
 * @Msg: Nothing
-->
<template>
  <div class="user-detail ">
    <Popup v-model="rolePicker" position="bottom">
      <Picker
        show-toolbar
        :columns="rolePickerColumns"
        @confirm="rolePickerOk"
        @cancel="rolePicker = false"
      />
    </Popup>
    <CellGroup title=" ">
      <Field
        v-model="formData.name"
        label="客户姓名"
        placeholder="请输入客户姓名"
      />
      <Field
        v-model="formData.username"
        label="登录账号"
        placeholder="中文加数字"
      />
      <Field
        v-model="formData.password"
        label="登录密码"
        placeholder="默认密码为123456"
        type="password"
      />
      <Field
        v-model="formData.phone"
        label="手机号"
        placeholder="请输入手机号"
        type="tel"
      />
      <Field v-model="formData.email" label="邮箱" placeholder="请输入邮箱" />
      <Field
        readonly
        clickable
        :value="
          getRoleNameByID(formData.roleIdList ? formData.roleIdList[0] : null)
        "
        label="部门"
        placeholder="点击选择部门"
        @click="rolePicker = true"
        is-link
      />
      <Field
        v-model="formData.remark"
        label="备注"
        rows="2"
        show-word-limit
        type="textarea"
        placeholder="请输入备注"
      />
    </CellGroup>
    <CellGroup title=" ">
      <Cell title="是否禁用">
        <template #right-icon>
          <van-switch
            v-model="formData.status"
            active-color="#ee0a24"
            :active-value="0"
            :inactive-value="1"
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
import { userInfo, userUpdate, userAdd, userDel, roleList } from "@/axios/api";
import { CellGroup, Field, Button, Cell, Popup, Picker } from "vant";
export default {
  name: "UserDetail",
  components: { Field, CellGroup, Button, Cell, Popup, Picker },
  created () {
    this.getData()
    this.getRoleList()
  },
  data () {
    return {
      formData: {},
      rolePickerColumns: [],
      rolePicker: false
    };
  },
  methods: {
    getRoleNameByID (id) {
      const obj = this.rolePickerColumns.find(item => item.id === id)
      if (obj) {
        return obj.text
      }
    },
    rolePickerOk (e) {
      this.formData.roleIdList = [e.id]
      this.rolePicker = false
    },
    async getRoleList () {
      try {
        const { data } = await roleList()
        this.rolePickerColumns = data.map(item => ({
          id: item.id,
          text: item.name
        }))
      } catch (error) {
        console.log(error)
      }
    },
    async del () {
      try {
        const { message } = await userDel({
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
        const { data } = await userInfo({ id })
        this.formData = data
      } catch (error) {
        console.log(error)
      }
    },
    async save () {
      const id = this.$route.params.id
      try {
        if (id) {
          var { message } = await userUpdate({
            id,
            ...this.formData
          })
        } else {
          var { message } = await userAdd(this.formData)
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
