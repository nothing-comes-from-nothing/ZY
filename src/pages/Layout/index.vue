<template>
  <el-container class="page">
    <el-aside class="page-aside"
              :width="collapse?'64px':'200px'">
      <!-- Aside content -->
      <h2>小U商城后台</h2>
      <left/>
    </el-aside>
    <el-container class="page-container">
      <el-header class="page-header">
        <!-- Header content -->
        <top/>
      </el-header>
      <el-main class="page-main">
        <!-- Main content -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import left from "./left";
import top from "./top";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapState(["collapse"])
  },
  methods: {},
  components: {
    left,
    top
  }
};
</script>
<style scoped>
.page {
  display: flex;
  height: 100vh;
}
.page h2 {
  color: #fff;
  text-align: center;
  height: 60px;
  line-height: 60px;
  background: #666;
}
.page-aside {
  background: #444;
  height: 100%;
  overflow: hidden;
}
.page-container {
  height: 100%;
  background: #f7f7f7;
}
.page-header {
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1000;
}
</style>