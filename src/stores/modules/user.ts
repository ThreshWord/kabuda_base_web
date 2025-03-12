import { defineStore } from 'pinia'
import { LoginService } from '@/api/login'
import { RouterHelp } from '@/router/routerHelp'
const loginServe = new LoginService()
export const userStore = defineStore('user', {
  state: () => {
    return {
      userInfo: {
        name: '',
        avatar: '',
      },
      roles: [] as any[],
    }
  },
  actions: {
    async login(from: any) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await loginServe.login(from)
          resolve(res)
        } catch (error) {
          reject(error)
        }
      })
    },
    async getPermission() {
      return new Promise(async (resolve, reject) => {
        // 模拟数据
        this.roles = [
          {
            path: '/example',
            name: '示例页面',
            id: '1',
            children: [
              {
                path: '/example/index',
                name: '示例页面',
                id: '1-1',
                component: '/example/index',
                children: [],
              },
            ],
          },
          {
            path: '/system',
            name: '系统管理',
            id: '2',
            children: [
              {
                path: '/system/user',
                name: '用户管理',
                id: '2-1',
                component: '/system/user/index',
                children: [],
              },
              {
                path: '/system/role',
                name: '角色管理',
                id: '2-2',
                component: '/system/role/index',
                children: [],
              },
              {
                path: '/system/menu',
                name: '菜单管理',
                id: '2-3',
                component: '/system/menu/index',
                children: [],
              },
            ],
          },
        ]
        RouterHelp.initVueRouter(this.roles, 'layout')
      })
    },
  },
})
