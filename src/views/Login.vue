<template>
  <div class="login">
    <div class="login-box">
      <span class="login-box__title">中奥官网后台管理系统</span>
      <!-- <div class="login-box__li">
        <span>账号</span>
         <el-input 
            validate-event 
            class="login-box__input" 
            size="medium" 
            clearable 
            placeholder="请输入账号" 
            v-model="user" 
            autofocus
            minlength=2
            maxlength=16
            @blur="userTest">
            {{btnTest}}
          </el-input>
      </div>
      <div class="login-box__li">
        <span>密码</span>
         <el-input 
            class="login-box__input" 
            size="medium" 
            clearable 
            placeholder="请输入密码" 
            v-model="pwd" 
            show-password
            minlength=6
            maxlength=16>
          </el-input>
      </div> -->
    <el-form :model="loginForm" ref="loginForm" :rules="rules"  class="demo-ruleForm">
      <span>用户名</span>
      <el-form-item
        prop="user"
        class="item"
      >
        
        <el-input 
          v-model="loginForm.user" 
          autocomplete="off"
          validate-event 
          class="login-box__input" 
          size=medium
          clearable 
          placeholder="请输入账号" 
          autofocus
          minlength=2
          maxlength=16
          >{{btnTest}}</el-input>
      </el-form-item>
      <span>密码</span>
      <el-form-item
        prop="pwd"
        class="item"
      >
      <el-input 
        @keyup.enter.native="userLogin()"
        v-model="loginForm.pwd" 
        autocomplete="off"
        class="login-box__input" 
        size=medium
        clearable
        placeholder="请输入密码"  
        show-password
        minlength=6
        maxlength=16></el-input>
      </el-form-item>
    </el-form>
    <el-button 
      class="login-box__input login-box__btn" 
      type="success" 
      @click="userLogin()" 
      :disabled="disabled"
    >立即登录
    </el-button>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import axios from 'axios';
export default {
  data() {
    var validateuser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入登陆账号'));
      } else {
        callback();
      }
    };
    var validatepwd = (rule, value, callback) => {
      if(value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    }
    return {
      disabled:true,
      loginForm: {
        user:'',
        pwd:''
      },
      rules: {
        user:[
          { validator: validateuser, trigger: 'blur' }
        ],
        pwd:[
          { validator: validatepwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登陆成功的消息提示框
    open1() {
      this.$message({
        message: '登陆成功，欢迎进入后台管理系统',
        type: 'success'
      });
    },
    // 用户名或密码错了的消息提示框
    open2() {
      this.$message.error('用户名或密码错了哦，请重新登陆');
    },
    // 用户登录验证
    userLogin () {
      // 数据
      let user = this.loginForm.user;
      let pwd = this.loginForm.pwd;
      let data = {"userName":user,"password":pwd}
     
      axios.post('/api/invoker/sysUser/login', data
      ).then((response) => {
        let result = response.data;
        console.log(result)
        if(result.data !== null) {
          if (data.userName === result.data.userName) {
            if (data.password === result.data.password) {
              Cookie.set('userName', result.data.userName, { expires: this._expires/24 });
              this.open1()
              this.$router.push('newsadmin');
            } else {
              console.log('密码错误') 
            }
          } else {
            console.log('账号不存在')
          }
        } else {
          this.open2();
          console.log('账号不存在')
        }
      })
    },
  },

  computed: {

    // 允许点击登录按钮的条件
    btnTest: function() {
      let userlength = this.loginForm.user.length;
      let pwdlength = this.loginForm.pwd.length;
      if((userlength <= 16 && userlength >= 2) && (pwdlength <= 16 && pwdlength >= 6)) {
       
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },

  created() {
    //  Cookie.set('userName', '123', { expires: 1 });
    // 判断是否需要再次登录
    if(Cookie.get('userName')) {
      console.log(1)
      this.$router.push('/')
    } 
    
  },
}
</script>

<style lang="scss" scoped>
.login {
  flex: 1;
  background-image: url(../assets/bg.jpg);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-box__title {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
    text-shadow: 1px 1px 2px #999;
  }
  .login-box {
    width: 350px;
    height: 270px;
    padding: 20px;
    background: white;
    // border-radius: 3px;
    // border: 1px solid #ccc;
    box-shadow: 1px 1px 3px  #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-box__input {
      width: 115%;
      height: 40px;
      margin-top: 12px;
      margin-left: 0;
    }
    .login-box__btn {
      width: 80%;
      font-size: 14px;
      letter-spacing: 4px;
    }
  }
}
// .login-box__li {
//   width: 100%;
//   display: flex;
//   align-items: center;
//   span {
//     font-size: 14px;
//      margin-right: 20px;
//   }
// }
.el-form {
  width: 100%;
  position: relative;
 span {
  position: absolute;
  left: 0;
  padding-top: 20px;
}
}
.item {
  width: 100%;
   display: flex;
  align-items: center;
  justify-content: space-between;
  
  
}

  
</style>
