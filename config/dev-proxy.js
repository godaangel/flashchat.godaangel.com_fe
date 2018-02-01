/**
 * 配置dev环境下的接口代理路径
 * example: '/api/user_info' 会被转发到 'http://daizong.qq.com:9002/api/user_info'
 */

var target = 'http://daizong.qq.com:3000';
var ws_target = 'ws://127.0.0.1:3000';

module.exports = {
    proxys: {
        '/chat': {
            target: ws_target,
            changeOrigin: true
        }
    }
}
