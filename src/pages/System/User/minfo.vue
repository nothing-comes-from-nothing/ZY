<template>
  <div>
    <el-dialog :title="info.isAdd?'添加':'修改'"
               :visible.sync="info.isShow"
               width="40%"
               @close="cancel">
      <!-- 表单 -->
      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="管理员角色">
          <el-select v-model="ruleForm.roleid"
                     placeholder="请选择">
            <el-option v-for="item in rolelist"
                       v-if="item.type=1"
                       :key="item.id"
                       :label="item.rolename"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="管理员名称"
                      prop="username">
          <el-input v-model="ruleForm.username"
                    placeholder="请输入管理员名称"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                      v-if="info.isAdd">
          <el-input v-model="ruleForm.password"
                    placeholder="请输入管理员密码"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password"
                      v-else>
          <el-input v-model="ruleForm.password"
                    placeholder="密码留空表示不修改"></el-input>
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
import { addUser, editUser } from "@/request/user";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  roleid: "",
  username: "", //名称
  password: "",
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
        roleid: [{ required: true, message: "必填！", trigger: "blur" }],
        username: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    setinfo(val) {
      val.password = "";
      defaultItem = { ...val };
      this.ruleForm = { ...val };
    },
    ...mapActions({
      get_role_list: "role/get_role_list",
      get_user_list: "user/get_user_list"
    }),
    submit() {
      if (this.isAdd && !this.ruleForm.password) {
        this.$message.warning("请输入密码");
        return;
      }
      //验证的方法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          //如果验证通过
          let res;
          //判断添加还是修改
          if (this.info.isAdd) {
            res = await addUser(this.ruleForm);
          } else {
            res = await editUser(this.ruleForm);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_user_list();
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
    },
    reset() {
      if (this.info.isAdd) {
        //添加重置
        this.ruleForm = { ...defaultItem };
      } else {
        this.setinfo({ ...defaultItem });
      }
    }
  },
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
  components: {}
};
</script>
<style scoped>
</style>