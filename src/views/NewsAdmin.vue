<template>
  <div class="management">
    <div class="header">
      <div class="header-link">
        <span class="header-link__text">新闻管理</span>
        <span class="header-link__text">></span>
        <span class="header-link__text">内容管理</span>
      </div>
      <div class="header-newsadd">
        <router-link to="/newsadd"></router-link>
        <el-button @click="goAdd" type="primary">新  增</el-button>
       
      </div>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        border
        stripe
        :header-cell-style= 'this.center'
        :cell-style= 'this.center'
        style="width: 100%">
        <el-table-column
          label="ID"
          type = "index"  
        >
        </el-table-column>
        <el-table-column
          prop="id"
          v-if="show"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="新闻标题"
          
        >
        </el-table-column>
        <el-table-column
          prop="pressType.typeName"
          label="分类名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="imgSrc"
          label="图片"
          width="150">
          <template slot-scope="scope">
            <img :src="scope.row.imgSrc" min-width="80" height="80" class="tableImg" />
          </template>
        </el-table-column>
        <el-table-column
          prop="stick"
          label="置顶属性"
          width="90">
        </el-table-column>
        <el-table-column
          prop="display"
          label="是否显示"
          width="90">
        </el-table-column>
        <el-table-column
          prop="pushTime"
          label="发布时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="创建人"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="130">
          <template slot-scope="scope">
            <el-button @click="updateNews(scope.row.id)" type="text" size="small">修改</el-button>
            <el-button @click="deleteNews(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="block">
        <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// import Vue from 'vue';
// import Element from 'element-ui';
// Vue.use(Element, { size: 'small', zIndex: 3000 });

export default {
  data() {
    return {
      center: {'text-align': 'center'},
      currentPage:1, // 页码数
      total:0, // 总条数
      pageSize:5, // 每页显示条数
      tableData: [], // 新闻数据
      show: false, // 隐藏拿到id
      updata: [], 
      // rowId:''
    }
  },

  methods: {

    // 删除提示
    deleteMessage() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },

    // 去到新增
    goAdd () {
      this.$router.push('newsadd');
    },

    // 修改新闻
    updateNews(id) {
      
      let ids = id;
      console.log(ids)
      axios.get('/api/invoker/content/selectContentById/', {params:{"id": ids}}
      ).then((response) => {
        this.updata = response.data.data;
       
        let id = this.updata.id
         console.log(id)
        this.$router.push({
         name: 'newsadd',
          query: {
            newsId: id
          }
        })
      })
    },

     // 删除新闻
    deleteNews(id) {
      this.$confirm('确定删除该条新闻吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = id;
        axios.get('/api/invoker/content/delete?id='+ids
        ).then((response) => {
          this.getNews();
        })

        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    },

    // 获取新闻信息
    getNews() {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      let data = {"currentPage":currentPage, "pageSize":pageSize}
     
      axios.post('/api/invoker/content/selectListOfContents/', data
      ).then((response) => {
        let result = response.data;
        //  console.log(result)
        
       
        if(result.data !== null) {
          let pageResult = result.data.pageResult;
          this.currentPage = pageResult.currentPage;
          this.total = pageResult.totalRows;
          this.pageSize = pageResult.pageSize;
          let news = response.data.data.contents;
         
          
          // 时间戳转换成日期
          function timestampToTime(timestamp) {
            let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '-';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            let D = date.getDate() + ' ';
            let h = date.getHours() + ':';
            let m = date.getMinutes() + ':';
            let s = date.getSeconds();
            return Y+M+D+h+m+s;
          }
          // 检测数据进行修改
          news.some((item, i) => {
            let that = this
            if (item.display === 1) {
              item.display = '否'
            } else {
              item.display = '是'
            }

            if (item.stick === 1) {
              item.stick = '-'
            } else {
              item.stick = '置顶'
            }

            item.pushTime = timestampToTime(item.pushTime)

          })
          
          this.tableData = news

          
        } else {
          console.log('没有更多新闻了')
        }
        
      })
    },

   
    // 改变条数的钩子
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`, val);
      this.pageSize = val;
      this.getNews();  
    },

    // 根据当前页来请求数据
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`, val);
      this.currentPage = val;
      this.getNews();
    }

    
  },
  created() {
    this.getNews()
  }
}

</script>

<style lang="scss" scoped>
.tableImg {
  height: 60px;
  width: 80px;
  display: inline-block;
}
.operation {
  width: 100%;
  text-align: center;
}
.management {
  flex: 1;
  padding: 20px 10px;
  // background: #666;
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
    .header-newsadd {
      margin-right: 30px;
    }
  }
  .content {
    padding: 20px 40px 30px 20px;
  }
  .footer {
    padding-top: 30px;
    position: relative;
    .block {
      position: absolute;
      right: 40px;
    }
  }
}
.is-leaf {
  text-align: center;
}

.th-cell {
  text-align: center;
}

.td-cell {
  text-align: center;
}
</style>
