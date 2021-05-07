<template>
    <div id="search-popup-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" v-if="modalTitle">{{$t('database.' + modalTitle)}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--filter-->
                    <div v-if="Object.values(modalFilter).length > 0">
                        <form @submit="filterData($event, modalTitle)" class="form-row" :disabled="modalFiltering">
                            <div v-for="(item, key) in searchPopup['search_filter']" :key="key + 'filter'" class="col-md-2 mb-1">
                                <label class="mb-0">{{$t('database.' + key.replace(explode_filter, '_'))}}</label>
                                <div v-if="item === config['integer']">
                                    <label class="mb-0 w-100">
                                        <input type="number" min="0" step="1" class="form-control report-input" v-model="modalFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['decimal']">
                                    <label class="mb-0 w-100">
                                        <input type="number" class="form-control report-input" v-model="modalFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['boolean']">
                                    <label class="mb-0 w-100">
                                        <input type="checkbox" v-model="modalFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['date']">
                                    <label class="mb-0 w-100">
                                        <input type="date" class="form-control report-input" v-model="modalFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['select']">
                                    <label class="mb-0 w-100">
                                        <select class="form-control report-input" v-model="modalFilter[key]">
                                            <option value>{{$t('button.all')}}</option>
                                            <option v-for="(option, k_2) in searchPopup['select'][key]" :key="k_2 + 'select-search'" :value="k_2">
                                                {{$te('button.' + option) ? $t('button.' + option) : option}}
                                            </option>
                                        </select>
                                    </label>
                                </div>
                                <div v-else>
                                    <label class="mb-0 w-100">
                                        <input type="text" class="form-control report-input" v-model="modalFilter[key]">
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1 mb-1">
                                <label class="mb-0" style="opacity: 0;">{{$t('button.search')}}</label>
                                <div>
                                    <button type="submit" :title="$t('button.search')" class="report-button">
                                        <i v-if="modalFiltering" class="fa-spin fas fa-spinner" style="font-size: 13px; color: #4dabf7;"></i>
                                        <i v-else class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-if="modalFiltering" class="loader-line"></div>
                    <div v-else style="height: 3px"></div>
                    <!--table-->
                    <div class="overflow-auto no-wrap table-responsive-lg">
                        <table class="table table-sm table-striped table-hover">
                            <thead>
                            <tr v-if="modalRecords">
                                <th v-for="(value, key) in modalRecords[0]" :key="key + 'search-th'">
                                    <span>{{$t('database.' + key.replace(explode_filter, '_'))}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody style="cursor: default;">
                            <tr @click="trModalClick(key)" v-for="(item, key) in modalRecords" :key="key + 'search-tr'">
                                <td v-for="(value, f_name) in item">
                                    <div v-if="typeof searchPopup['field_join'] !== 'undefined' && f_name in searchPopup['field_join']">
                                        <span v-if="typeof dataModalJoin[key][f_name + '_Join'] !== 'undefined'">
                                            {{dataModalJoin[key][f_name + '_Join']}}
                                        </span>
                                        <span v-if="value !== null">[{{value}}]</span>
                                    </div>
                                    <span v-else>{{value}}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <!--pagination-->
                <div class="modal-footer report-footer">
                    <pagination :data="modalReturn" :limit="3" @pagination-change-page="paginationGetData">
                        <span slot="prev-nav">{{$t('button.previous')}}</span>
                        <span slot="next-nav">{{$t('button.next')}}</span>
                    </pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                config: {},
                explode_filter: {},
            }
        },
        created() {
            // config
            this.config = report_config;
            this.explode_filter = explode_filter;
        },
        methods: {
            filterData(event, f_name) {
                event.preventDefault();
                this.$store.commit('list/LoadSearchPopupModal', {
                    isNew: this.isNew,
                    f_name: f_name,
                    keepFilter: true
                });
            },
            trModalClick(key) {
                this.$store.commit('list/selectModalRecord', key);
            },
            paginationGetData(page = 1) {
                this.$store.commit('list/LoadSearchPopupModal', {
                    isNew: this.isNew,
                    f_name: this.modalTitle,
                    keepFilter: true,
                    page: page
                });
            }
        },
        computed: {
            isNew() {
                return this.$store.state.list.isNew;
            },
            searchPopup() {
                return this.$store.state.list.searchPopup;
            },
            dataModalJoin() {
                return this.$store.state.list.dataModalJoin;
            },
            modalTitle() {
                return this.$store.state.list.modalTitle;
            },
            modalFilter() {
                return this.$store.state.list.modalFilter;
            },
            modalFiltering() {
                return this.$store.state.list.modalFiltering;
            },
            modalReturn() {
                return this.$store.state.list.modalReturn;
            },
            modalRecords() {
                return this.$store.state.list.modalRecords;
            },
        }
    }
</script>
