<template>
  <div class="news-add">
    <div class="header">
      <div class="header-link">
        <span class="header-link__text">招聘管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text" @click="goNews">内容管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text">新增</span>
      </div>
    </div>
    <div class="content">
      <ul class="content-input__list">
        <li>
          <div class="label">职位名称</div>
          <div class="content-input__list__right">
            <el-input class="positon" v-model="positon" type="string" placeholder="请输入职位名称"></el-input>
          </div>
        </li>
        <li>
          <div class="label">招聘人数</div>
          <div class="content-input__list__right">
            <el-input v-model="number" :value="number">
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">学历要求</div>
          <div class="content-input__list__right options">
            <el-select class="option" v-model="education" clearable placeholder="请选择">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <div class="label">工作年限要求</div>
          <div class="content-input__list__right options">
            <el-select class="option" v-model="workLonger" clearable placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <div class="label">工作地点</div>
          <div class="content-input__list__right">
            <el-input class="address" v-model="address" type="string" placeholder="请输入工作地点，示例：广东-深圳"></el-input>
          </div>
        </li>
        <li>
          <div class="label">发布状态</div>
          <div class="content-input__list__right">
            <div class="news_show">
              <el-radio v-model="radio" label="0">发布</el-radio>
              <el-radio v-model="radio" label="1">下架</el-radio>
            </div>
          </div>
        </li>
        <li>
          <div class="label">招聘内容</div>
          <div class="content-input__list__right editor" style="width: 732px;">
            <textarea id="editor" rows="10" cols="80"></textarea>
          </div>
        </li>
        <li class="btns">
          <div class="label"></div>
          <div class="content-input__list__right btn" >
            <el-button @click="cancel" size="medium" type="info">取&nbsp;&nbsp;消</el-button>
            <el-button @click="onSubmit" size="medium" type="primary">提&nbsp;&nbsp;交</el-button>
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
      positon: '', // 新闻标题
      number: '1', // 招聘人数

      // 分类名称
      options1: [{
        value: '不限',
        label: '不限'
      }, {
        value: '大专以上',
        label: '大专及以上'
      },{
        value: '本科',
        label: '本科'
      },{
        value: '本科以上',
        label: '本科及以上'
      }],
      education: '', // 选择的分类

      // 工作年限要求
      options2: [{
        value: '不限',
        label: '不限'
      }, {
        value: '1年以上',
        label: '一年以上'
      }, {
        value: '2年以上',
        label: '两年以上'
      }, {
        value: '3年以上',
        label: '三年以上'
      }, {
        value: '5年以上',
        label: '五年以上'
      }, {
        value: '8年以上',
        label: '八年以上'
      }],
      workLonger:'', // 选择的工作年限

      address: '', // 工作地点
      fileList2: [], // 上传的文件 
      isdisabled: false, // 用于判断上传文件之后 上传按钮是否禁用
      radio: '1', // 是否显示（默认：显示）
      checked1: false, // 是否置顶
      content:""
    }
  },
  methods: {

    // 退到新闻管理（点击头部导航）
    goNews() {
      this.$router.replace('recruitadmin');
    },

    // 退到新闻管理（点击取消）
    cancel() {
      this.$router.replace('recruitadmin');
    },
    
    // 图片上传限制
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
      },
    
    // editor富文本
    catchData(value){
      this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
    },
 
    onSubmit() {
      // let id = this.upData.id;
      let jobName = this.positon;
      let num = this.number;
      let degreeRequired = this.education;
      let workYearReq = this.workLonger;
      let workAddress = this.address;
      let pushStatus = Number(this.radio);
      this.content = this.editor.getData();
      let content= this.content
      let data = {
        "jobName": jobName,
        "num": num,
        "degreeRequired": degreeRequired,
        "workYearReq": workYearReq,
        "workAddress": workAddress,
        "pushStatus": pushStatus,
        "content": content
      };
      if(jobName !== ''&&num !== ''&&degreeRequired !== ''&&workAddress !== ''&&workYearReq!==''&&content!=='') {
        axios.post('/api/invoker/recruitment/save/', data
        ).then((response) => {
          console.log(111,response);
          if(response.data.code === '103' || response.data.code === '110'){
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
            this.$router.push('recruitadmin');
          } else {
            this.$message.error(response.message);
          }
        })
      } else {
        this.$message.error('新增失败，请检查是否填写完整');  
      }

      
    },
    // submit() {
    //   console.log(this.fileList2)
    // }
  },

  computed: {
   
  },
  mounted() {
    // editor富文本
    CKEDITOR.replace('editor', {height: '300px', width: '100%', toolbar: 'toolbar_Full'});
    this.editor = CKEDITOR.instances.editor;
  }
}
</script>

<style lang="scss" scoped>
  .news-add {
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
          }
          .options {
            display: flex;
            
            .option {
              flex:1;
            }
          }
        }
        .btns {
          padding-top: 20px;
        }
        
      }
    }
  }

</style>
