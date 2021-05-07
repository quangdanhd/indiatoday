<template>
    <div class="child-menu" :class="{'active': !sidebar}">
        <div v-for="(item, key) in menuConfig" v-show="key === activeMain" :key="key + 'cm'">
            <div v-for="(i_2, k_2) in item['items']" v-show="k_2 === activeSub" :key="k_2 + 'cm-div'" class="menu-left">
                <ul>
                    <li v-for="(i_3, k_3) in i_2['items']" :key="k_3 + 'cm-li'" :class="{'has-sub': 'items' in i_3, 'open': typeof activeChild[key + '_' + k_2 + '_' + k_3] !== 'undefined'}">
                        <MenuChildParent v-if="'items' in i_3" :parent="i_3" :keyActive="key + '_' + k_2 + '_' + k_3" :activeChild="activeChild"/>
                        <MenuChildItem v-if="!('items' in i_3)" :item="i_3"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import MenuChildParent from './MenuChildParent';
    import MenuChildItem from './MenuChildItem';

    export default {
        components: {
            MenuChildParent,
            MenuChildItem
        },
        created() {
            this.$store.commit('menu/setSidebar');
        },
        computed: {
            menuConfig() {
                return this.$store.state.menu.menuConfig
            },
            activeMain() {
                return this.$store.state.menu.activeMain
            },
            activeSub() {
                return this.$store.state.menu.activeSub
            },
            activeChild() {
                return this.$store.state.menu.activeChild
            },
            sidebar() {
                return this.$store.state.menu.sidebar
            },
        }
    }
</script>
