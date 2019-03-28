<template>
  <div class="banner-add">
    <div class="header">
      <div class="header-link">
        <span @click="goBannerAdmin" class="header-link__text">网站banner管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text">新增</span>
      </div>
    </div>
    <div class="content">
      <ul class="content-input__list">
        <li>
          <div class="label">图片</div>
          <div class="content-input__list__right">
            <el-input class="title" v-model="title" type="string" placeholder="  一句话描述新闻标题"></el-input>
          </div>
        </li>
        <li>
          <div class="label">发布时间</div>
          <div class="content-input__list__right">
            <el-input v-model="time" :disabled="true">
              {{ this.time }}
               <i slot="suffix" class="el-input__icon el-icon-date"></i>
            </el-input>
          </div>
        </li>
        <li>
          <div class="label">分类名称</div>
          <div class="content-input__list__right options">
            <el-select class="option" v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <div class="wall"></div>
            <el-select class="option" v-model="value5" clearable placeholder="请选择">
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
      ref='upload'
      :auto-upload='false' 
      :file-list="fileList" 
      :multiple='false'
      :limit="1"
      :on-exceed="handleExceed"
      :http-request="uploadFiles" 
      list-type="picture"
      accept="image/jpeg,image/gif,image/png"
      action='/api/press-invoker/file/upload/'
     
      >
    <el-button slot="trigger" size="mini" type="primary">选取图片</el-button>
    <span>&nbsp;</span>
    <el-button @click='uploadFiles' size="mini" type="primary">点击上传</el-button>
 </el-upload>    

            <!-- <el-upload
              class="upload-demo"
              :action="uploadUrl"
              :headers="header"
              :file-list="fileList2"
              :limit="1"
              list-type="picture"
              :on-exceed="handleExceed"
              :on-success="onSuccess"
              :data="data1"
              :auto-upload="false"
              ref="upload"
              enctype="multipart/form-data">
              <el-button size="small" type="primary" :disabled="isdisabled">点击上传</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            <!-- <el-upload
            method="post"
            enctype="multipart/form-data"
              class="upload-demo"
              ref="upload"
              action="http://23e74b3832.wicp.vip/press-invoker/file/upload/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload> -->
            
        <form method="post" enctype="multipart/form-data"  action="http://23e74b3832.wicp.vip/press-invoker/file/upload/" target="">
            上传文件: <input @change="getFile" type="file" ref="file"><br/>
            <br/>
            传输： <input type="submit" value="Press"> 
        </form>
          </div>
        </li>
        <li>
          <div class="label">是否显示</div>
          <div class="content-input__list__right">
            <!-- <upload :uploadType="`head`" :imgWidth="`85px`" :imgHeight="`104px`" :imgUrl="imgUrl"
    @upload="getImgUrl"></upload> -->

          </div>
        </li>
        <li>
          <div class="label">是否显示</div>
          <div class="content-input__list__right">
            <div class="news_show">
              <el-radio v-model="radio" label="1">显示</el-radio>
              <el-radio v-model="radio" label="2">不显示</el-radio>
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
            <el-button @click="onSubmit" size="medium" type="primary">提&nbsp;&nbsp;交</el-button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import upload from '../components/Upload'
import axios from 'axios';
import CKEDITOR from 'CKEDITOR';
export default {
  
  data() {
    return {
      title: '', // 新闻标题
      time: '', // 发布时间
      newsfrom: '名厨之家', // 新闻来源
      // 分类名称
      options: [{
        value: '选项1',
        label: '行业新闻'
      }, {
        value: '选项2',
        label: '公司新闻'
      }],
      value4: '', // 分类绑定的value值
      options1: [{
        value: '选项1',
        label: '头条'
      }, {
        value: '选项2',
        label: '赛事'
      }],
      value5: '', // 子分类绑定的value值
      fileList: [],
      radio: '1', // 是否显示
      checked1: false, // 是否置顶
      isdisabled: false,
      content:"",
      uploadUrl:"/api/press-invoker/file/upload/",
      data1: { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
    }
  },
  component: {
    upload
  },
  methods: {

//点击上传图片,上传成功返回图片路径 
    uploadFiles(){
        var That=this;
      let file=this.$refs.upload.$refs['upload-inner'].$refs.input; //获取文件数据
      let fileList=file.files;      
      var imgFile;
      let reader = new FileReader();     //html5读文件
      reader.readAsDataURL(fileList[0]); //转BASE64       
      reader.onload=function(e) {        //读取完毕后调用接口
        imgFile = e.target.result;
        let obj={
            id: "loginLogo",
            configGroup: "logo",
            configItem : "loginLogo",
          itemValue : imgFile    
        }
        return BaseApi.uploadFiles(obj).then((res)=>{
            if(res.status=='SUCCESS'){
                AlertBox('图片上传成功！','success',true).then(()=>{
                    return That.getSysLogo(); //调用获取base64数据接口
                });
            }else{
                Alert('图片上传失败',res);
                return ''
            }
        })

      };          
    },


    //接收子组件emit的事件
getImgUrl(data) {
  console.log(data)
   //data  得到的就是返回的图片路径的相关参数
},


    submitUpload() {
    //   let data = {"file": this.fileList}
    //   console.log(data)
    //   axios.post('/api/press-invoker/file/upload/', data
    //   ).then((response) => {
    //     let result = response.data;
    //     console.log(result)
    //   })
      console.log(this.fileList)
      this.$refs.upload.submit();
      
    },

    onSuccess(file, fileList) {
      console.log(file, fileList)
    },
    // uploadUrl() {
    //    var url = "http://23e74b3832.wicp.vip/press-invoker/file/upload/" // 生产环境和开发环境的判断
    //     return url
    // },

    // 获取系统时间
    getTime() {
      var myDate = new Date();
      this.time = myDate.toLocaleString( );
    },

    // 退到新闻管理
    goBannerAdmin() {
      this.$router.replace('banneradmin');
    },

    cancel() {
      this.$router.replace('banneradmin');
    },
    
    // 图片上传限制
     handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件`);
      },
    
    // editor
    catchData(value){
      this.content=value      //在这里接受子组件传过来的参数，赋值给data里的参数
    },

    onSubmit() {
      // let data = {}
      // axios.post('/api/press-invoker/',data
      // ).then((response))
    },

    getFile(e) {
      console.log(e.target.files)
    }
  },

  computed: {
   
  },
  mounted() {
    // 获取系统时间
    this.getTime();

    // editor 
    CKEDITOR.replace('editor', {height: '300px', width: '100%', toolbar: 'toolbar_Full'});
    this.editor = CKEDITOR.instances.editor;
  }
}
</script>

<style lang="scss" scoped>
  .banner-add {
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
