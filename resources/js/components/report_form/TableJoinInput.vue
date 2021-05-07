<template>
    <div>
        <label v-if="isNew">
            <input v-if="f_type === config['integer']" type="number" min="0" step="1" class="form-control report-input" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['decimal']" type="number" class="form-control report-input text-right" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['date']" type="date" class="form-control report-input" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['datetime']" type="datetime-local" class="form-control report-input" step="1" :value="addData[key_1][key_2][f_name] | reportDateTimeConverter()" @input="updateDateTimeLocal($event.target.value)" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['boolean']" type="checkbox" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <select v-else-if="f_type === config['select']" class="form-control report-input" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)">
                <option value>{{$t('button.option_none')}}</option>
                <option v-for="(item, key) in joinConfig[key_1]['select'][f_name]" :key="key" :value="key">
                    {{item}}
                </option>
            </select>
            <textarea v-else-if="f_type === config['textarea']" class="form-control report-input" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)"></textarea>
            <span v-else-if="f_type === config['view']">
                {{addData[key_1][key_2][f_name]}}
            </span>
            <input v-else type="text" class="form-control report-input" v-model="addData[key_1][key_2][f_name]" :required="required.includes(f_name)">
        </label>
        <label v-else>
            <input v-if="f_type === config['integer']" type="number" min="0" step="1" class="form-control report-input" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['decimal']" type="number" class="form-control report-input text-right" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['date']" type="date" class="form-control report-input" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['datetime']" type="datetime-local" class="form-control report-input" step="1" :value="joinDataEdit[key_1][key_2][f_name] | reportDateTimeConverter()" @input="updateDateTimeLocal($event.target.value)" :required="required.includes(f_name)">
            <input v-else-if="f_type === config['boolean']" type="checkbox" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)">
            <select v-else-if="f_type === config['select']" class="form-control report-input" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)">
                <option value>{{$t('button.option_none')}}</option>
                <option v-for="(item, key) in joinConfig[key_1]['select'][f_name]" :key="key" :value="key">
                    {{item}}
                </option>
            </select>
            <textarea v-else-if="f_type === config['textarea']" class="form-control report-input" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)"></textarea>
            <span v-else-if="f_type === config['view']">
                {{joinDataEdit[key_1][key_2][f_name]}}
            </span>
            <input v-else type="text" class="form-control report-input" v-model="joinDataEdit[key_1][key_2][f_name]" :required="required.includes(f_name)">
        </label>
    </div>
</template>
<script>
    export default {
        props: [
            'config',
            'f_name',
            'f_type',
            'required',
            'key_1',
            'key_2',
            'isNew',
        ],
        created() {
            if (!this.isNew && this.f_type === this.config['boolean']) {
                this.joinDataEdit[this.key_1][this.key_2][this.f_name] = this.joinDataEdit[this.key_1][this.key_2][this.f_name] === 1 || this.joinDataEdit[this.key_1][this.key_2][this.f_name] === '1';
            }
        },
        methods: {
            updateDateTimeLocal(value) {
                this.$store.commit('form/updateDateTimeLocalJoinAddData', {
                    isNew: this.isNew,
                    key_1: this.key_1,
                    key_2: this.key_2,
                    f_name: this.f_name,
                    value: value
                });
            },
        },
        computed: {
            addData() {
                return this.$store.state.form.addData;
            },
            joinDataEdit() {
                return this.$store.state.form.joinDataEdit;
            },
            joinRefresh() {
                return this.$store.state.form.joinRefresh;
            },
            joinConfig() {
                return this.$store.state.form.joinConfig;
            },
        },
        watch: {
            joinRefresh() {
                if (this.joinRefresh) {
                    this.$forceUpdate();
                }
            }
        }
    }
</script>
