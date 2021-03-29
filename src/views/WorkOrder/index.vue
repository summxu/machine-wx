<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-03-29 15:19:22
 * @Msg: Nothing
-->
<template>
  <div class="exam-my">
    <section>
      <Tabs
        color="var(--ion-color-primary)"
        title-active-color="rgba(0, 0, 43, 1)"
        title-inactive-color="rgba(164, 157, 144, 1)"
        :line-width="35"
        swipeable
        v-model="active"
      >
        <Tab class="tabHeader" title="未处理">
          <div class="tab-content">
            <DataList :key="flush" @setData="setData" :request="userExam">
              <div>asdasdasd</div>
            </DataList>
          </div>
        </Tab>
        <Tab class="tabHeader" title="已处理">
          <div class="tab-content">
            <DataList
              :key="flush"
              @setData="setData"
              :params="{ status: 0 }"
              :request="userExam"
            >
              <div>asdasdasd</div>
            </DataList>
          </div>
        </Tab>
      </Tabs>
    </section>
  </div>
</template>

<script>
import { userExam } from "@/axios/api";
import { Tab, Tabs, Empty } from "vant";
import DataList from "@/components/DataList";
export default {
  name: "ExamMy",
  components: { Tab, Tabs, DataList, Empty },
  data () {
    return {
      userExam,
      active: 0,
      flush: Math.random(),
      examList: []
    };
  },
  watch: {
    active (val) {
      this.examList = []
      this.flush = Math.random()
    }
  },
  methods: {
    setData (data) {
      this.examList = data
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
