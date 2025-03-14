/**
 * # API兼容类
 * @author dyz
 */
export class storageApi {
  /**
   * # 获取缓存的值
   * @param key 缓存的Key
   * @returns 缓存的值
   */
  public static getStorage(key: string): string {
    const value = localStorage.getItem(key)
    return value ? value.toString() : ''
  }

  /**
   * # 设置缓存
   * @param key 缓存的Key
   * @param value 缓存的值
   */
  public static setStorage(key: string, value: string | number) {
    localStorage.setItem(key, value.toString())
  }

  /**
   * # 移除缓存
   * @param key 缓存的Key
   */
  static removeStorage(key: string) {
    localStorage.removeItem(key)
  }
}
