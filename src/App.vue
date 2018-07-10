<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>  
     <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'
import Player from 'components/player/player'
export default {
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .fade-enter
    opacity: 0
  .fade-enter-active
    transition: opacity .2s
  .fade-leave
    opacity: 1
  .fade-leave-active
    opacity: 0
    transition: opacity .2s
</style>
