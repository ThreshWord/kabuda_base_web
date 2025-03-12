/**
 * # 标准的JSON数据
 * @author dyz
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IJson<V = any> {
  /**
   * JSON的键
   */
  [x: string]: V
}
