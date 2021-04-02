<!--
 * @Auth: Chenxu
 * @Date: 2020-01-17 16:13:54
 * @LastEditTime: 2021-04-01 21:45:06
 -->
<template>
  <div class="cx-data-list">
    <List
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <slot></slot>
    </List>
    <Empty v-if="!list.length && !loading" description="暂无数据"></Empty>
  </div>
</template>

<script>
import { List, Empty } from 'vant';
export default {
  name: 'Deal',
  components: { List, Empty },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      queryParams: {
        page: 1,
        size: 10
      }
    };
  },
  props: {
    request: Function,
    params: Object
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      const tempParams = {
        ...this.queryParams,
        ...this.params
      }
      const { data } = await this.request(tempParams)

      /* 页码为1 */
      if (tempParams.page === 1) {
        this.list = []
      }

      data.list.forEach(item => {
        this.list.push(item)
      })
      if (data.list.length < this.queryParams.size) {
        this.finished = true;
      }

      this.$emit('setData', this.list)
      // 加载状态结束
      this.loading = false;
      this.queryParams.page += 1
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>