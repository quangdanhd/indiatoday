<template>
    <div class="sub-menu">
        <div v-for="(item, key) in menuConfig" v-if="key === activeMain" :key="key + 'sub-menu'" class="sub-menu-item">
            <ul class="list-group list-group-horizontal menu-3">
                <li v-for="(i_2, k_2) in item['items']" :key="k_2 + 'sub-menu-li'" class="list-group-item">
                    <span v-if="'items' in i_2" @click="subMenuClick(k_2, i_2)" :class="{'active': k_2 === activeSub}" class="link-menu-2">{{i_2['label']}}</span>
                    <a v-else :class="{'active': k_2 === activeSub}" class="link-menu-2" :href="i_2['link']">{{i_2['label']}}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            subMenuClick(key, menu) {
                let sidebar = typeof menu['items'] !== 'undefined';
                this.$store.commit('menu/subMenuClick', {key: key, sidebar: sidebar});
            }
        },
        computed: {
            menuConfig() {
                return this.$store.state.menu.menuConfig
            },
            activeMain() {
                return this.$store.state.menu.activeMain
            }
            ,
            activeSub() {
                return this.$store.state.menu.activeSub
            }
        }
    }
</script>
