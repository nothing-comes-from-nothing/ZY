<template>
  <el-table :data="menulist"
            style="width: 100%"
            row-key="id"
            :tree-props="{children: 'children'}"
            border>
    <el-table-column prop="id"
                     label="ID"
                     align='center'>
    </el-table-column>
    <el-table-column prop="title"
                     label="菜单名称"
                     align='center'>
    </el-table-column>
    <el-table-column prop="url"
                     label="菜单地址"
                     align='center'>
    </el-table-column>
    <el-table-column label="图标"
                     align='center'>
      <template slot-scope="scope ">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
    <el-table-column label="类型">
      <template slot-scope="scope">
        <el-tag type="success"
                v-if="scope.row.type==1">目录</el-tag>
        <el-tag type="warning"
                v-if="scope.row.type==2 ">菜单</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button size="mini"
                   icon="el-icon-edit"
                   type="primary"
                   @click="edit(scope.row)"></el-button>
        <el-button size="mini"
                   type="danger"
                   icon="el-icon-delete"
                   @click="del(scope.row.id)"></el-button>
      </template>

    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions, createLogger } from "vuex";
import { delMenu } from "@/request/menu";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      menulist: "menu/menulist"
    })
  },
  mounted() {
    if (!this.menulist.length) {
      this.get_menu_list();
    }
  },
  methods: {
    ...mapActions({
      get_menu_list: "menu/get_menu_list"
    }),
    edit(val) {
      this.$emit("edit", { ...val });
    },
    async del(id) {
      this.$confirm("确认删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await delMenu(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_menu_list();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  components: {}
};
</script>
<style scoped>
</style>