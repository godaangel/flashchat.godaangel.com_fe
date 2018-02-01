<template>
<wii-page>
  <wii-panel>
    <wii-cell-title>填写用户名</wii-cell-title>
    <wii-cells>
      <wii-input :conf="{label: '用户名', name: 'username'}" v-model="username"></wii-input>
    </wii-cells>
    <wii-cell-tips :conf="{}">填写完用户名以后才能进入聊天哦~</wii-cell-tips>
    <div class="buttons">
      <wii-button @on-click-handler="toPage">进入</wii-button>
    </div>
  </wii-panel>
</wii-page>
</template>

<script>
import Base from '@/views/base.js';

export default {
  name: 'Index',
  mixins: [Base],
  data () {
    return {
      username: ''
    }
  },
  methods: {
    toPage(){
      console.log('click', this.username);
      if(this.username){
        this.setSessionStorage('username', this.username);
        this.$router.push({name: 'Chat'});
      }else{
        this.$wii.toast.show({
          text: '请填写用户名',
          type: 'warn',
          time: 1500
        });
      }
    }
  }
}
</script>
<style lang="less">
  .buttons{
    margin-top: 15px;
    padding: 0 15px;
  }
</style>
