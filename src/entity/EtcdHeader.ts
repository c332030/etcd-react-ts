/**
 * <p>
 *   Description: EtcdHeader
 *   HTTP标头，提供有关为请求提供服务的etcd集群的全局信息
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-12 18:15
 */

enum EtcdHeader {

  /**
   * 当前etcd指数
   */
  'X-Etcd-Index',

  /**
   * etcd索引，但是用于底层的raft协议
   */
  'X-Raft-Index',

  /**
   * 整数，只要在群集中发生etcd主选举，它就会增加。如果此数字快速增加，您可能需要调整选举超时。
   */
  'X-Raft-Term'
}

export default EtcdHeader;
