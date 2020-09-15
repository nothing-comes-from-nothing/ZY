<template>
    <div>
        <el-row class="login-bg">
            <el-col :span="8"
                    class="login-box">
                <h3>小U商城管理系统</h3>
                <el-form :model="forminfo"
                         ref="form"
                         class="demo-form"
                         :rules="rules">
                    <el-form-item>
                        <el-input placeholder="请输入用户名"
                                  v-model="forminfo.username">
                            <template slot="prepend">
                                <i class="el-icon-user-solid"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入密码"
                                  v-model="forminfo.password"
                                  show-password>
                            <template slot="prepend">
                                <i class="el-icon-lock"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"
                                   @click="submit('frominfo')"
                                   class="frombtn">立即登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      forminfo: {
        username: "admin",
        password: "admin"
      }
    };
  },
  created() {},
  methods: {
    ...mapActions({
      login: "user/login"
    }),
    submit() {}
  },
  components: {}
};
</script>
<style scoped>
.login-bg {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/img/bg.jpg");
  background-size: 100% 100%;
}
.login-box {
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 10px 40px;
}
.login-box h3 {
  line-height: 40px;
  margin-bottom: 20px;
}
.frombtn {
  width: 100%;
}
</style>