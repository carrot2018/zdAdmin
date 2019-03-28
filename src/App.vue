<template>
  <div id="app" class="mask">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import Element from 'element-ui';
Vue.use(Element, { size: 'small', zIndex: 3000 });
export default {
  name: 'App',
  // components: {
  //   HelloWorld
  // }
}
</script>

<style>

</style>
<style lang="scss">
@import './styles/base.scss';
</style>
