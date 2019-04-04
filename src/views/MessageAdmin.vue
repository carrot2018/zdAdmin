<template>
  <div class="message-admin">
    <div class="header">
      <div class="header-link">
        <span class="header-link__text">留言管理</span>
        <!-- <span class="header-link__text">></span>
        <span class="header-link__text">内容管理</span> -->
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
          prop="name"
          label="姓名"
          width="90">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="电子邮箱"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="workName"
          label="工作单位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="content"
          label="留言内容"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="留言时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="processStatus"
          label="处理状态"
          width="70">
        </el-table-column>
        <el-table-column
          prop="processTime"
          label="处理时间"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="90"
          >
          <template slot-scope="scope">
             <el-button 
            v-if="scope.row.processStatus==='未处理'"
            @click="releaseMessage(scope.row.id, scope.row.processStatus)" type="text" 
            size="small">处理</el-button>
            <el-button 
            v-if="scope.row.processStatus==='已处理'"
            @click="releaseMessage(scope.row.id, scope.row.processStatus)" type="text" 
            size="small">查看</el-button> 
            <!-- <el-button @click="checkRecruit(scope.row.id)" type="text" size="small">查看</el-button> -->
            <el-button @click="deleteMessage(scope.row.id)" type="text" size="small">删除</el-button>
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

export default {
  data() {
    return {
      center: {'text-align': 'center'},
      currentPage:1, // 页码数
      total:0, // 总条数
      pageSize:5, // 每页显示条数
      show:false,
      tableData:[]
    }
  },

  methods: {

    // 获取留言信息
    getMessage() {
      let currentPage = this.currentPage;
      let pageSize = this.pageSize;
      let data = {"currentPage":currentPage, "pageSize":pageSize};
      axios.post('/api/invoker/gossip/selectListOfJobs/', data
      ).then((response) => {
        console.log(response)
          let result = response.data;
         
          if(result.data !== null) {
             let pageResult = result.data.pageResult;
          this.currentPage = pageResult.currentPage;
          this.total = pageResult.totalRows;
          this.pageSize = pageResult.pageSize;
          let messages = response.data.data.gossips;
         
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

          // 返回的数据里面的 处理状态 （0,1）转换成中文
          messages.some((item, i) => {
            if (item.processStatus === 0) {
              item.processStatus = '已处理'
            } else {
              item.processStatus = '未处理'
            }

            if (item.processTime === null){
              item.processTime = ''
            } else {
              item.processTime = timestampToTime(item.processTime)
            }
            
            item.createTime = timestampToTime(item.createTime)
          })
          
          this.tableData =  messages;
         
        } else {
          console.log('没有更多留言')
        }
      })
    },

    // 删除留言
    deleteMessage(id){
      // $confirm ui组件弹框 $message ui组件提示
      this.$confirm('确定删除该条留言吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = id;
        axios.get('/api/invoker/gossip/delete?id='+ids
        ).then((response) => {
          this.getMessage()
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

    // 处理留言
    releaseMessage(id, status) {
      if(status === '未处理') {
        this.$router.push({
          name: 'messagedetails',
          params: {
            messageId: id
          }
        })
      } else {
        this.$router.push({
          name: 'messagecheck',
          params: {
            messageId: id
          }
        })
      }
    },

    // 根据每页显示条数来请求数据
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getMessage();
    },

    // 根据当前页来请求数据
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`, val);
      this.currentPage = val;
      this.getMessage();
    }
  },

  mounted() {
    this.getMessage();
  },
}
</script>

<style lang="scss" scoped>
.message-admin {
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
