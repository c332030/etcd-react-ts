/**
 * <p>Description: Etcd 实体类 </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-12 17:57
 */

import Node from "./EtcdNode";

interface Etcd {

  /**
   * 类型
   */
  action: string

  /**
   * 节点信息
   */
  node: Node

  /**
   * 原节点信息
   */
  prevNode: Node
}

export default Etcd;
