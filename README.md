# flash-chat 闪聊  

演示网站[闪聊](http://flashchat.godaangel.com)

> 闪聊前端代码，就是一个websocket的练手demo而已~通过输入用户名，进入聊天室聊天，可以显示当前在线人数  
##### 注意事项
* build的时候需要根据配套express框架来构建打包路径，见config/index.js
* 配套后端地址[github](https://github.com/godaangel/flashchat.godaangel.com)
* 如果发布到服务器上，需要修改websocket连接的ip地址为服务器地址

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
