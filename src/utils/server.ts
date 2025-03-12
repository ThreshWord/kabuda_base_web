import type { Ref } from 'vue'
import { Http } from './http'

/**
 * # API服务超类
 * @author dyz
 */
export abstract class Service {
  /**
   * # Loading的ref对象
   * ---
   * ### 💡 你可以将这个传入的对象绑定到你需要Loading的DOM上
   */
  loading!: Ref<boolean>

  /**
   * # 创建一个Http实例
   * @param url 请求的接口地址
   * @param baseUrl (可选) 请求的接口目录
   */
  api(url: string): Http {
    if (this.loading) {
      return Http.create(url).setLoading(this.loading)
    }
    return Http.create(url)
  }

  /**
   * # 静态创建一个API服务实例
   * @param loading (可选)Loading的Ref对象
   */
  static create<S extends Service>(this: new () => S, loading?: Ref<boolean>): S {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const service = Object.assign(new this()) as S
    if (loading) {
      service.loading = loading
    }
    return service
  }
}
