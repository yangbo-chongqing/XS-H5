// 引入throttle方法
import {
  throttle
} from './common'

/**
 * @description 动态适配rem
 * @author liwenxuan
 * @date 2019/03/17
 */
// 基准大小
const baseSize = 16
// 设置 rem 函数
function setRem () {
  // 取自设计图宽度
  const scale = document.documentElement.clientWidth / 750
  // 设定最大值2
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = throttle(function () {
  setRem()
}, 700)
