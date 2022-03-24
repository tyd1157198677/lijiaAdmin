function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}
/**
 *
 * @param time
 * @param format "yyyy-MM-dd hh:mm:ss"
 * @returns {*}
 */
export function parseTime(time, format = 'yyyy-MM-dd hh:mm:ss') {
    if (arguments.length === 0) {
        return null
    }

    if (!time) {
        return time
    }

    let date

    if (typeof time === 'object') {
        date = time
    } else if (typeof time === 'string') {
        date = new Date(time)
    } else if (typeof time === 'number') {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }

    const o = {
        'M+': date.getMonth() + 1, // month
        'd+': date.getDate(), // day
        'h+': date.getHours(), // hour
        'm+': date.getMinutes(), // minute
        's+': date.getSeconds(), // second
        'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
        S: date.getMilliseconds(),
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ?
                o[k] :
                ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return format
}