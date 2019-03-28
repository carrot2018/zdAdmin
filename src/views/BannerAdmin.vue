<template>
  <div class="banner-admin">
    <div class="header">
      <div class="header-link">
        <span class="header-link__text">网站banner管理</span>
      </div>
      <div class="header-newsadd">
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
          prop="id"
          label="ID"
          width="60">
        </el-table-column>
        <el-table-column
          prop="img"
          label="图片"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="imgUrl"
          label="URL"
        >
        </el-table-column>
        <el-table-column
          prop="isTop"
          label="置顶属性"
          width="120">
        </el-table-column>
        <el-table-column
          prop="top"
          label="置顶属性"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="是否显示"
          width="120">
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="发布时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
          width="120">
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
          :total="totalRows">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
// import Element from 'element-ui';
// Vue.use(Element, { size: 'small', zIndex: 3000 });

export default {
  data() {
    return {
      currentPage:5,
      pageSize:5,
      totalRows:400, // 总条数
      center: {'text-align': 'center'},
      tableData: [{
        id: '1',
        img: '王小虎',
        imgUrl: '公司新闻',
        isTop: '1',
        top: '置顶',
        isShow: '是',
        updateTime: '2019-03-07',
        founder: 'admin',
        operation: ['修改','删除']
      },{
        id: '1',
        img: '王小虎',
        imgUrl: '公司新闻',
        isTop: '1',
        top: '置顶',
        isShow: '是',
        updateTime: '2019-03-07',
        founder: 'admin',
        operation: ['修改','删除']
      },{
        id: '1',
        img: '王小虎',
        imgUrl: '公司新闻',
        isTop: '1',
        top: '置顶',
        isShow: '是',
        updateTime: '2019-03-07',
        founder: 'admin',
        operation: ['修改','删除']
      },{
        id: '1',
        img: '王小虎',
        imgUrl: '公司新闻',
        isTop: '1',
        top: '置顶',
        isShow: '是',
        updateTime: '2019-03-07',
        founder: 'admin',
        operation: ['修改','删除']
      },{
        id: '1',
        img: '王小虎',
        imgUrl: '公司新闻',
        isTop: '1',
        top: '置顶',
        isShow: '是',
        updateTime: '2019-03-07',
        founder: 'admin',
        operation: ['修改','删除']
      }]
    }
  },

  methods: {
    // 去到新增
    goAdd () {
      this.$router.replace('newsadd')
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
}
</script>

<style lang="scss" scoped>
.banner-admin {
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
