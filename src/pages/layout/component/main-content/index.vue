<template>
    <div class="main-container">
        <TopAside />
        <Content />
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
        TopAside: () => import('./top-aside'),
        Content: () => import('./content'),
    },
}
</script>
