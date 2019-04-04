<template>
  <div class="recruit">
    <div class="header">
      <div class="link">
        <span class="link_text">招聘管理</span>
        <span class="link_text">></span>
        <span class="link_text">内容管理</span>
      </div>
      <div class="add_new">
        <router-link to="/recruitadd"></router-link>
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
          prop="jobName"
          label="职位名称"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="num"
          label="招聘人数"
          width="90">
        </el-table-column>
        <el-table-column
          prop="workYearReq"
          label="年限"
          width="140">
        </el-table-column>
        <el-table-column
          prop="workAddress"
          label="工作地点"
          width="140">
        </el-table-column>
        <el-table-column
          prop="pushTime"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          prop="pushStatus"
          label="是否发布"
          width="90">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="130"
          >
          <template slot-scope="scope">
            <el-button 
            v-if="scope.row.pushStatus=='已下架'"
            @click="releaseRecruit(scope.row.id, scope.row.pushStatus)" type="text" 
            size="small">发布</el-button>
            <el-button 
            v-if="scope.row.pushStatus=='发布中'"
            @click="releaseRecruit(scope.row.id, scope.row.pushStatus)" type="text" 
            size="small">下架</el-button>
            <el-button @click="checkRecruit(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="deleteRecruit(scope.row.id)" type="text" size="small">删除</el-button>
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
// import Vue from 'vue';
// import Element from 'element-ui';
// Vue.use(Element, { size: 'small', zIndex: 3000 });
import axios from 'axios';
export default {
  data() {
    return {
      center: {'text-align': 'center'},
      show:false, // 影藏id
      currentPage:1, // 页码数
      total:0, // 总条数
      pageSize:5, // 每页显示条数
      tableData: [], // 新闻数据
      tableData: [],
      // rowId: '',
      updata: []
    }
  },

  

  methods: {
    
    
    // 点击去新增
    goAdd () {
      this.$router.push('recruitadd')
    },

    // // 获取当前行的id
    // upDateRecruit(row) {
    //   console.log(row)
    //   this.rowId = row.id;
    // },

    // 获取招聘信息
    getRecruit () {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      let data = {"currentPage":currentPage,"pageSize":pageSize};
      axios.post('/api/invoker/recruitment/selectListOfJobs/', data
      ).then((response) => {
        let result = response.data;
        let pageResult = result.data.pageResult;
        if(result.data !== null) {
          this.currentPage = pageResult.currentPage;
          this.total = pageResult.totalRows;
          this.pageSize = pageResult.pageSize;
          let recruits = response.data.data.res;
         
          // console.log(response.data.data.res)
          
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

          recruits.some((item, i) => {
            if (item.pushStatus === 1) {
              item.pushStatus = '已下架'
            } else {
              item.pushStatus = '发布中'
            }

            item.pushTime = timestampToTime(item.pushTime)
          })
          
          this.tableData = recruits;
          // if(this.pushStatus === '已下架') {
          //   this.recruitState = '发布'
          // } else {
          //   this.recruitState = '下架'
          // }
        } else {
          console.log('没有更多招聘信息')
        }
      })
    },

    // 修改招聘状态
    releaseRecruit(id, status) {
      let ids = id;
      status === '发布中'?status=1:status=0;
      let pushStatus = status;

      let data = {"id": ids, "pushStatus": pushStatus}
      axios.post('/api/invoker/recruitment/update/', data
      ).then((response) => {
        console.log("修改状态成功")
        this.getRecruit ();
        // this.updata = response.data.data;

        // let id = this.updata.id
        // console.log(id)
        // this.$router.push({
        //   name: 'recruitcheck',
        //   params: {
        //     newsId: id
        //   }
        // })
      })
    },

    // 查看
    checkRecruit(id) {
      let ids = id;
      axios.get('/api/invoker/recruitment/searchById/', {params:{"id": ids}}
      ).then((response) => {
        this.updata = response.data.data;

        let id = this.updata.id
        console.log(id)
        this.$router.push({
          name: 'recruitcheck',
          params: {
            newsId: id
          }
        })
      })
    },

    // 删除
    deleteRecruit(id) {
      this.$confirm('确定删除该条招聘消息吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = id;
        axios.get('/api/invoker/recruitment/delete?id='+ids
        ).then((response) => {
          this.getRecruit ()
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

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getRecruit();
    },

    // 根据当前页来请求数据
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`, val);
      this.currentPage = val;
      this.getRecruit();
    }
  },
  
  created() {
    this.getRecruit()
  },
}
</script>

<style lang="scss" scoped>
.recruit {
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
    .link {
      .link_text {
        color: #409EFF;
        font-size: 14px;
      }
    }
    .add_new {
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
