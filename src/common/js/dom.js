export function addClass(el, className) {
    if (hasClass(el, className)) return
    const newClass = className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
};

// 查重 是否已经有这个className了
export function hasClass(el, className) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
};

// listview页面用的获取Index的操作
export function getData(el, name, val) {
    const perfix = 'data-'
    if (val) {
        return el.setAttribute(perfix + name, val)
    }
    return el.getAttribute(perfix + name)
}

// 这里是做的在js代码里面进行css操作的时候的兼容处理的
const elementStyle = document.createElement('div').style

const vendor = (() => {
    const transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (const key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
