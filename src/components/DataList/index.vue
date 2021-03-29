<!--
 * @Auth: Chenxu
 * @Date: 2020-01-17 16:13:54
 * @LastEditTime: 2020-09-26 20:07:13
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
import { List ,Empty} from 'vant';
export default {
  name: 'Deal',
  components: { List,Empty },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      queryParams: {
        page_index: 1,
        page_size: 10
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
      const res = await this.request(tempParams)
      const data = res.data

      /* 页码为1 */
      if (tempParams.page_index === 1) {
        this.list = []
      }

      data.forEach(item => {
        this.list.push(item)
      })
      if (data.length < this.queryParams.page_size) {
        this.finished = true;
      }

      this.$emit('setData', this.list)
      // 加载状态结束
      this.loading = false;
      this.queryParams.page_index += 1
    }
  }
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>