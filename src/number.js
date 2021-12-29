/**
 * 补全两位数
 * @param {number} val
 */
 export function fill(val) {
    let str = String(val);
    return str.replace(/^([0-9])$/, '0$1');
  }
  
  /**
   * 格式化金额，千分位，保留2位
   */
  export function formatNum(value) {
    let num;
    value = +value;
    num = value.toFixed(2).
      toString().
      replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
    return num;
  }
  /**
   * 格式化金额，千分位
   */
  export function thousandth(n){
    var re=/\d{1,3}(?=(\d{3})+$)/g
    var n1=n.toString().replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2})
    return n1||'-'
}

  export function toHHmm (date) {
	var time;
	var hours = parseInt(date / (1000 * 60 * 60))
	var minutes = parseInt((date % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = (date % (1000 * 60)) / 1000;
	time = ((hours > 0 ? (hours+'小时') : '')  + (minutes >0? (minutes+'分钟') : '')) || '小于1分钟'
	return time;
  }