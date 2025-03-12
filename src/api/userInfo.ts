/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@/utils/server'

export class UserInfoService extends Service {
  /**
   * # 获取菜单
   */
  getMenu(): Promise<any> {
    return this.api('/v1/authorized/captcha').get()
  }
}
