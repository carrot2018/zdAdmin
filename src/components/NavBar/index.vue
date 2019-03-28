<template>
  <ul class="nav-bar">
    <!-- <router-link 
      v-for="(item, index) in bars"
      :key="index"
      :to="{ path: item.path }"
      :class="item.id"
      active-class="z-act"
      tag="li">
      <i class="img"></i>
      <span v-text="item.title"></span>
    </router-link> -->
    <!-- <el-tree 
    :data="tree" 
    :props="defaultProps"
    node-key="id"
    @node-click="handleNodeClick" 
    :default-expand-all="true"
    :highlight-current="true">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <i :class="node.icon"></i>{{ node.label }}
        </span>              
      </span>
    </el-tree> -->
    <el-menu
      :default-active="thisRoute"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router>
      <el-submenu index="/news">
        <template slot="title">
          <i class="icon-news img"></i>
          <span>新闻管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/news/newsadmin">内容管理</el-menu-item>
          <el-menu-item index="/news/newsadd">新闻新增</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/recruit">
        <template slot="title">
          <i class="icon-recruit img"></i>
          <span>招聘管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/recruit/recruitadmin">招聘管理</el-menu-item>
          <el-menu-item index="/recruit/recruitadd">招聘新增</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/message">
        <template slot="title">
          <i class="icon-message img"></i>
          <span>留言管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/message/messageadmin">留言管理</el-menu-item>
          <el-menu-item index="/message/messagedetails">留言处理</el-menu-item>
          <el-menu-item index="/message/messagecheck">留言查看</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="/banner">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>轮播管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/banner/banneradmin">轮播管理</el-menu-item>
          <el-menu-item index="/banner/banneradd">轮播新增</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </ul>
</template>

<script>
export default {
  name: 'Navbar',

  data () {
    return {
      isCollapse: true,
      thisRoute: ''
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },

  mounted() {
    // 导航跟踪当前路由，高亮菜单选项
    this.thisRoute = this.$route.fullPath
  },

  watch: {
    $route(to,from){
      // 监听路由变化，高亮菜单选项
      this.thisRoute = to.path
    }
  },
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
  }

.nav-bar {
  height: 100%;
  width: 200px;
  box-shadow: 3px 0 3px -2px #666;
}

.el-submenu__title {
  display: flex;
}

.img {
  width: 22px;
  height: 22px;
  display: inline-block;
  background-size: 100%;
}

.icon-news {
  background-image: url('./images/news.png');
}

.icon-recruit {
  background-image: url('./images/zhaopin.png');
}

.icon-message {
  background-image: url('./images/liuyan.png');
}

// .nav-bar {
//   background: #cccccc;
//   height: 100%;
//   width: 15%;
//   flex-shrink: 0;
//   display: flex;
//   flex-direction: column;
//   overflow-y: auto;
//   li {
//     height: 80px;
//     line-height: 80px;
//     text-align: center;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     .img {
//       width: 22px;
//       height: 22px;
//       display: block;
//       background-size: 100%;
//     }
//     &.news {
//       .img {
//         background-image: url('./images/news.png');
//       }
//     }
//     &.banner {
//       .img {
//         background-image: url('./images/news.png');
//       }
//     }
//     &.recruit {
//       .img {
//         background-image: url('./images/news.png');
//       }
//     }
//     &.message {
//       .img {
//         background-image: url('./images/news.png');
//       }
//     }
//     &.z-act {
//       color: #409EFF;
//     }
//   }
// }
</style>
