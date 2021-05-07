<template functional>
    <div class="w-100">
        <div v-for="(item, key) in props.div_items" :key="key + 'div'" class="float-left w-100" :class="item['class']">
            <FormDiv v-if="item['type'] === 'div'" :config="props.config" :obj="props.obj" :div_items="item['items']"/>
            <FormFieldset v-if="item['type'] === 'fieldset'" :config="props.config" :obj="props.obj" :fieldset="item"/>
            <FormField v-if="item['type'] === 'field'" :config="props.config" :obj="props.obj" :fields="item['items']"/>
        </div>
    </div>
</template>
<script>
    import FormFieldset from './FormFieldset';
    import FormField from './FormField';

    export default {
        components: {
            FormFieldset,
            FormField
        }
    }
</script>
