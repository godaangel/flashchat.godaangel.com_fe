<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="view"></router-view>
    </transition>
    <!-- <wii-tabbar :conf="tabConf"></wii-tabbar> -->
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  mounted(){
    
  },
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;

      let parentPathList = ['/book', '/mine'];

      // console.log(parentPathList.indexOf(to.path))
      if(toDepth < fromDepth || parentPathList.indexOf(to.path)!=-1 && parentPathList.indexOf(from.path) != -1 && parentPathList.indexOf(to.path) < parentPathList.indexOf(from.path)){
        this.transitionName = 'slide-right'
      }else{
        this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.view{
  transition: all .5s ease;
}
.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
