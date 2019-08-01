import {AxiosError} from "axios";
import {Notification} from "element-react";

import {
  log
  ,get
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
        log(get(error, key));
      }
    }

    let msg: string | undefined = get(error, 'data.message');
    if(debug) {
      log('response message');
      log(msg);
    }

    if(!msg) {
      msg = get(error, 'Notification');

      if(debug) {
        log('error Notification');
        log(msg);
      }
    }

    if(!msg) {
      msg = '通讯发生异常';
    }

    Notification.error(msg);
  }
}

export const handleError = ReactTsUtils.handleError;
