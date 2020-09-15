import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/login',
      component: () => import("@/pages/Login"),
      meta: {
        title: "登录"
      }
    },
    {
      path: '/',
      component: () => import("@/pages/Layout"),
      meta: {
        title: "xx管理系统"
      },
      redirect: "/index",
      children: [{
          path: '/index',
          component: () => import("@/pages/Index"),
          meta: {
            title: "后台首页"
          }
        },
        {
          path: '/menu',
          component: () => import("@/pages/System/Menu"),
          meta: {
            title: "菜单管理"
          }
        },
        {
          path: '/role',
          component: () => import("@/pages/System/Role"),
          meta: {
            title: "角色管理"
          }
        },
        {
          path: '/user',
          component: () => import("@/pages/System/User"),
          meta: {
            title: "管理员管理"
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next();
})

export default router;
