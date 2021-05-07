<template functional>
    <fieldset :class="props.fieldset['class']">
        <legend>{{props.fieldset['label']}}</legend>
        <div v-for="(item, key) in props.fieldset['items']" :key="key + 'fieldset'" :class="item['class']">
            <FormDiv v-if="item['type'] === 'div'" :config="props.config" :obj="props.obj" :div_items="item['items']"/>
            <FormFieldset v-if="item['type'] === 'fieldset'" :config="props.config" :obj="props.obj" :fieldset="item"/>
            <FormField v-if="item['type'] === 'field'" :config="props.config" :obj="props.obj" :fields="item['items']"/>
        </div>
    </fieldset>
</template>
<script>
    import FormField from './FormField';

    export default {
        components: {
            FormField,
        }
    }
</script>
