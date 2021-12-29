/**
 * Created by chenpengpeng on 2021/8/11.
 */
// 节流
export function throttle(fn, threshhold, scope) {
	threshhold || (threshhold = 250)
	var last, deferTimer
	return function() {
		var context = scope || this

		var now = +new Date(),
			args = arguments
		if (last && now < last + threshhold) {
			// hold on to it
			clearTimeout(deferTimer)
			deferTimer = setTimeout(function() {
				last = now
				fn.apply(context, args)
			}, threshhold)
		} else {
			last = now
			fn.apply(context, args)
		}
	}
}
//防抖
export function debounce(fn, threshhold) {
    let time = null
    return function () {
      if (time) {
        clearInterval(time)
      }
      time = setTimeout(fn, threshhold)
    }
}