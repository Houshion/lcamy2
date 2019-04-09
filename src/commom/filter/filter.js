let toFixed = (input, num) => Number(input).toFixed(num)
// 日期格式化
let  timeStr = function (time, ff) {
  if (time.length == 10) time = time * 1000
  time = new Date(time)
  var year = time.getFullYear()
  var month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  var date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate()
  var hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours()
  var minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  var second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds()
  if (ff == 'Y-m-d') {
    return year + '-' + month + '-' + date
  } else if (ff == 'Y-m-d H:i:s') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  } else if (ff == 'Y-m-d H:i') {
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
  } else if (ff == 'Y.m.d') {
    return year + '.' + month + '.' + date
  } else if (ff == 'Y.m.d H:i:s') {
    return year + '.' + month + '.' + date + ' ' + hour + ':' + minute + ':' + second
  } else if (ff == 'Y.m.d H:i') {
    return year + '.' + month + '.' + date + ' ' + hour + ':' + minute
  }
}
export default { toFixed, timeStr } //默认导出