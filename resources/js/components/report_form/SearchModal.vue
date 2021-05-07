<template>
    <div id="search-popup-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{!!modalTitle ? $t('database.' + modalTitle) : ''}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--filter-->
                    <div v-if="Object.values(modalFilter).length > 0">
                        <form @submit="filterData($event, modalTitle)" class="form-row" :disabled="modalFiltering">
                            <div v-for="(item, key) in modalData['search_filter']" :key="key + 'filter'" class="col-md-2 mb-1">
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
                                            <option v-for="(option, k_2) in modalData['select'][key]" :key="k_2 + 'select-search'" :value="k_2">
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
                                <label class="mb-0" style="opacity: 0;">Tìm</label>
                                <div>
                                    <button type="submit" title="Tìm" class="report-button">
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
                            <tr v-if="modalSearch">
                                <th v-for="(title, key) in modalSearch[0]" :key="key + 's-th'" v-if="key !== 'row_num'">
                                    <span>{{$t('database.' + key)}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="cursor-default">
                            <tr @click="trModalClick(key)" v-for="(item, key) in modalSearch" :key="key + 'search-tr'">
                                <td v-for="(value, f_name) in item" v-if="f_name !== 'row_num'">
                                    <div v-if="typeof modalData['field_join'] !== 'undefined' && f_name in modalData['field_join']">
                                        <span v-if="typeof modeJoinData[key][f_name + '_Join'] !== 'undefined'">
                                            {{modeJoinData[key][f_name + '_Join']}}
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
                        <span slot="prev-nav">&lt; Trước</span>
                        <span slot="next-nav">Sau &gt;</span>
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
                this.$store.commit('form/loadModalSearch', {f_name: f_name, keepFilter: true});
            },
            trModalClick(key) {
                this.$store.commit('form/selectModalSearch', key);
            },
            paginationGetData(page = 1) {
                this.$store.commit('form/loadModalSearch', {f_name: this.modalTitle, keepFilter: true, page: page});
            }
        },
        computed: {
            modalData() {
                return this.$store.state.form.modalData;
            },
            modeJoinData() {
                return this.$store.state.form.modeJoinData;
            },
            modalFilter() {
                return this.$store.state.form.modalFilter;
            },
            modalTitle() {
                return this.$store.state.form.modalTitle;
            },
            modalReturn() {
                return this.$store.state.form.modalReturn;
            },
            modalSearch() {
                return this.$store.state.form.modalSearch;
            },
            modalFiltering() {
                return this.$store.state.form.modalFiltering;
            },
            modalAutofill() {
                return this.$store.state.form.modalAutofill;
            }
        }
    }
</script>
