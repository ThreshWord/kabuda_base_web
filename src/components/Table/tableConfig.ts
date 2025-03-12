import { DateTimeFormatter } from '@/enum/dateTimeFormatter'
/**
 * # 表格的字段配置实现类
 * @author dyz
 */
export interface TableConfig {
  /**
   * # 同table的label字段
   */
  label: string
  /**
   * # 同table的props字段
   */
  props: string

  /**
   * 字段是否溢出隐藏
   */
  tooltip?: boolean
  /**
   * 表格字段宽度
   */
  width?: string | number
  /**
   * # 字段是否为日期时间格式
   */
  isDateTimer?: boolean
  /**
   * 日期时间格式 默认为YYYY-MM-DD HH:mm:ss
   */
  dateTimeFormatter?: string
  /**
   * 是否开启友好时间 如几天前
   */
  friendlyDateTime?: boolean
  /**
   * # 固定左右
   */
  fixed?: 'left' | 'right'
}
