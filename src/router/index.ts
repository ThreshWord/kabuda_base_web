import type { RouteRecordRaw } from 'vue-router'

/**
 * # 路由配置(初始化公共路由表)
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/login/index.vue'),
    meta: {
      isWhiteList: true,
    },
  },
  {
    path: '/404',
    name: '错误页',
    component: () => import('@/views/error/error_404.vue'),
    meta: {
      isWhiteList: true,
    },
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    children: [],
  },
]
