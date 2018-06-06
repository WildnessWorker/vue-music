export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)'+ className + '(\\s|$)')
  return reg.test(el.className)
}
/*
	* el为所需要传入的标签 => e.target
	* name 为所需要传入的属性后缀名称
	* val 为当前标签的value值
*/
export function getData (el, name, val) {
	const prefix = 'data-'
	name = prefix + name
	if (val) {
		return el.setAttribute(name, val)
	} else {
		return el.getAttribute(name)
		return console.log(el.getAttribute(name))
	}
}



/*
* 封装浏览器内核，js操作css时判断当前浏览器内核
*/
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transfromNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    standard: 'transform'
  }

  for (let key in transfromNames) {
    if (elementStyle[transfromNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if(vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
