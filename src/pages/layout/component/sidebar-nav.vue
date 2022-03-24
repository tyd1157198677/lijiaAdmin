<template>
    <el-menu
        :collapse="isSidebarNavCollapse"
        background-color="#304156"
        text-color="#eee"
        active-text-color="#4dbcff"
        :default-active="currentMenu"
    >
        <DynamicMenu :menuList="sidebarMenu"></DynamicMenu>
    </el-menu>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            isCollapse: true,
        }
    },
    computed: {
        ...mapState(['isSidebarNavCollapse']),
        ...mapState('permission', ['sidebarMenu', 'currentMenu']),
    },
    methods: {},
    components: {
        DynamicMenu: () => import('@/components/dynamic-menu'),
    },
}
</script>
