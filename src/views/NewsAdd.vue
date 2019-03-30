<template>
  <div class="news_add">
    <div class="header">
      <div class="header-link">
        <span class="header-link__text">新闻管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text" @click="goNews">内容管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text">新增</span>
      </div>
    </div>
    <div class="content">
      <ul class="content-input__list">
        <li>
          <div class="label">新闻标题</div>
          <div class="content-input__list__right">
            <el-input class="title" v-model="title" type="string" placeholder="  一句话描述新闻标题"></el-input>
          </div>
        </li>
        <li>
          <div class="label">发布时间</div>
          <div class="content-input__list__right">
            <el-input v-model="timeStamp" :disabled="true">
              {{ this.timeStamp }}
               <i slot="suffix" class="el-input__icon el-icon-date"></i>
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">分类名称</div>
          <div class="content-input__list__right options">
            <el-select class="option" v-model="optionsVal0" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="wall"></div>
            <el-select class="option" v-model="optionsVal1" clearable placeholder="请选择">
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
          <div class="label">新闻来源</div>
          <div class="content-input__list__right">
            <el-input v-model="newsfrom" placeholder="请输入内容">{{ this.newsfrom }}</el-input>
          </div>
        </li>
        <li class="pic">
          <div class="label">图片</div>
          <div class="content-input__list__right">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="imgUrl"
              :file-list="fileList"
              :auto-upload="false"
              :multiple="false"
              list-type="picture"
              :on-success="onSuccess"
              :on-exceed="handleExceed"
              :before-upload="beforeAvatarUpload"
              :limit= 1
              >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过2M</div>
            </el-upload>
            <input type="text">
            
            <!-- <form method="post" enctype="multipart/form-data"  action="http://23e74b3832.wicp.vip/press-invoker/invoker/content/file/upload/" target="">
              上传文件: <input type="file" name="file"><br/>
              <br/>
              传输： <input type="submit" value="Press"> 
            </form> -->
          </div>
        </li>
        <li>
          <div class="label">是否显示</div>
          <div class="content-input__list__right">
            <div class="news_show">
              <el-radio v-model="radio" label='0'>显示</el-radio>
              <el-radio v-model="radio" label='1'>不显示</el-radio>
            </div>
            <span class="tips">设置为显示时，该内容将会显示在网站上</span>
          </div>
        </li>
        <li>
          <div class="label">推荐栏目</div>
          <div class="content-input__list__right">
            <el-checkbox v-model="checked1">置顶</el-checkbox>
            <span class="tips">置顶的新闻会优先显示在列表顶部</span>
          </div>
        </li>
        <li>
          <div class="label">内容</div>
          <div class="content-input__list__right editor" style="width: 732px;">
            <textarea id="editor" rows="10" cols="80"></textarea>
          </div>
        </li>
        <li class="btns">
          <div class="label"></div>
          <div class="content-input__list__right btn" >
            <el-button @click="cancel" size="medium" type="info">取&nbsp;&nbsp;消</el-button>
            
              <el-button v-if="submitBtn" @click="onSubmit" size="medium" type="primary">提&nbsp;&nbsp;交</el-button>
           
            
            <el-button v-if="submitBtn1" @click="onUpdata" size="medium" type="primary">提&nbsp;&nbsp;交</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cookie from 'js-cookie';
