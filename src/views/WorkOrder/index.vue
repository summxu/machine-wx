<!--
 * @Author: Xuxu
 * @Date: 2020-09-10 09:29:19
 * @LastEditTime: 2021-04-01 22:02:16
 * @Msg: Nothing
-->
<template>
  <div class="work-order bottom-space">
    <Tabs
      offset-top="10px"
      color="var(--ion-color-primary)"
      title-active-color="rgba(0, 0, 43, 1)"
      title-inactive-color="rgba(164, 157, 144, 1)"
      :line-width="35"
      swipeable
      v-model="active"
    >
      <Tab class="tabHeader" title="未处理">
        <div class="tab-content">
          <DataList
            :key="flush"
            :params="{ status: 1 }"
            @setData="dataList = $event"
            :request="workOrderPage"
          >
            <div
              @click="toDetail(item.id)"
              class="card margin-bottom10"
              v-for="item in dataList"
              :key="item.id"
            >
              <p class="work-order-item">设备名：{{ item.deviceName }}</p>
              <p class="work-order-item">
                错误码：<Tag color="#7232dd">{{ item.code }}</Tag>
              </p>
              <p class="work-order-item van-multi-ellipsis--l2">
                错误说明：{{ item.codeString }}
              </p>
              <p class="work-order-item">发生时间：{{ item.createTime }}</p>
            </div>
          </DataList>
        </div>
      </Tab>
      <Tab class="tabHeader" title="待审核">
        <div class="tab-content">
          <DataList
            :key="flush"
            @setData="dataList = $event"
            :params="{ status: 3 }"
            :request="workOrderPage"
          >
            <div
              @click="toDetail(item.id)"
              class="card margin-bottom10"
              v-for="item in dataList"
              :key="item.id"
            >
              <p class="work-order-item">设备名：{{ item.deviceName }}</p>
              <p class="work-order-item">
                错误码：<Tag color="#7232dd">{{ item.code }}</Tag>
              </p>
              <p class="work-order-item van-multi-ellipsis--l2">
                错误说明：{{ item.codeString }}
              </p>
              <p class="work-order-item">发生时间：{{ item.createTime }}</p>
            </div>
          </DataList>
        </div>
      </Tab>
      <Tab class="tabHeader" title="已完成">
        <div class="tab-content">
          <DataList
            :key="flush"
            @setData="dataList = $event"
            :params="{ status: 4 }"
            :request="workOrderPage"
          >
            <div
              @click="toDetail(item.id)"
              class="card margin-bottom10"
              v-for="item in dataList"
              :key="item.id"
            >
              <p class="work-order-item">设备名：{{ item.deviceName }}</p>
              <p class="work-order-item">
                错误码：<Tag color="#7232dd">{{ item.code }}</Tag>
              </p>
              <p class="work-order-item van-multi-ellipsis--l2">
                错误说明：{{ item.codeString }}
              </p>
              <p class="work-order-item">发生时间：{{ item.createTime }}</p>
            </div>
          </DataList>
        </div>
      </Tab>
    </Tabs>
  </div>
</template>

<script>
import { workOrderPage } from "@/axios/api";
import { Tab, Tabs, Tag } from "vant";
import DataList from "@/components/DataList";
export default {
  name: "WorkOrder",
  components: { Tab, Tabs, DataList, Tag },
  data () {
    return {
      workOrderPage,
      active: 0,
      flush: Math.random(),
      dataList: []
    };
  },
  watch: {
    active () {
      this.dataList = []
      this.flush = Math.random()
    }
  },
  methods: {
    toDetail (id) {
      this.$router.push({
        name: 'workorderDetail',
        params: { id }
      })
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
