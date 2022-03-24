<template>
    <div>
        <router-view></router-view>
        <TotalStatus />
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {},
    components: {
        TotalStatus: () => import('./component/total-status'),
    },
}
</script>
