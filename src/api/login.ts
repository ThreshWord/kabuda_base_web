/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@/utils/server'

export class LoginService extends Service {
  /**
   * # 登录
   * @param model 登录信息
   */
  login(model: {
    username: string
    password: string
    captcha: string
    captchaId: string
  }): Promise<any> {
    return this.api('/v1/authorized/login').post(model)
  }

  /**
   * # 获取验证码
   */
  getCaptcha(): Promise<any> {
    return this.api('/v1/authorized/captcha').get()
  }
}
