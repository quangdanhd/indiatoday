<template>
    <div class="input-group input-group-sm">
        <input type="text" :name="f_name" v-model="dataModelPopup[f_name]" class="form-control form-disabled" :required="obj['required'].includes(f_name)">
        <div class="input-group-append position-relative">
            <span @click="clearSearchPopup(f_name)" class="text-muted clear-input field-search-popup">
                <i class="fas fa-times"></i>
            </span>
            <span @click="searchPopupClick(f_name)" class="input-group-text search-popup-icon field-search-popup" data-toggle="modal" data-target="#search-popup-modal">
                <i class="fas fa-search"></i>
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'obj',
            'f_name',
        ],
        methods: {
            clearSearchPopup(f_name) {
                this.$store.commit('form/clearSearchPopupInput', f_name);
            },
            searchPopupClick(f_name) {
                this.$store.commit('form/loadModalSearch', {f_name: f_name, keepFilter: false});
            }
        },
        computed: {
            dataModelPopup() {
                return this.$store.state.form.dataModelPopup;
            }
        }
    }
</script>
