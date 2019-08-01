/**
 * <p>Description: EtcdNode 报文节点 </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-12 18:09
 */

export interface EtcdNode {

  /**
   * 链接
   */
  url?: string

  /**
   * 名字
   */
  label?: string

  /**
   * 键
   */
  key?: string

  /**
   * 值
   */
  value?: string

  /**
   * 是否为目录
   */
  dir?: boolean

  /**
   * 目录下的值
   */
  nodes?: EtcdNode[]

  /**
   * 创建时的索引
   */
  createdIndex?: number

  /**
   * 修改时的索引
   */
  modifiedIndex?: number

  /**
   * 过期时间
   */
  expiration?: string

  /**
   * 生存时间，单位：秒
   */
  ttl?: number
}
