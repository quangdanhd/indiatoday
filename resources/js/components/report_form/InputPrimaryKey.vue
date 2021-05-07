<template>
    <div class="input-group input-group-sm">
        <input type="text" :name="f_name" v-model="dataModel[f_name]" class="form-control form-disabled">
        <div class="input-group-append">
            <span @click="primarySearch(f_name)" class="input-group-text search-popup-icon" data-toggle="modal" data-target="#primary-search-modal">
                <i class="fas fa-search-plus"></i>
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
            primarySearch(f_name) {
                this.$store.commit('form/primaryLoadModalSearch', {f_name: f_name, filter: false});
            }
        },
        computed: {
            dataModel() {
                return this.$store.state.form.dataModel;
            },
            primaryKeyFilter() {
                return this.$store.state.form.primaryKeyFilter;
            },
        }
    }
</script>
