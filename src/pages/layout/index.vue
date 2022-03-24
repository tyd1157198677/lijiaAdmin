<template>
    <div :class="{navCollapsed:isSidebarNavCollapse}">
        <sidebarNav class="sidebar" />
        <mainContent />
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {}
    },
    computed: {
        ...mapState(['isSidebarNavCollapse']),
    },
    components: {
        sidebarNav: () => import('./component/sidebar-nav'),
        mainContent: () => import('./component/main-content/index'),
    },
}
</script>

<style lang="scss" scoped>
</style>
