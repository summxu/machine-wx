<template>
  <div class="login">
    <div class="mask">
      <div class="top">
      <p class="welcome-title">闸机管理系统</p>
    </div>
    <div class="form">
      <div class="form-item">
        <p class="form-title">账号</p>
        <div class="form-input-box">
          <img
            class="form-img"
            :src="require('@/assets/denglu_shouji@2x.png')"
            alt="账号"
          />
          <input
            v-model="mobile"
            placeholder="请输入账号"
            class="form-input"
          />
        </div>
      </div>
      <div class="form-item">
        <p class="form-title">密码</p>
        <div class="form-input-box">
          <img
            class="form-img"
            :src="require('@/assets/denglu_yanzhengma@2x.png')"
            alt="密码"
          />
          <input
            v-model="verify"
            placeholder="请输入密码"
            class="form-input"
            type="password"
          />
        </div>
      </div>
      <Button round @click="loginFun" class="form-submit" type="info" block
        >登录</Button
      >
    </div>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from "vant";
import { mapActions } from "vuex";
import { login } from "@/axios/api";
export default {
  name: "Login",
  components: { Button },
  data () {
    return {
      mobile: "",
      verify: "",
      smsObj: {
        label: "获取验证码",
        disable: true
      }
    };
  },
  created () { },
  mounted () { },
  watch: {},
  beforeDestroy () {
    // 暂时不需要这么做
  },
  methods: {
    ...mapActions(["syncUserInfo", "getPersonInfo"]),
    /**
     * 表单验证
     */
    verifyCheck (isLogin) {
      if (!this.mobile) {
        Toast("请输入账号！");
        return false;
      }
      if (isLogin) {
        if (!this.verify) {
          Toast("请输入验证码！");
          return false;
        }
      }
      return true;
    },
    async loginFun () {
      if (!this.verifyCheck(true)) return;
      try {
        const params = {
          username: this.mobile,
          password: this.verify
        };
        const { data } = await login(params);
        await this.syncUserInfo(data);
        this.getPersonInfo()
        this.toHome();
      } catch (error) {
        console.log(error);
      }
    },
    toHome () {
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
