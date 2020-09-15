import { mapState, mapMutations } from 'vuex';
<template>
  <div class="header">
    <div class="lt">
      <el-button type="primary"
                 size='small'
                 icon="el-icon-s-unfold"
                 v-if='!collapse'
                 @click="PACKUP">
      </el-button>
      <el-button icon="el-icon-s-fold"
                 size='small'
                 type="primary"
                 v-else
                 @click="PACKUP"></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right"
                     class="mbx">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button size="small"
                 icon="el-icon-back"
                 circle
                 v-if="$route.path!='/index' "
                 @click='$router.back()'></el-button>
    </div>
    <div class="rt">
      <el-dropdown>
        <span class="el-dropdown-link">
          admin，你好！
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-full-screen"></i> 全屏操作</el-dropdown-item>
          <el-dropdown-item>
            <i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["collapse"])
  },
  created() {},
  methods: {
    ...mapMutations(["PACKUP"])
  },
  components: {}
};
</script>
<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
}
.header .mbx {
  display: inline-block;
  margin: 0 20px;
}
</style>