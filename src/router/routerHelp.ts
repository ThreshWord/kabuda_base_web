import { Config } from '@/config/config'
import type { IMenu } from '@/interface/IMenu'
import { Notification } from '@/messageFeedback/notification'
import { userStore } from '@/stores/modules/user'
const modules = import.meta.glob('../views/**/*.vue')

/**
 * # Vue路由助手
 * @author dyz
 */
let reloadMenusOnoff = true
export class RouterHelp {
  /**
   * # 将Menu菜单列表初始化到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter (可选) 父级路由 默认 '/'
   * @param menuCacheKey (可选) 缓存Key 默认 MenuList
   */
  static initVueRouter(
    menuList: IMenu[],
    parentRouter = 'layout',
    menuCacheKey = 'MenuList',
  ): void {
    localStorage.setItem(menuCacheKey, JSON.stringify(menuList))
    this.addRouterAsync(menuList, parentRouter)
    this.reloadCacheMenuList(menuCacheKey)
  }
  /**
   * # 将菜单添加到Vue路由中
   * @param menuList 菜单列表
   * @param parentRouter 父级路由名称
   */
  private static addRouterAsync(menuList: IMenu[], parentRouter: string): void {
    menuList.forEach((item) => {
      if (item.children && item.children.length > 0) {
        this.addRouterAsync(item.children, parentRouter)
        return
      }
      if (!Config.router) {
        Notification.error('请先向config注入当前路由对象', '配置错误')
        return
      }
      if (!item.name || (!item.path && !item.component)) {
        Notification.error('路由初始化失败，缺少参数')
        return
      }
      if (Config.router.hasRoute(item.id.toString())) {
        return
      }
      Config.router.addRoute(parentRouter, {
        path: item.path,
        name: item.id.toString(),
        meta: {
          name: item.name,
        },
        component: modules[`../views${item.component || item.path}.vue`],
      })
    })
  }

  /**
   * # 重载缓存中的路由
   * @param menuCacheKey 提供缓存的Key
   * @param menuList (可选)子菜单,好兄弟,你不用传。
   */
  private static reloadCacheMenuList(menuCacheKey: string, menuList?: IMenu[]): void {
    if (!Config.router) {
      return
    }
    if (!menuList && localStorage.getItem(menuCacheKey)) {
      menuList = JSON.parse(localStorage.getItem(menuCacheKey) || '[]')
    }
    if (menuList === undefined) {
      return
    }
    for (const item of menuList) {
      if (item.children && item.children.length > 0) {
        this.reloadCacheMenuList(menuCacheKey, item.children)

        continue
      }

      const locationPathName = location.pathname
      if (item.path === locationPathName) {
        localStorage.removeItem(menuCacheKey)

        Config.router.replace(locationPathName + location.search)
        break
      }
    }
  }
}