import CKEDITOR from 'CKEDITOR';
export default {
  data() {
    return {
      title: '', // 新闻标题
      timeStamp: '', // 发布时间
      newsfrom: '名厨之家', // 新闻来源
      // 分类名称
      options: [{
        value: '行业新闻',
        label: '行业新闻'
      }, {
        value: '公司新闻',
        label: '公司新闻'
      }],
      optionsVal0: '', // 分类绑定的value值
      options1: [{
        value: '头条',
        label: '头条'
      }, {
        value: '赛事',
        label: '赛事'
      }],
      optionsVal1: '', // 子分类绑定的value值
      imgUrl: 'http://192.168.1.128:8081/press-invoker/file/upload', // 图片上传的地址
      fileList: [],
      fileName: '', // 图片上传成功后返回的地址
      radio: '0', // 是否显示
      checked1: false, // 是否置顶
      isdisabled: false,
      content:"",
      submitBtn: true,
      submitBtn1: false,
      // ckcontent:''
    }
  },
  methods: {

    submitUpload() {
      this.$refs.upload.submit();
      console.log(this.fileList)
    },

    // 文件上传成功的钩子函数
    onSuccess(file, fileList) {
      // console.log(file, fileList);
      this.fileName = file.data;
    },
    
    // 限制图片格式和大小
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },

    // 获取系统时间
    getTime() {

        let date = new Date();//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        this.timeStamp=Y+M+D+h+m+s;
        console.log(this.timeStamp, this.timeStamp)
      // this.time = myDate.toLocaleString();
    },


    // 退到新闻管理
    goNews() {
      this.$router.replace('newsadmin');
    },

    cancel() {
      this.$router.replace('newsadmin');
    },
    
    // 图片上传限制
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 张图片，本次选择了 ${files.length} 张图片`);
      },
    
    // editor
    catchData(value){
      this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
    },

    onSubmit() {
      let stick 
      if(this.checked1 === false) {
        stick = 1
      } else {
        stick = 0
      }
      // console.log(stick)
      this.content = this.editor.getData()
      // console.log(this.editor.getData(), Cookie.get('userName'))
      // let formData = new FormData()
      let title = this.title;
      let timeStamp = this.timeStamp;
      let optionsVal0 = this.optionsVal0;
      let optionsVal1 = this.optionsVal1;
      let newsfrom = this.newsfrom;
      let fileName = this.fileName;
      let radio = Number(this.radio);
      let content = this.content;
      let userName = Cookie.get('userName');
      let data = {
        "title": title,
        "pushTimeStr": timeStamp,
        "source": newsfrom,
        "imgSrc": fileName,
        "display": radio,
        "stick": stick,
        "content":content,
        "createUserName": userName,
        "pressType": {
          "typeName": optionsVal0,
          "topLine": optionsVal1
        }
      }
      console.log(data)
      
      if(title !== ''&&optionsVal0 !== ''&&optionsVal1 !== ''&&newsfrom !== ''&&fileName!==''&&timeStamp!==''&&content!=='') {
        axios.post('/api/invoker/content/save/', data
        ).then((response) => {
          if(response.data.code === '103' || response.data.code === '110'){
            this.$message({
              type: 'success',
              message: '新增成功!'
            });
            this.$router.push('newsadmin');
          } else {
            this.$message.error(response.message);       
          }
          
        })
      } else {
        this.$message.error('新增失败，请检查是否填写完整');  
      }

    },

    // 获取新闻数据
    getNews() {
      let ids = this.$route.query.newsId;
      axios.get('/api/invoker/content/selectContentById/', {params:{"id": ids}}
      ).then((response) => {
        this.updata = response.data.data;
        let upData = response.data.data;
       
        this.editor.setData(upData.content)
        // let ckcontent = this.updata.content
        // this.editor.setData(ckcontent, 
        // // {
        // //   // callback: function() {
        // //   //   return false // true
        // //   // }
        // //   }
        //   )
        // this.ckcontent = upData.content
        console.log(this.updata)
       
        this.title = upData.title;
        // this.timeStamp = this.parseTime()
        // this.parseTime();
        this.newsfrom = upData.source;
        this.fileList = [{name: 'xx.jpg', url: upData.imgSrc}];
        this.fileName = upData.imgSrc;
        // console.log(this.fileName)
        this.radio = String(upData.display) ;
        
        if(upData.stick === 0) {
          this.checked1 = true
        } else {
          this.checked1 = false
        }
      })
    },

    // 修改后提交
    onUpdata() {
      let stick 
      if(this.checked1 === false) {
        stick = 1
      } else {
        stick = 0
      }
      // console.log(stick)
      this.content = this.editor.getData()
      let thisId = this.$route.query.newsId
      let title = this.title;
      let timeStamp = this.timeStamp;
      let optionsVal0 = this.optionsVal0;
      let optionsVal1 = this.optionsVal1;
      let newsfrom = this.newsfrom;
      let fileName = this.fileName;
      let radio = Number(this.radio);
      let content = this.content;
      let userName = Cookie.get('userName');
      let data = {
        "id": thisId,
        "title": title,
        "pushTimeStr": timeStamp,
        "source": newsfrom,
        "imgSrc": fileName,
        "display": radio,
        "stick": stick,
        "content":content,
        "createUserName": userName,
        "pressType": {
          "typeName": optionsVal0,
          "topLine": optionsVal1
        }
      }
      console.log(data)
     

       axios.post('/api/invoker/content/update/', data
      ).then((response) => {
        console.log('修改成功')
        this.$router.go(-1)
      })
    }
  },

  computed: {
   
  },
  mounted() {
    
    // 通过路由传递的参数判断当前是修改还是新增
    if(this.$route.query.newsId !== undefined) {
      this.getNews();
      this.submitBtn = false;
      this.submitBtn1 = true;
    } else {
      this.submitBtn = true;
      this.submitBtn1 = false;
    }
    // 获取系统时间
    this.getTime();
  
    // this.parseTime();
    // editor 
    CKEDITOR.replace('editor', {height: '300px', width: '100%', toolbar: 'toolbar_Full'});
    this.editor = CKEDITOR.instances.editor;
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 100%;
}
  .news_add {
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
            .wall {
              width: 40px;
            }
            .option {
              flex:1;
            }
          }
        }
        .btns {
          padding-top: 20px;
        }
        .pic {
          height: 160px;
        }
      }
    }
  }
  .tips {
    color: #C0C4CC;
    font-size: 14px;
  }

</style>
