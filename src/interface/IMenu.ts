/**
 * # 标准菜单结构
 * @author dyz
 */
export interface IMenu {
  /**
   * # 菜单URL
   */
  path: string

  /**
   * # 菜单图标
   */
  icon: string

  /**
   * # 菜单绑定组件路径
   */
  component: string

  /**
   * # 菜单是否禁用
   */
  isDisabled: boolean

  /**
   * # 树节点ID
   */
  id: string

  /**
   * # 树节点名称
   */
  name: string

  /**
   * # 树的子节点
   */
  children: IMenu[]

  /**
   * # 父节点ID
   */
  parentId?: number
}
