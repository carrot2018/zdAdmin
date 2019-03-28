<template>
<!-- 首页 -->
  <div class="home">
    <Head></Head>
    <div class="content">
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
  }
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
