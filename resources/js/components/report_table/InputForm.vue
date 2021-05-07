<template functional>
    <div>
        <label v-if="props.f_type === 'id'">
            <input type="hidden" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)">
        </label>
        <label v-else-if="props.f_type === props.config.integer">
            <input type="number" min="0" step="1" class="form-control report-input" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)" :required="props.required.includes(props.f_name)">
        </label>
        <label v-else-if="props.f_type === props.config.decimal">
            <input type="number" class="form-control report-input text-right" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)" :required="props.required.includes(props.f_name)">
        </label>
        <label v-else-if="props.f_type === props.config.date">
            <input type="date" class="form-control report-input" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)" :required="props.required.includes(props.f_name)">
        </label>
        <label v-else-if="props.f_type === props.config.datetime">
            <input type="datetime-local" class="form-control report-input" step="1" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)" :required="props.required.includes(props.f_name)">
        </label>
        <label v-else-if="props.f_type === props.config.boolean" class="text-center">
            <input type="checkbox" :checked="props.value" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.checked)" :required="props.required.includes(props.f_name)">
        </label>
        <label v-else-if="props.f_type === props.config.select">
            <select class="form-control report-input" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.selectedOptions[0].value)" :required="props.required.includes(props.f_name)">
                <option v-for="(item, key) in props.select[props.f_name]" :key="key" :value="key">{{item}}</option>
            </select>
        </label>
        <label v-else-if="props.f_type === props.config.textarea">
            <textarea class="form-control report-input" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)" :required="props.required.includes(props.f_name)"></textarea>
        </label>
        <label v-else>
            <input type="text" class="form-control report-input" v-bind:value="props.value" @input="listeners.input && listeners.input($event.target.value)" :required="props.required.includes(props.f_name)">
        </label>
    </div>
</template>
