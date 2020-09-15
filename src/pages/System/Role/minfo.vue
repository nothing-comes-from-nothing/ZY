<template>
  <div>
    <el-dialog :title="info.isAdd?'添加角色':'修改角色'"
               :visible.sync="info.isShow"
               width="40%"
               @close="cancel">
      <!-- 表单 -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="角色名称"
                      prop="rolename">
          <el-input v-model="ruleForm.rolename"
                    placeholder="请输入名称"></el-input>
        </el-form-item>

        <el-form-item label="权限">

          <el-tree ref="tree"
                   node-key="id"
                   :props="{children:'children',label:'title'}"
                   :data="menulist"
                   :check-strictly="isStrictly"
                   show-checkbox>
          </el-tree>

        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="ruleForm.status"
                     :active-value='1'
                     :inactive-value='2'></el-switch>
        </el-form-item>
      </el-form>

      <span slot="footer"
            class="dialog-footer">
        <el-button @click="submit"
                   type="primary">立即添加</el-button>
        <el-button @click="reset "
                   type="warning">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, editRole } from "@/request/role";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  rolename: "", //名称
  menus: [], //权限
  status: 1 //状态1正常2禁用
};
let resetItem = { ...defaultItem };
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          isShow: false
        };
      }
    }
  },
  data() {
    return {
      ruleForm: { ...defaultItem },
      //验证规则对象
      rules: {
        rolename: [{ required: true, message: "必填！", trigger: "blur" }]
      },
      isStrictly: false //false表示父子相互关联
    };
  },
  created() {},
  methods: {
    setinfo(val) {
      //将权限节点回显到树中去
      let idarr = val.menus.split(",");
      if (idarr[0]) {
        this.isStrictly = true; //父子互不关联
        //等到节点渲染完成再做某件事
        this.$nextTick(() => {
          this.$refs.tree.setCheckedKeys(idarr);
          this.isStrictly = false; //父子相互关联
        });
      }

      defaultItem = { ...val };
      this.ruleForm = { ...val };
    },
    ...mapActions({
      get_menu_list: "menu/get_menu_list",
      get_role_list: "role/get_role_list"
    }),
    submit() {
      //获取树选中的节点
      let idarr = this.$refs.tree
        .getCheckedKeys()
        .concat(this.$refs.tree.getHalfCheckedKeys());
      if (idarr.length) {
        this.ruleForm.menus = idarr;
      } else {
        this.$message.warning("请选择权限");
        return;
      }
      console.log(this.ruleForm.menus);
      //验证的方法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          //如果验证通过
          let res;
          //判断添加还是修改
          if (this.info.isAdd) {
            res = await addRole(this.ruleForm);
          } else {
            res = await editRole(this.ruleForm);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_role_list();
            this.cancel();
          } else {
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel() {
      this.ruleForm = { ...resetItem };
      this.$refs.tree.setCheckedKeys([]);
    },
    reset() {
      if (this.isAdd) {
        //添加重置
        this.ruleForm = { ...defaultItem };
        this.$refs.tree.setCheckedKeys([]);
      } else {
        this.setinfo({ ...defaultItem });
      }
    }
  },
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
  components: {}
};
</script>
<style scoped>
</style>