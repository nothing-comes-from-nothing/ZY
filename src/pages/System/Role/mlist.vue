<template>
  <el-table :data="rolelist">
    <el-table-column prop="rolename"
                     label="角色名称"
                     align='center'>
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-tag type="success"
                v-if="scope.row.status==1">启用</el-tag>
        <el-tag type="danger"
                v-if="scope.row.status==2 ">禁用</el-tag>
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
import { delRole } from "@/request/role";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      rolelist: "role/rolelist"
    })
  },
  mounted() {
    if (!this.rolelist.length) {
      this.get_role_list();
    }
  },
  methods: {
    ...mapActions({
      get_role_list: "role/get_role_list"
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
          let res = await delRole(id);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.get_role_list();
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