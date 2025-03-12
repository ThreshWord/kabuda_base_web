/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  type AxiosRequestConfig,
  type AxiosRequestHeaders,
  type AxiosResponse,
  type AxiosResponseHeaders,
  type Method,
} from 'axios'
import type { Ref } from 'vue'
import { Notification } from '@/messageFeedback/notification'
import { HttpContentType } from '../enum/httpContentType'
import { HttpMethod } from '../enum/httpMethod'
import { Config } from '../config/config'
import type { IJson } from '../interface/IJson'

/**
 * # 网络请求类
 * @author dyz
 */
export class Http {
  /**
   * # 访问的接口URL
   */
  private url = ''

  /**
   * # Loading
   */
  private loading!: Ref<boolean>

  /**
   * # 基础返回对象
   */
  private axiosResponse!: Promise<AxiosResponse<any, any>>

  /**
   * # 基础请求配置
   */
  private axiosRequestConfig: AxiosRequestConfig = {}

  /**
   * # 是否隐藏自动错误提示
   */
  private errorCallback = false

  /**
   * # 请求超时毫秒数
   */
  private timeout = Config.timeout

  /**
   * # 设置请求超时时间
   * @param timeout 超时毫秒数
   */
  setTimeout(timeout: number) {
    this.timeout = timeout
    return this
  }

  /**
   * # 是否回调错误信息
   */
  callbackError(): this {
    this.errorCallback = true
    return this
  }

  /**
   * # 创建一个HTTP实例
   * @param url (可选) 请求的地址
   */
  constructor(url?: string) {
    if (url) {
      this.url = url
    }
    // 初始化一些默认值
    this.axiosRequestConfig.method = <Method>HttpMethod.POST
    this.axiosRequestConfig.baseURL = Config.apiUrl
    this.axiosRequestConfig.timeout = this.timeout
    this.axiosRequestConfig.headers = {
      'content-type': HttpContentType.JSON,
    }

    const accessToken = Config.authorizationHeaderType + Config.getAccessToken()
    if (accessToken) {
      this.axiosRequestConfig.headers[Config.authorizationHeaderKey] = accessToken
    }
    if (url) {
      this.url = url
    }
  }

  /**
   * # 创建一个Http客户端
   * @param url 请求的URL
   */
  static create(url: string): Http {
    return new Http(url)
  }

  /**
   * # 设置Loading的Ref对象
   * @param loading Loading的Ref
   *
   */
  setLoading(loading: Ref<boolean>): this {
    this.loading = loading
    return this
  }

  /**
   * # 设置请求头
   * @param header 请求头
   */
  setHttpHeader(header: IJson): this {
    if (this.axiosRequestConfig.headers && this.axiosRequestConfig.headers['content-type']) {
      header = { ...header, 'content-type': this.axiosRequestConfig.headers['content-type'] }
    }
    this.axiosRequestConfig.headers = header as AxiosRequestHeaders
    return this
  }

  /**
   * # 允许携带Cookies
   */
  withCredentials(): this {
    this.axiosRequestConfig.withCredentials = true
    return this
  }

  /**
   * # 添加一个请求头
   * @param key 请求头key
   * @param value 请求头value
   */
  addHttpHeader(key: string, value: string): this {
    this.axiosRequestConfig.headers =
      this.axiosRequestConfig.headers || ({} as AxiosResponseHeaders)
    this.axiosRequestConfig.headers[key] = value
    return this
  }

  /**
   * # 设置请求方法
   * - 支持直接调用 ```.post()``` ```.get()```
   * @param method 请求方法
   */
  setHttpMethod(method: HttpMethod): this {
    this.axiosRequestConfig.method = <Method>method
    return this
  }

  /**
   * # 设置请求content-type
   * @param contentType content-type
   */
  setContentType(contentType: HttpContentType): this {
    this.axiosRequestConfig.headers = {
      ...this.axiosRequestConfig.headers,
      'content-type': contentType,
    }
    return this
  }

  /**
   * # 发送请求
   *
   * @param body (可选)请求体
   * @see post() 直接发送POST
   * @see get() 直接发送GET
   */
  send(body?: any): Promise<any> {
    /**
     * 如传入了自定义的loading, 则标记loading
     */
    if (this.loading) {
      this.loading.value = true
    }
    switch (this.axiosRequestConfig.method) {
      case HttpMethod.POST:
        this.axiosResponse = axios.post(this.url, body, this.axiosRequestConfig)
        break
      case HttpMethod.PUT:
        this.axiosResponse = axios.put(this.url, body, this.axiosRequestConfig)
        break
      case HttpMethod.PATCH:
        this.axiosResponse = axios.patch(this.url, body, this.axiosRequestConfig)
        break
      case HttpMethod.DELETE:
        this.axiosResponse = axios.delete(this.url, this.axiosRequestConfig)
        break
      default:
        this.axiosResponse = axios.get(this.url, this.axiosRequestConfig)
    }
    return new Promise((data, error) => {
      this.axiosResponse
        .then((res) => {
          if (this.loading) {
            this.loading.value = false
          }
          switch (res.data[Config.httpCodeKey]) {
            case Config.successCode:
              // 成功
              data(res.data[Config.httpDataKey])
              break
            case Config.unAuthorizeCode:
              // 需要登录
              if (Config.router) {
                if (this.errorCallback) {
                  error(res.data)
                } else {
                  Config.router.push('/login')
                }
              } else {
                Notification.error('请为Config 注入当前项目的路由', '请先登录')
              }
              break
            default:
              // 其他业务错误
              if (!this.errorCallback) {
                Notification.error(
                  res.data[Config.httpMessageKey] || Config.errorMessage,
                  Config.errorTitle,
                )
              }
              error(res.data)
          }
        })
        .catch((err) => {
          // 其他错误
          if (this.loading) {
            this.loading.value = false
          }
          if (!this.errorCallback) {
            Notification.error(Config.errorMessage, Config.errorTitle)
          }
          error(err)
        })
    })
  }

  /**
   * # 发送POST
   * @param model 发送的数据模型(数组)
   */
  post<T>(model?: T | T[]): Promise<IJson | IJson[]> {
    this.setHttpMethod(HttpMethod.POST)
    return this.send(model)
  }

  /**
   * # 发送GET请求 只支持简单一维数据
   * @param params (可选)可携带的参数
   */
  get(params?: IJson): Promise<any> {
    if (params) {
      const queryArray = []

      for (const key in params) {
        queryArray.push(`${key}=${encodeURIComponent(params[key])}`)
      }
      if (this.url.includes('?')) {
        this.url += `&${queryArray.join('&')}`
      } else {
        this.url += `?${queryArray.join('&')}`
      }
    }
    this.setHttpMethod(HttpMethod.GET)
    return this.send()
  }
}
