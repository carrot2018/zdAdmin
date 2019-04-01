<template>
<!-- 后台管理系统端头部组件 -->
  <div class="head">
    <div class="head_left">
      <img id="logo" src="../../assets/logo.png" alt="">
      <h1 class="title">中奥科技后台管理系统</h1>
    </div>
    <div class="head_right">
      <div class="go_home">
        <i class="icon_home"></i>
        <a class="go_fore_end" href="http://www.chinaogroup.com">前台首页</a>
      </div>
      <div class="user">
        <div class="user_img"></div>
        <div class="user_more" @click="getMore"> 
          <span class="user_name">{{ userName }}</span>
          <i class="icon_more"></i>
        </div>
        <div v-show="isShow" class="more">
          <div class="modify" @click="goChangePwd">
            <i class="icon_modify icon"></i>
            <span class="more_text">修改密码</span>
          </div>
          <div class="logout" @click="loginOut">
            <i class="icon_logout icon"></i>
            <span class="more_text">退出登录</span>
          </div>
        </div>
      </div>
    </div>
    <div v-if="changePwd" class="mask" ref="mask" :style="{height:maskHeight}">
      
    </div>
    <div v-if="changePwd" class="pwd-box">
        <span class="pwd-box__title">修改密码</span>
        <div class="pwd-box__li">
          <span>原密码</span>
          <el-input class="pwd-box__input" size="medium" clearable placeholder="请输入原密码" v-model="userPwd" autofocus></el-input>
        </div>
        <div class="pwd-box__li">
          <span>密码</span>
          <el-input class="pwd-box__input" size="medium" clearable placeholder="请输入密码" v-model="pwd" show-password></el-input>
        </div>
        <div class="pwd-box__li">
          <span>确认密码</span>
          <el-input class="pwd-box__input" size="medium" clearable placeholder="请再次输入密码" v-model="pwdAgain" show-password autofocus></el-input>
        </div>
        <div class="pwd-box__btns">
         <el-button class="pwd-box__btn" type="info" @click="goBack">取消</el-button>
         <el-button class="pwd-box__btn" type="success">确认</el-button>
        </div>
      </div>
  </div>

</template>

<script>
import Cookie from 'js-cookie';
export default {
  data () {
    return {
      userName: '',
      isShow:false, // 点击名字出现修改密码和退出登录菜单
      changePwd:false,  // 是否修改密码框
      maskHeight:0, // 修改密码的遮罩层
      userPwd: '', // 用户初始密码
      pwd: '', // 修改后的密码
      pwdAgain: '' // 确认密码
    }
  },
  methods: {
    // 点击管理员名字显示或隐藏下拉
    getMore () {
      if(this.isShow === true) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    },
  
    // 点击跳出修改密码
    goChangePwd() {
      if(this.changePwd === false) {
        this.maskHeight = document.getElementById('app').clientHeight + 'px';
        this.changePwd = true
      } else if(this.changePwd === true) {
        this.maskHeight = 0
        this.changePwd = false
      }
    },

    // 点击取消修改密码
    goBack() {
      this.maskHeight = 0
      this.changePwd = false;
    },

    // 获取用户名
    getUserName() {
      let name = Cookie.get('userName');
      this.userName = name;
    },
   
    loginOut() {
      this.$confirm('确定退出登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Cookie.remove('userName');
        this.$message({
          type: 'success',
          message: '您已退出登录!'
        });
        this.$router.replace('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });          
      });
    }
  },
  created() {
    this.getUserName();
  },
}
</script>

<style lang="scss" scoped>
.head {
  flex-shrink: 0;
  height: 80px;
  background: #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .head_left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 50px;
    #logo {
      max-height: 80px;
      background-size: 100%;
    }
    .title {
      color: white;
      font-size: 24px;
    }
  }
  
  .head_right {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    .go_home {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
      .icon_home {
        height: 18px;
        width: 18px;
        display: block;
        background-image: url(../NavBar/images/home.png);
        background-size: 100%;
        background-repeat: no-repeat;
        margin-right: 5px;
      }
      .go_fore_end {
        display: block;
        color: white;
        font-size: 16px;
      }
    }
  
    .user {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .user_img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid #409EFF;
        margin-right: 5px;
      }
      .user_more {
        cursor: pointer;
        display: flex;
        height: 100%;
        justify-content: flex-start;
        align-items: center;
        .user_name {
        color: white;
        font-size: 16px;
        }
        .icon_more {
          height: 18px;
          width: 18px;
          display: block;
          background-size: 100%;
          background-image: url(images/jiantou.png);
          background-repeat:  no-repeat;
        }
      }
      .more {
        height: 90px;
        width: 140px;
        position: absolute;
        bottom: -70px;
        left: 50px;
        display: flex;
        background: white;
        box-shadow: 1px 1px 1px #333;
        .more_text {
          font-size: 14px;
          color: #333;
        }
        .modify,.logout{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .icon {
            height: 18px;
            width: 18px;
            display: block;
            background-size: 100%;
            background-repeat: no-repeat;
            margin-bottom: 3px;
          }
        .icon_modify {
          background-image: url(images/refresh.png);
        }
        .icon_logout {
          background-image: url(images/logout.png);
        }
      }
    }
  }
}
.pwd-box {
  position: fixed;
  top: 50%;
  right: 50%;
  z-index: 999;
  width: 350px;
  height: 270px;
  padding: 20px;
  background: white;
  transform: translate(50%,-50%);
  box-shadow: 1px 1px 3px  #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pwd-box__input {
    width: 80%;
    height: 40px;
    margin: 12px 0;
  }
  .pwd-box__btn {
    font-size: 14px;
    letter-spacing: 4px;
  }
}
.mask{
  width: 100%;
  opacity: 0.6;
  background-color: black;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 998;
}
.pwd-box__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
  text-shadow: 1px 1px 2px #999;
}
  
.pwd-box__li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
     margin-right: 5px;
  }
}
.pwd-box__btns {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .pwd-box__btn {
    width: 90px;
    letter-spacing: 5px;
  }
}
</style>
