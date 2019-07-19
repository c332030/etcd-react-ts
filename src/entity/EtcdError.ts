/**
 * <p>Description: EtcdError 错误实体类 </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-12 18:11
 */

interface EtcdError {

  /**
   * 错误 键
   */
  cause: string

  /**
   * 错误码
   */
  errorCode: number

  /**
   * 错误信息
   */
  message: string

  /**
   * 错误索引
   */
  index: number
}

export default EtcdError;
