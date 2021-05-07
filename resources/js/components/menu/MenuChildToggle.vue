<template>
    <div>
        <button @click="sidebarToggle" type="button" class="btn text-white" style="box-shadow: none;">
            <i class="fas fa-bars" style="font-size: 22px;"></i>
        </button>
    </div>
</template>
<script>
    export default {
        methods: {
            sidebarToggle() {
                this.$store.commit('menu/sidebarToggle');
            },
        },
    }
</script>
