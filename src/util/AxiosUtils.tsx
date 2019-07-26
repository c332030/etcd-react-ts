/**
 * <p>
 *   Description: AxiosUtils
 * </p>
 * @author c332030（袁兴旺）
 * @version 1.0
 * @date 2019-7-16 10:09
 */

import axios, {AxiosInstance} from 'axios';

import {
  Tools
} from '@c332030/common-utils-ts'

import {
  AxiosConfig
} from '@c332030/common-http-ts'

/**
 * 配置信息
 */
class AxiosUtils {

  /**
   * Axios 配置信息
   */
  private axiosConfig: AxiosConfig = {
    proxy: {
      url: 'http://localhost:404'
    }
  };

  /**
   * Axios 实例
   */
  public axiosInstance: AxiosInstance = axios.create({

    // baseURL: "http://work.server.c332030.com:2379", // api的base_url
    // timeout: 60,

    xsrfCookieName: 'xsrf-token'
  });

  constructor(){

    this.initInterceptors();

    // this.axiosInstance.get(configUrl).then(e => {
    //
    //   console.log('then');
    //   console.log(e);
    //
    //   this.axiosConfig = e.data;
    //
    //   console.log("axiosConfig");
    //   console.log(this.axiosConfig);
    //
    //
    // }).catch(e => {
    //
    //   console.log("catch");
    //   console.log(e);
    //
    //   throw e;
    // });
  }

  /**
   * 初始化拦截器
   */
  private initInterceptors() {

    console.log('init initInterceptors');

    /**
     * 添加 请求报文 拦截器
     */
    this.axiosInstance.interceptors.request.use((config) => {

      // console.log(config);

      const url = config.url;
      const configUrl = Tools.get<string>(this.axiosConfig, 'proxy.url');

      Tools.notEmpty(configUrl, '代理链接为空');

      if(url === configUrl) {
        return config;
      }

      config.url = configUrl;

      // console.log(config);
      let data = config.data;
      if(!data) {
        data = {};
      }

      config.data = Object.assign(
        {
          body: data,
          head: {
            proxy: {
              url: url
            }
          }
        }
      );

      return config;
    }, (error) => {
      return Promise.reject(error);
    });

    /**
     * 添加 返回报文 拦截器
     */
    this.axiosInstance.interceptors.response.use(response => {
      return Promise.resolve(response);
    }, response => {
      return Promise.reject(response);
    });
  }
}

const axiosUtils = new AxiosUtils();

export default axiosUtils.axiosInstance;
