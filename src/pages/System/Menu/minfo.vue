<template>
  <div>
    <el-dialog :title="info.isAdd?'添加菜单':'修改菜单'"
               @close="cancel"
               :visible.sync="info.isShow"
               width="40%">
      <!-- 表单 -->

      <el-form :model="ruleForm"
               :rules="rules"
               ref="ruleForm"
               label-width="100px"
               class="demo-ruleForm">

        <el-form-item label="菜单类型">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="上级目录"
                      v-if="ruleForm.type==2">
          <el-select v-model="ruleForm.pid"
                     placeholder="请选择">
            <el-option label="顶级目录"
                       :value="0"></el-option>
            <el-option v-for="item in menulist"
                       v-if="item.type=1"
                       :key="item.id"
                       :label="item.title"
                       :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="ruleForm.type==1?'目录名称':'菜单名称'"
                      prop="title">
          <el-input v-model="ruleForm.title"
                    placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="图标"
                      prop="icon">
          <el-input v-model="ruleForm.icon"
                    placeholder="请输入class图标"></el-input>
        </el-form-item>

        <el-form-item label="菜单地址"
                      prop="url"
                      v-if="ruleForm.type==2">
          <el-input v-model="ruleForm.url"
                    placeholder="请输入菜单地址"></el-input>
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
                   type="primary">提交</el-button>
        <el-button @click="reset "
                   type="warning">重置</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, editMenu } from "@/request/menu";
import { mapGetters, mapActions } from "vuex";
let defaultItem = {
  pid: 0, //上级分类编号，  pid字段必须添加，0表示顶级
  title: "", //标题
  icon: "", //图标
  type: 1, //类型1目录2菜单
  url: "", //菜单地址
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
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        url: [{ required: true, message: "必填！", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    cancel() {
      this.ruleForm = { ...resetItem };
    },
    setinfo(val) {
      defaultItem = { ...val };
      this.ruleForm = { ...val };
    },
    ...mapActions({
      get_menu_list: "menu/get_menu_list"
    }),
    submit() {
      console.log(this.$refs.ruleForm);
      //验证的方法
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          //如果验证通过
          let res;
          //判断添加还是修改
          if (this.info.isAdd) {
            res = await addMenu(this.ruleForm);
          } else {
            res = await editMenu(this.ruleForm);
          }
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.info.isShow = false;
            this.get_menu_list(); //再次获取列表，让仓库里的是最新的
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
    reset() {
      if (this.info.isAdd) {
        //添加重置
        this.ruleForm = { ...resetItem };
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