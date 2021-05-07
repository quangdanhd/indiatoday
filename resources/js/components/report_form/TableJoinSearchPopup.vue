<template>
    <div style="min-width: 180px;">
        <div v-if="f_type === config['search_popup']" class="input-group input-group-sm">
            <input v-if="isNew" type="text" v-model="joinAddJoin[key_1][key_2][f_name]" class="form-control report-input form-disabled" :required="required.includes(f_name)">
            <input v-else type="text" v-model="joinEdit" class="form-control report-input form-disabled" :required="required.includes(f_name)">
            <div class="input-group-append position-relative">
                <span @click="joinClearSearchPopup()" class="text-muted clear-input">
                    <i class="fas fa-times"></i>
                </span>
                <span @click="joinSearchPopupClick()" class="input-group-text search-popup-icon" data-toggle="modal" data-target="#join-search-popup-modal" style="padding: 3.1px;">
                    <i class="fas fa-search"></i>
                </span>
            </div>
        </div>
        <div v-else>
            <span v-if="isNew">
                {{joinAddJoin[key_1][key_2][f_name]}}
            </span>
            <span v-else>
                {{joinEdit}}
            </span>
        </div>
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
        methods: {
            joinSearchPopupClick() {
                this.$store.commit('form/joinLoadModalSearch', {
                    isNew: this.isNew,
                    key_1: this.key_1,
                    key_2: this.key_2,
                    f_name: this.f_name,
                    keepFilter: false
                });
            },
            joinClearSearchPopup() {
                this.$store.commit('form/clearSearchPopupInputTableJoin', {
                    isNew: this.isNew,
                    key_1: this.key_1,
                    key_2: this.key_2,
                    f_name: this.f_name,
                });
                this.$forceUpdate();
            }
        },
        computed: {
            joinAddJoin() {
                return this.$store.state.form.joinAddJoin;
            },
            joinDataEdit() {
                return this.$store.state.form.joinDataEdit;
            },
            joinEditJoin() {
                return this.$store.state.form.joinEditJoin;
            },
            joinEdit() {
                let value = '';
                if (!this.isNew) {
                    if (typeof this.joinEditJoin[this.key_1][this.key_2] !== 'undefined' && typeof this.joinEditJoin[this.key_1][this.key_2][this.f_name + '_Join'] !== 'undefined') {
                        value = this.joinEditJoin[this.key_1][this.key_2][this.f_name + '_Join'] + ' ';
                    }
                    if (this.joinDataEdit[this.key_1][this.key_2][this.f_name]) {
                        value += '[' + this.joinDataEdit[this.key_1][this.key_2][this.f_name] + ']';
                    }
                }
                return value;
            },
            joinRefresh() {
                return this.$store.state.form.joinRefresh;
            },
            joinTitle() {
                return this.$store.state.form.joinTitle;
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
