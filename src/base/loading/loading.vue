<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif" alt="">
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        title: String,
        default: '正在载入...'
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .loading
    width 100%
    text-align center
    .desc
      line-height 20px
      font-szie $font-size-small
      color $color-text-l
      padding-top 10px
</style>
