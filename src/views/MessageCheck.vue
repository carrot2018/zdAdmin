<template>
  <div class="message-check">
    <div class="header">
      <div class="header-link">
        <span @click="cancel" class="header-link__text">留言管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text">留言详情</span>
      </div>
    </div>
    <div class="content">
      <ul class="content-input__list">
        <li>
          <div class="label">姓名</div>
          <div class="content-input__list__right">
            <el-input 
              class="name" 
              v-model="name" 
              type="string" 
              placeholder="姓名" 
              disabled>
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">手机号</div>
          <div class="content-input__list__right">
            <el-input 
              v-model="mobile" 
              :value="mobile" 
              placeholder="手机号" 
              disabled>
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">电子邮箱</div>
          <div class="content-input__list__right">
            <el-input
              v-model="email" 
              :value="email" 
              placeholder="电子邮箱" 
              disabled>
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">工作单位</div>
          <div class="content-input__list__right">
            <el-input 
              v-model="workName" 
              :value="workName" 
              placeholder="工作单位" 
              disabled>
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">留言内容</div>
          <div class="content-input__list__right messageText">
            <el-input
              type="textarea"
              :rows="4"
              :autosize= "{ minRows:4, maxRows:6 }"
              placeholder="留言内容"
              v-model="content"
              maxlength=200
              minlength=8
              disabled
              >
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">跟进状态</div>
          <div class="content-input__list__right">
            <span :style="{ color:stateColor }">{{ processStatus }}</span>
          </div>
        </li>
        <li>
          <div class="label">跟进情况</div>
          <div class="content-input__list__right">
            <el-input
              type="textarea"
              :rows="4"
              :autosize= "{ minRows:4, maxRows:6 }"
              placeholder="跟进处理"
              v-model="followUp"
              maxlength=200
              minlength=8
              disabled
              >    
            </el-input>
          </div>
        </li>
        <li class="btns">
          <div class="label"></div>
          <div class="content-input__list__right btn" >
            <el-button @click="cancel()" size="medium" type="primary">返回</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CKEDITOR from 'CKEDITOR';
export default {
  data() {
    return {
      name: '', // 姓名
      mobile: '', // 手机号
      email: '', // 电子邮箱
      workName:'', // 工作单位
      content: '', // 留言内容

      processStatus: '', //跟进情况
      stateColor:'green', // 跟进情况状态颜色

      followUp:'', // 跟进处理

    }
  },
  methods: {

    // （点击取消）
    cancel() {
      this.$router.go(-1);
    },
    
    // editor富文本
    catchData(value){
      this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
    },

    getMessageDetail() {
      let ids = this.$route.params.messageId;
      axios.get('/api/invoker/gossip/searchById/', {params:{"id": ids}}
        ).then((response) => {
          console.log(response.data.data);

          let messageData = response.data.data;
          // 数据回显
          this.name = messageData.name;
          this.mobile = messageData.mobile;
          this.email = messageData.email;
          this.workName = messageData.workName;
          this.content = messageData.content;
          this.followUp = messageData.situation;
          if(messageData.processStatus === 0) {
            this.processStatus = '已处理'
          } else {
            this.processStatus = '未处理'
          }
      })
    }
  },

  computed: {
    
  },
  mounted() {
    
    if(this.$route.params.messageId !== undefined) {
      this.getMessageDetail();
    }else {
      this.$message.error('当前没有查看的留言，请先到留言管理选择查看的留言吧');
    }
    
  }
}
</script>

<style lang="scss" scoped>
  .message-check {
    flex: 1;
    padding: 20px 10px;
    .header {
      height: 50px;
      border-bottom: 1px solid #333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      .header-link {
        .header-link__text {
          color: #409EFF;
          font-size: 14px;
        }
      }
    }
    .content {
      padding: 30px 20px 20px 40px;

      .content-input__list {
        
        li {
          min-height: 60px;
          display: flex;
          align-items:flex-start;
          .label {
            width: 20%;
          }
          .content-input__list__right {
            width: 40%;
            position: relative;
            .textSize {
              position: absolute;
              right: 0;
              color: #333;
            }
          }
          .messageText {
            height: 150px;
          }
        }
        .btns {
          padding-top: 20px;
        }
        
      }
    }
  }

</style>
