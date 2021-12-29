export const ENV = {
    UNKNOWN: 'unknown',
    LOCAL: 'local',
    DEV: 'dev',
    SIT: 'sit',
    UAT: 'uat',
    PROD: 'prod',
  };
  
  const M_CDN_HOST_MAP = {
    [ENV.UNKNOWN]: '',
    [ENV.LOCAL]: '',
    [ENV.DEV]: '',
    [ENV.SIT]: '//m-cdn-sit.immotors.com',
    [ENV.UAT]: '//m-cdn-uat.immotors.com',
    [ENV.PROD]: '//m-cdn.immotors.com',
  };
  
  const APP_CDN_HOST_MAP = {
    [ENV.UNKNOWN]: '',
    [ENV.LOCAL]: '',
    [ENV.DEV]: '//app-cdn-dev.immotors.com',
    [ENV.SIT]: '//app-cdn-sit.immotors.com',
    [ENV.UAT]: '//app-cdn-uat.immotors.com',
    [ENV.PROD]: '//app-cdn.immotors.com',
  };
  
  const IM_CDN_HOST_MAP = {
    [ENV.UNKNOWN]: '',
    [ENV.LOCAL]: '',
    [ENV.DEV]: '//im-cdn-dev.immotors.com',
    [ENV.SIT]: '//im-cdn-sit.immotors.com',
    [ENV.UAT]: '//im-cdn-uat.immotors.com',
    [ENV.PROD]: '//im-cdn.immotors.com',
  };
  
  const API_HOST_PREFIX = {
    [ENV.UNKNOWN]: '',
    [ENV.LOCAL]: 'http://app-tt.immotors.com:8800/app/planet',
    [ENV.DEV]: 'https://m-dev.immotors.com/app/planet',
    [ENV.SIT]: 'https://m-sit.immotors.com/app/planet',
    [ENV.UAT]: 'https://m-uat.immotors.com/app/planet',
    [ENV.PROD]: 'https://m.immotors.com/app/planet',
  };
  
  const APP_HOST_PREFIX = {
    [ENV.UNKNOWN]: '',
    [ENV.LOCAL]: 'http://app-tt.immotors.com:8080',
    [ENV.DEV]: 'https://m-dev.immotors.com',
    [ENV.SIT]: 'https://m-sit.immotors.com',
    [ENV.UAT]: 'https://m-uat.immotors.com',
    [ENV.PROD]: 'https://m.immotors.com',
  };
  
  const API_H_HOST_PREFIX = {
    [ENV.DEV]: 'https://mh-dev.immotors.com/',
    [ENV.SIT]: 'https://mh-sit.immotors.com/',
    [ENV.UAT]: 'https://mh-uat.immotors.com/',
    [ENV.PROD]: 'https://mh.immotors.com/',
  };
  
  const HOST_EVN_MAP = {
    'm-dev.immotors.com': ENV.DEV,
    'm-sit.immotors.com': ENV.SIT,
    'm-uat.immotors.com': ENV.UAT,
    'm.immotors.com': ENV.PROD,
  };
  
  export const getEnv = () => {
    const {hostname} = window.location;
    let env = HOST_EVN_MAP[hostname];
    if (env) {
      return env;
    } else {
      if (hostname.includes('localhost') ||
        hostname.includes('127.0.0.1') ||
        hostname.includes('.immotors.com')) {
        return ENV.LOCAL;
      } else {
        return ENV.UNKNOWN;
      }
    }
  };
  
  /**
   * @param {string} [env]
   * @returns {string}
   */
  export const getApiHostPrefix = (env) => {
    return API_HOST_PREFIX[env || getEnv()];
  };
  
  export const getAppHostPrefix = () => {
    const {origin} = window.location;
    return APP_HOST_PREFIX[getEnv()] || origin;
  };
  
  /**
   * @param {string} [env]
   * @param {string} [type='m'] cdn类型
   * @returns {string}
   */
  export const getCDNHost = (env, type = 'm') => {
    return {
      'm': M_CDN_HOST_MAP,
      'app': APP_CDN_HOST_MAP,
      'im': IM_CDN_HOST_MAP,
    }[type][env || getEnv()];
  };
  
  export const getHApiHostPrefix = () => {
    return API_H_HOST_PREFIX[getEnv()] || API_H_HOST_PREFIX[ENV.DEV];
  };
  
  export const SHARE_CHANNEL = {
    WECHAT: 'wechat', // 微信
    MOMENT: 'moment', // 朋友圈
    WEIBO: 'weibo', // 微博
    SAVE: 'save', // 保存本地
    UGC: 'ugc', // 发随想
    IM: 'im', // IM聊天
  };
  
  export const SHARE_METHOD = {
    TEXT: 'text',
    URL: 'url',
    IMG: 'img',
    MINIP: 'minip',
    COMMON: 'common',
  };
  
  export const PULL_UP_PAGE_TYPE = {
    H5: 'h5', // 使用webview打开
    NATIVE: 'native', // 使用app activity打开
  };
  