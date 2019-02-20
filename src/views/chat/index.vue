<template>
<wii-page>
  <div class="chat-container">
    <div class="chat-header">
      当前聊天人数({{userNumber}})
    </div>
    <div class="main" id="main">
      <template v-for="chat in chat_list">
        <div class="message-block right" v-if="chat.username == username">
          <div class="message">
            <div class="username">{{chat.username}}</div>
            <div class="text">
              <div class="context">{{chat.msg}}</div>
            </div>
          </div>
          <div class="header">
            <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3599989605,2377066072&fm=27&gp=0.jpg" :alt="chat.username">
          </div>
        </div>

        <div class="message-block" v-else>
          <div class="header">
            <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3599989605,2377066072&fm=27&gp=0.jpg" :alt="chat.username">
          </div>
          <div class="message">
            <div class="username">{{chat.username}}</div>
            <div class="text">
              <div class="context">{{chat.msg}}</div>
            </div>
          </div>
        </div>

        <div class="clear"></div>
      </template>
      
    </div>
    <div class="footer">
      <div class="chat-box">
        <input class="chat-input" type="text" v-model="message" placeholder="说点什么吧...">
        <wii-button @on-click-handler="sendMsg" :conf="{class_name: 'weui-btn_mini'}">发送</wii-button>
      </div>
    </div>
  </div>
</wii-page>
</template>

<script>
let wsServer = new WebSocket('ws://flashchat.godaangel.com/chat');
// let wsServer = new WebSocket('ws://127.0.0.1:3001/chat');
export default {
  name: 'ChatIndex',
  data () {
    return {
      username: window.sessionStorage['username']||'外星人',
      chat_list: [],
      message: '',
      userNumber: 0
    }
  },
  mounted(){
    var that = this;

    wsServer.onopen = function(e) {
      var msg = JSON.stringify({msg: e, user: that.username});
      (typeof e == 'string') && wsServer.send(msg); //向后台发送数据
    };
    wsServer.onclose = function(e) { //当链接关闭的时候触发
      console.log(e);
    };
    wsServer.onmessage = function(e) { //后台返回消息的时候触发
      console.log('onmessage',e);
      try{
        var res = JSON.parse(e.data);
        that.chat_list.push({
          username: res.user,
          msg: res.msg
        });
        that.userNumber = res.userNumber;
        // document.getElementById('chatbox').innerHTML += (res.user + ': ' + res.msg + '<br>');
      }catch(err){
        that.chat_list.push({
          username: '系统消息',
          msg: e.data
        })
        // document.getElementById('chatbox').innerHTML += (e.data + '<br>');
      }

      that.$nextTick(() => {
        var mainDom = document.getElementById('main');
        mainDom.scrollTop = mainDom.scrollHeight;
      })
    };
    wsServer.onerror = function(e) { //错误情况触发
      console.log('error');
    }

    setTimeout(function(){
      wsServer.onopen('我来啦');
    },1000);
  },
  methods: {
    sendMsg(){
      if(this.message){
        wsServer.onopen(this.message);
        this.message = '';
      }
    }
  }
}
</script>
<style lang="less">
.chat-container{
  display: flex;
  flex-direction: column; 
  height: 100%;
  .chat-header{
    height: 40/20rem;
    line-height: 40/20rem;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    text-align: center;
    font-size: 13/20rem;
    color: #999;
  }
  .main{
    flex: 1;
    overflow-y: auto;
    background: #fafafa;
    padding: 15/20rem 10/20rem;
    font-size: 15/20rem;
    .clear{
      clear: both;
    }
    .message-block{
      display: flex;
      max-width: 300/20rem;
      margin-bottom: 20/20rem;
      float: left;
      &.right{
        float: right;
        .header{
          margin-right: 0/20rem;
          margin-left: 8/20rem;
        }
        .message{
          .username{
            text-align: right;
          }
          .text{
            .context{
              background: rgb(160,230,73);
            }
            &:before{
              content: ' ';
              display: block;
              position: absolute;
              border-left: 6/20rem solid rgb(160,230,73);
              border-right: none;
              border-top: 6/20rem solid transparent;
              border-bottom: 6/20rem solid transparent;
              right: -6/20rem;
              left: auto;
              top: 10/20rem;
              filter: drop-shadow(0px 0px 1px #ddd);
              z-index: 0;
            }
          }
        }
      }
      .header{
        width: 40/20rem;
        height: 40/20rem;
        margin-right: 8/20rem;
        flex-shrink: 0;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .message{
        flex: 1;
        .username{
          line-height: 1;
          font-size: 13/20rem;
          margin-bottom: 6/20rem;
          color: #999;
        }
        .text{
          border: 1px solid #eee;
          position: relative;
          filter: drop-shadow(0px 0px 0px #ddd);
          border-radius: 3px;
          .context{
            position: relative;
            z-index: 1;
            padding: 8/20rem 8/20rem;
            background: #fff;
            line-height: 1.2;
            word-break: break-all;
            border-radius: 3px;
          }
          &:before{
            content: ' ';
            display: block;
            position: absolute;
            border-right: 6/20rem solid #fff;
            border-top: 6/20rem solid transparent;
            border-bottom: 6/20rem solid transparent;
            left: -6/20rem;
            top: 10/20rem;
            filter: drop-shadow(0px 0px 1px #ddd);
            z-index: 0;
          }
        }
      }
    }
  }
  .footer{
    height: 60/20rem;
    border-top: 1px solid #eee;
    padding-top: 10/20rem;
    box-sizing: border-box;
    .chat-box{
      display: flex;
      flex-shrink: 0;
      height: 40/20rem;
      .chat-input{
        flex: 1; 
        margin: 0 5/20rem 0 10/20rem;
        padding: 0 8/20rem;
        outline: none;
        font-size: 15/20rem;
        border-radius: 3px;
        border: 1px solid #eee;
        -webkit-appearance: none;
      }
      .wii-btn{
        width: 60/20rem;
        padding: 0;
        margin: 0 10/20rem 0 5/20rem;
        font-size: 15/20rem;
      }
    }
  }
}
</style>
