<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "assets/style/reset";
@import "assets/style/helper";
body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-size: 16px;
  font-family: $font-hei;
  background: #f5f5f5;
}
</style>
