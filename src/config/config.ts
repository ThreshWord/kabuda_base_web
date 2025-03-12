import { createRouter, createWebHistory, type Router, type RouteRecordRaw } from 'vue-router'

import { storageApi } from './storageApi'
import { userStore } from '@/stores/modules/user'
import { Notification } from '@/messageFeedback/notification'
import { DateTimeFormatter } from '@/enum/dateTimeFormatter'
/**
 * #yzyWebBase 全局配置
 * ---
 * 💡 可自行在 ```main.ts``` 中覆盖此类中的配置
 * @author dyz
 */
export class Config {
  /**
   * # 项目名称
   * ---
   * 💡 会显示在浏览器标题上
   */
  static product = '基础框架'

  /**
   * # 😠超时时间 毫秒
   * ---
   * 💡 超时后请求会自动断开并抛出异常
   */
  static timeout = 5000

  /**
   * # 全局http请求返回 成功状态码
   */
  static successCode: number = 200

  /**
   * # 全局http请求返回 登录状态码
   */
  static unAuthorizeCode: number = 401

  /**
   * # 标准错误提示标题
   */
  static errorTitle = '系统错误'

  /**
   * # 标准错误提示内容
   */
  static errorMessage = '系统发生了一些错误，请稍候再试 :)'

  /**
   * # Http返回状态码的字段
   */
  static httpCodeKey = 'code'

  /*
    # 白名单
  */
  WhiteList: string[] = ['/login', '/404']

  /**
   * # Http返回错误信息的字段
   */
  static httpMessageKey = 'message'

  /**
   * # Http返回数据的字段
   */
  static httpDataKey = 'data'

  /**
   * # 默认的格式化时间
   * ---
   * 💡 ```ADateTime``` ```ATable``` 的格式化都将默认使用这个配置
   * ```
   */
  static dateTimeFormatter = DateTimeFormatter.YYYY_MM_DD_HH_mm_ss
  /**
   * # Vue 路由对象
   */
  static router: Router

  /**
   * # AccessToken对应的Key
   * ---
   * 💡 ```缓存的名称``` 和 ```Api传输的Header``` 都叫这个名字
   */
  static authorizationHeaderKey = 'Authorization'

  /**
   * # AccessToken对应的Type
   * ---
   * 💡 ```type一般为Bearer``` 也可 ```通过后端获取```
   */
  static authorizationHeaderType = 'Bearer'

  /**
   * # 保存身份令牌
   * @param accessToken 身份令牌
   */
  static saveAccessToken(accessToken: string): void {
    storageApi.setStorage(this.authorizationHeaderKey, accessToken)
  }

  /**
   * # 获取身份令牌
   */
  static getAccessToken(): string {
    return storageApi.getStorage(this.authorizationHeaderKey)
  }
  /**
   * # 移除本地存储的身份令牌
   */
  static removeAccessToken(): void {
    storageApi.removeStorage(this.authorizationHeaderKey)
  }

  /**
   * # 最近访问的路径
   */
  static lastPathKey = 'last_path'

  /**
   * # 接口根地址
   * ---
   * 💡 以 ```/``` 结尾
   */
  static apiUrl = import.meta.env.VITE_APP_BASE_URL || '/api/'

  /**
   * # WebSocketUrl
   * ---
   * 💡 以 ```/``` 结尾
   */
  static websocketUrl = import.meta.env.VITE_APP_WEBSOCKET_URL

  /**
   * # 设置上次访问的路径
   * @param path
   */
  static setLastPath(path: string): void {
    storageApi.setStorage(this.lastPathKey, path)
  }

  /**
   * # 获取上次访问的路径
   */
  static getLastPath(): string {
    return storageApi.getStorage(this.lastPathKey)
  }
  /**
   * # 是否刷新了页面
   */
  static reloadMenusOnoff = true
  // 刷新页面重新加载菜单
  static reloadMenus = async () => {
    await userStore().getPermission()
  }
  /**
   * 清空非白名单路由
   */
  static resetRouter = () => {
    Config.router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && Config.router.hasRoute(name) && !meta?.isWhiteList) {
        Config.router.removeRoute(name)
      }
    })
  }
  /**
   * # 创建Vue路由实例
   * @param routes 路由配置文件
   * @param ignoreGuard 不使用守卫
   */
  static createRouter(routes: RouteRecordRaw[], ignoreGuard = false) {
    // 创建路由
    const router = createRouter({
      history: createWebHistory(),
      routes,
    })
    router.afterEach(() => {
      window.scrollTo(0, 0)
    })
    if (!ignoreGuard) {
      router.beforeEach((to, _from, next) => {
        if (to.meta.name || to.name) {
          window.document.title = `${to.meta.name || to.name} - ${Config.product}` || Config.product
        }
        if (to.path === '/login') {
          next()
        } else {
          if (this.reloadMenusOnoff) {
            this.reloadMenus()
            this.reloadMenusOnoff = false
            next()
            return
          }
          // if (Config.getAccessToken()) {
          //   next()
          // } else {
          //   Notification.error('未登录，返回登录页')
          //   Config.setLastPath(to.path)
          //   next('/login')
          // }
        }
        next()
      })
    }
    Config.router = router
    return router
  }
}
