<template>
<!-- 首页 -->
  <div class="home">
    <Head :isShow1="isClose"></Head>
    <div @click="closePop" class="content">
      <NavBar></NavBar>
      <router-view class="right"></router-view>
    </div>
  </div>

</template>

<script>
import NavBar from '../components/NavBar';
import Head from '../components/Head';
export default ({
  name: 'Home',
  components: {
    NavBar,
    Head
  },

  data() {
    return {
      isClose: true
    }
  },

  methods: {
    // 点击头部下面的部分关闭弹出框
    closePop() {
      this.isClose = false;
      setTimeout(() => {
        this.isClose = true
      }, 50);
    }
  },
})
</script>

<style lang="scss" scoped>
  .home {
    display: flex;
    flex-direction: column;
    height: 100%;
    .content {
      flex: 1;
      display: flex;
      .right {
        flex: 1;
        overflow-y: auto;
        &::-webkit-scrollbar {
            display: none;
        }
      }
    }
  }
</style>
