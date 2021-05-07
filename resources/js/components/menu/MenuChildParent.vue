<template functional>
    <div>
        <a href='#'>
            <span>{{props.parent['label']}}</span>
        </a>
        <ul v-if="typeof props.activeChild[props.keyActive] !== 'undefined'" style="display: block;">
            <li v-for="(items, key) in props.parent['items']" :key="key + 'child-menu-li-in'" :class="{'has-sub': 'items' in items, 'open': typeof props.activeChild[props.keyActive + '_' + key] !== 'undefined'}">
                <MenuChildParent v-if="'items' in items" :parent="items" :keyActive="props.keyActive + '_' + key" :activeChild="props.activeChild"/>
                <MenuChildItem v-if="!('items' in items)" :item="items"/>
            </li>
        </ul>
        <ul v-else>
            <li v-for="(items, key) in props.parent['items']" :key="key + 'child-menu-li-in'" :class="{'has-sub': 'items' in items, 'open': typeof props.activeChild[props.keyActive + '_' + key] !== 'undefined'}">
                <MenuChildParent v-if="'items' in items" :parent="items" :keyActive="props.keyActive + '_' + key" :activeChild="props.activeChild"/>
                <MenuChildItem v-if="!('items' in items)" :item="items"/>
            </li>
        </ul>
    </div>
</template>
<script>
    import MenuChildItem from './MenuChildItem';
    export default {
        components: {
            MenuChildItem
        }
    }
</script>
