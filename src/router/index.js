import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const IndexTpl = resolve => {
    require.ensure(['../views/index.vue'], () => {
        resolve(require('../views/index.vue'))
    })
}

const ChatTpl = resolve => {
    require.ensure(['../views/chat/index.vue'], () => {
        resolve(require('../views/chat/index.vue'))
    })
}

export default new Router({
  routes: [
    {
      path: '/chat',
      name: 'Index',
      component: IndexTpl
    },
    {
      path: '/chat/index',
      name: 'Chat',
      component: ChatTpl
    }, {
        path: '/',
        redirect: '/chat',
        name: 'default'
    }
  ]
})
