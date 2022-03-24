import axios from '@/config/httpConfig'
//公共下载
export function downLoad(url, data, name) {
    axios
        .post(url, data, {
            responseType: 'blob',
        })
        .then((data) => {
            const content = data
            const blob = new Blob([content])
            if ('download' in document.createElement('a')) {
                const elink = document.createElement('a')
                elink.download = `${name}.xlsx`
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                URL.revokeObjectURL(elink.href)
                document.body.removeChild(elink)
            } else {
                navigator.msSaveBlob(blob, `${name}.xlsx`)
            }
        })
}