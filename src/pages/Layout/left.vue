import { mapState } from 'vuex';
<template>
    <el-menu class="el-menu-vertical-demo"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :default-active='$route.path'
             router
             :collapse='collapse'>
        <el-menu-item index='/index'>
            <i class="el-icon-house"></i>
            <span>后台首页</span>
        </el-menu-item>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>系统设置</span>
            </template>
            <el-menu-item index="/menu">菜单管理</el-menu-item>
            <el-menu-item index="/role">角色管理</el-menu-item>
            <el-menu-item index="/user">管理员管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商城管理</span>
            </template>
            <el-menu-item index="2-1">分类管理</el-menu-item>
            <el-menu-item index="2-2">会员管理</el-menu-item>
            <el-menu-item index="2-3">轮播管理</el-menu-item>
            <el-menu-item index="2-4">秒杀管理</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
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
  components: {}
};
</script>
<style scoped>
.el-menu-vertical-demo {
  border: none;
}
</style>