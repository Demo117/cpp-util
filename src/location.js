const splitOnFirst = (string, separator) => {
    if (!(typeof string === 'string' && typeof separator === 'string')) {
      throw new TypeError('Expected the arguments to be of type `string`');
    }
  
    if (separator === '') {
      return [string];
    }
  
    const separatorIndex = string.indexOf(separator);
  
    if (separatorIndex === -1) {
      return [string];
    }
  
    return [
      string.slice(0, separatorIndex),
      string.slice(separatorIndex + separator.length),
    ];
  };
  
  /**
   * 向给定的URL添加query参数
   * @param {string} url
   * @param {object} query
   * @returns {string}
   */
  export const appendQuery = (url, query = {}) => {
    const arrFromQuery = Object.entries(query);
    if (!arrFromQuery.length) {
      return url;
    }
    const qsFromQuery = arrFromQuery.map(([key, value]) => `${key}=${value}`).
      join('&');
    const connector = url.includes('?') ? '&' : '?';
    return `${url}${connector}${qsFromQuery}`;
  };
  
  /**
   * 获取 URL 参数字符串
   * @param {string} str url地址
   * @return {string} a=xxx&b=XX
   */
  export function getQueryString(str) {
    if (!str) {
      return '';
    }
    let arrUrl = str.split('?');
    return arrUrl[1] || str;
  }
  
  /**
   * 从给定完整URL解析queryParams对象
   * @param {string} [url]
   * @returns {null|{[p: string]: string}}
   */
  export const getQueryParams = (url) => {
    const url_ = url || window.location.href;
    try {
      return Object.fromEntries(new URL(url_).searchParams);
    } catch (e) {}
    return null;
  };
  
  /**
   * 获取 URL 参数
   * @param {string} [url] url 地址，默认取当前浏览器地址参数
   * @param {boolean} noDecode 参数是否encode
   * @param {string|array} name 希望获取的参数名称, 默认返回所有参数
   * @return {string|object}
   */
  export function getUrlQuery(name = '', noDecode = false, url) {
  
    let str = url || window.location.search;
  
    let getQueryParameters = function(str) {
      str = getQueryString(str);
      // 如果str为空，则返回空对象
      if (!str) return {};
      return str.split('&').map(function(kv) {
        kv = splitOnFirst(kv, '=');
        this[kv[0]] = noDecode ? kv[1] : decodeURIComponent(kv[1]);
        return this;
      }.bind({}))[0];
    };
  
    let obj = getQueryParameters(str);
  
    if (!name) return obj;
  
    if (Object.prototype.toString.call(name) === '[object Array]') {
      let result = {};
      for (let i = 0; i < name.length; i++) {
        result[name[i]] = obj[name[i]] || null;
      }
      return result;
    } else {
      return obj[name];
    }
  }
  
  /**
   * 查询不带协议名称的Url
   * @param {string} str url地址
   * @return {string} m-sit.immotors.com/app/XXX?a=xxx&b=XX
   */
  export const getPathUrl = (str) => {
    if (!str) {
      return '';
    }
    let arrUrl = str.split('//');
    return arrUrl[1] || str;
  };
  
  /**
   * 查询不带协议名称的Path
   * @param {string} str url地址
   * @return {string} m-sit.immotors.com/app/XXX
   */
  export const getPath = (str) => {
    if (!str) {
      return '';
    }
    let arrUrl = getPathUrl(str).split('?');
    return arrUrl[0];
  };
  
  /**
   * 删除url中的参数
   * @param {string} url url地址
   * @param {string[]} queryList 待删除参数列表
   * @return {string}
   */
  export const deleteQuery = (url, queryList = []) => {
    let obj = {}, index = url.indexOf('?');
    let paraString = url.slice(index + 1).split('&');
    for (let item of paraString) {
      const [key, value] = item.split('=');
      if (key && !queryList.includes(key)) {
        obj[key] = value;
      }
    }
    return `${url.slice(0, index + 1)}${serialize(obj)}`;
  };
  
  /**
   * 序列化参数列表
   * @param {object} param 所有参数对象
   * @return {string}
   */
  export const serialize = (param = {}) => {
    const s = [];
    const add = (k, v) => {
      v = typeof v === 'function' ? v() : v;
      v = v === null ? '' : v === undefined ? '' : v;
      s[s.length] = encodeURIComponent(k) + '=' + encodeURIComponent(v);
    };
    const buildParams = (prefix, obj) => {
      let i, len, key;
  
      if (prefix) {
        if (Array.isArray(obj)) {
          for (i = 0, len = obj.length; i < len; i++) {
            buildParams(
              prefix + '[' + (typeof obj[i] === 'object' && obj[i] ? i : '') + ']',
              obj[i],
            );
          }
        } else if (String(obj) === '[object Object]') {
          for (key in obj) {
            buildParams(prefix + '[' + key + ']', obj[key]);
          }
        } else {
          add(prefix, obj);
        }
      } else if (Array.isArray(obj)) {
        for (i = 0, len = obj.length; i < len; i++) {
          add(obj[i].name, obj[i].value);
        }
      } else {
        for (key in obj) {
          buildParams(key, obj[key]);
        }
      }
      return s;
    };
  
    return buildParams('', param).join('&');
  };
  