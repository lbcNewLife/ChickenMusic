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
