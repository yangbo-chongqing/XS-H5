/**
 * @description debounce方法
 * @author liwenxuan
 * @update 2020/07/21
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @description throttle方法
 * @author liwenxuan
 * @update 2020/07/21
 */


export function throttle (func, wait) {
  const args = arguments
  let timer
  let start
  return function loop () {
    const self = this
    const now = Date.now()
    !start && (start = now)
    timer && clearTimeout(timer)
    if (now - start >= wait) {
      func.apply(self, args)
      start = now
    } else {
      //  递归调用 - 更新最新事件的延时器
      timer = setTimeout(function () {
        loop.apply(self, args) //  50ms - 调用自身方法，获取最新事件戳
      }, 50) //  太小影响性能，太大响应缓慢
    }
  }
}

