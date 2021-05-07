<template>
    <div class="main-menu menu-1 float-left">
        <ul class="list-group list-group-horizontal">
            <li v-for="(item, key) in menuConfig" :key="key + 'main-menu'" class="list-group-item">
                <span @click="mainMenuClick(key)" :class="{'active': key === activeMain}" class="link-menu-1">{{item['label']}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        methods: {
            mainMenuClick(key) {
                this.$store.commit('menu/mainMenuClick', key); // to mutations
                // this.$store.dispatch('mainMenuClick', key) // to action
            }
        },
        created() {
            this.$store.commit('menu/initActive');
        },
        computed: {
            menuConfig() {
                return this.$store.state.menu.menuConfig
            },
            activeMain() {
                return this.$store.state.menu.activeMain
            }
        }
    }
</script>
