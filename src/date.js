/**
 * @author chenpengpeng
 * @description 通用timeFormat(day, format),其中time表示时间对象或者时间戳,format表示时间具体的格式
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * 例子：
 * Format(time, "yyyy-MM-dd hh:mm:ss.S" ==> 2016-07-02 08:09:04.423
 * Format(time, "yyyy-M-d h:m:s.S" ==> 2016-7-2 8:9:4.18
 * @date 2021-9-19
 */

/* eslint-disable no-console */
export function timeFormat(time, format) {
  let dateO;
  if (typeof time == 'number' && time.toString().length === 13) {
    dateO = new Date(time);
  } else if (time instanceof Date) {
    dateO = time;
  } else {
    return;
  }

  const date = {
    'M+': dateO.getMonth() + 1,
    'd+': dateO.getDate(),
    'h+': dateO.getHours(),
    'm+': dateO.getMinutes(),
    's+': dateO.getSeconds(),
    'q+': Math.floor((dateO.getMonth() + 3) / 3),
    'S+': dateO.getMilliseconds(),
  };

  //增加周几
  const weekList = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
  };

  const month = date['M+'] < 10 ? '0' + date['M+'] : date['M+'];
  const day = date['d+'] < 10 ? '0' + date['d+'] : date['d+'];
  const weekday = dateO.getDay();

  if (format === 'yyyyMMdd-China') {
    return '' + dateO.getFullYear() + '年' + month + '月' + day + '日';
  }
  if (format === 'MMdd-China') {
    return '' + month + '月' + day + '日';
  }
  //格式为：“X月X日(周几)”
  if (format === 'MMdd-China-week') {
    return '' + month + '月' + day + '日' + ' (周' + weekList[weekday] + ')';
  }

  if (format === 'hhmmss-China') {
    console.log(time);
    return '' + dateO.getHours() + '时' + dateO.getMinutes() + '分' +
      dateO.getSeconds() + '秒';
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1,
      (dateO.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }
  return format;
}

/**
 * 根据年月获取日期列表
 * @param {number} year
 * @param {number} month
 * @returns {number}
 */
export function getDates(year, month) {
  if (month === 2) {
    return (year % 400 === 0) || (year % 100 !== 0 && year % 4 === 0)
      ? 29 : 28;
  }
  if (/4|6|9|11/.test(String(month))) {
    return 30;
  }
  return 31;
}
