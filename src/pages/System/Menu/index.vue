<template>
  <div>
    <el-button type="primary"
               @click="add">添加菜单</el-button>
    <m-list @edit='edit'></m-list>
    <m-info :info='info'
            ref="dialog"></m-info>
  </div>
</template>
<script>
import MList from "./mlist";
import MInfo from "./minfo";
export default {
  props: {},
  data() {
    return {
      info: {
        isAdd: false,
        isShow: false //弹框界面
      }
    };
  },
  created() {},
  methods: {
    add() {
      this.info.isAdd = this.info.isShow = true;
    },
    edit(val) {
      this.info.isAdd = false;
      this.info.isShow = true;
      //调用组件的方法
      this.$refs.dialog.setinfo(val);
    }
  },
  components: {
    MList,
    MInfo
  }
};
</script>
<style scoped>
</style>