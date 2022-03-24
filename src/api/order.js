import axios from '@/config/httpConfig'
// 获取用户列表
export function getUserList() {
    return axios.get('/user/list')
}
// 获取次级权限列表
export function getNextLevel(id) {
    return axios.get(`/permission/level?id=${id}`)
}
//获取订单以及搜索
export function getOrders(data) {
    return axios.post('/lijia/order/getOrders', data)
}
//创建订单
export function saveOrder(data) {
    return axios.post('/lijia/order/saveOrder', data)
}
//修改服务时间
export function updateServiceTime(data) {
    return axios.post('/lijia/order/updateServiceTime', data)
}
//完成订单
export function finishOrder(data) {
    return axios.post('/lijia/order/finishOrder', data)
}
//失效
export function invalidOrder(data) {
    return axios.post('/lijia/order/invalidOrder', data)
}
//校验优惠券
export function checkCoupon(data) {
    return axios.post('/lijia/order/checkCoupon', data)
}