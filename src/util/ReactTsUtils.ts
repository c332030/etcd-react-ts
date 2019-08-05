import {AxiosError} from "axios";
import {Notification} from "element-react";

import {
  log
  ,get
  ,getNullable
} from '@c332030/common-utils-ts'

/**
 * <p>
 *   Description: ReactTsUtils
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-31 9:52
 */
export class ReactTsUtils {

  /**
   * 处理错误
   * @param error
   */
  public static handleError(error: AxiosError | string){

    const debug = false;
    if(debug) {
      log('handleError');
      log(error);
    }

    if(typeof error === 'string') {
      Notification.error(error);
      return;
    }

    if(debug) {
      for(let key in error) {
        log(`key= ${key}`);
        log(getNullable(error, key));
      }
    }

    const msg: string = get(error, 'data.message'
      ,get(error, 'Notification', '通讯发生异常')
    );

    Notification.error(msg);
  }
}

export const handleError = ReactTsUtils.handleError;
