export default {
    LOGIN_IN(state, token) {
        state.UserToken = token
    },
    LOGIN_OUT(state) {
        state.UserToken = ''
            /* 防止切换角色时addRoutes重复添加路由导致出现警告 */
        window.location.reload()
    },
    toggleNavCollapse(state) {
        state.isSidebarNavCollapse = !state.isSidebarNavCollapse
    },
    setCrumbList(state, list) {
        state.crumbList = list
    },
}