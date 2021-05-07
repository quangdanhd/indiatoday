<template>
    <div class="input-group input-group-sm" style="min-width: 180px;">
        <input v-if="isNew" v-model="dataNewPopup[index][f_name]" type="text" class="form-control report-input form-disabled" :required="required.includes(f_name)">
        <input v-else v-model="dataEditPopup[index][f_name + '_Join']" type="text" class="form-control report-input form-disabled" :required="required.includes(f_name)">
        <div class="input-group-append position-relative">
            <span @click="clearSearchPopup(f_name)" class="text-muted clear-input">
                <i class="fas fa-times"></i>
            </span>
            <span @click="searchPopup()" class="input-group-text search-popup-icon" data-toggle="modal" data-target="#search-popup-modal" style="padding: 3.1px;">
                <i class="fas fa-search"></i>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'index',
            'f_name',
            'isNew',
        ],
        methods: {
            searchPopup() {
                this.$store.commit('list/LoadSearchPopupModal', {
                    isNew: this.isNew,
                    index: this.index,
                    f_name: this.f_name,
                    keepFilter: false
                });
            },
            clearSearchPopup() {
                this.$store.commit('list/clearSearchPopupInput', {
                    isNew: this.isNew,
                    index: this.index,
                    f_name: this.f_name,
                });
                this.$forceUpdate();
            }
        },
        computed: {
            required() {
                return this.$store.state.list.required;
            },
            dataNewPopup() {
                return this.$store.state.list.dataNewPopup;
            },
            dataEditPopup() {
                return this.$store.state.list.dataEditPopup;
            },
        }
    }
</script>
