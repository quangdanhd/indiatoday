<template>
    <div id="primary-search-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{primaryKeyTitle}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--filter-->
                    <div v-if="Object.values(primaryKeyFilter).length > 0">
                        <form @submit="primaryFilterData($event, primaryKeyTitle)" class="form-row" :disabled="primaryKeyFiltering">
                            <div v-for="(item, key) in primaryData['search_filter']" :key="key + 'filter'" class="col-md-2 mb-1">
                                <label class="mb-0">{{$t('database.' + key.replace(explode_filter, '_'))}}</label>
                                <div v-if="item === config['integer']">
                                    <label class="mb-0 w-100">
                                        <input type="number" min="0" step="1" class="form-control report-input" v-model="primaryKeyFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['decimal']">
                                    <label class="mb-0 w-100">
                                        <input type="number" class="form-control report-input" v-model="primaryKeyFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['boolean']">
                                    <label class="mb-0 w-100">
                                        <input type="checkbox" v-model="primaryKeyFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['date']">
                                    <label class="mb-0 w-100">
                                        <input type="date" class="form-control report-input" v-model="primaryKeyFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['select']">
                                    <label class="mb-0 w-100">
                                        <select class="form-control report-input" v-model="primaryKeyFilter[key]">
                                            <option value>{{$t('button.all')}}</option>
                                            <option v-for="(option, k_2) in primaryData['select'][key]" :key="k_2 + 'select-search'" :value="k_2">
                                                {{$te('button.' + option) ? $t('button.' + option) : option}}
                                            </option>
                                        </select>
                                    </label>
                                </div>
                                <div v-else>
                                    <label class="mb-0 w-100">
                                        <input type="text" class="form-control report-input" v-model="primaryKeyFilter[key]">
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1 mb-1">
                                <label class="mb-0" style="opacity: 0;">Tìm</label>
                                <div>
                                    <button type="submit" title="Tìm" class="report-button">
                                        <i v-if="primaryKeyFiltering" class="fa-spin fas fa-spinner" style="font-size: 13px; color: #4dabf7;"></i>
                                        <i v-else class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-if="primaryKeyFiltering" class="loader-line"></div>
                    <div v-else style="height: 3px"></div>
                    <!--table-->
                    <div class="overflow-auto no-wrap table-responsive-lg">
                        <table class="table table-sm table-striped table-hover">
                            <thead>
                            <tr v-if="primaryKeySearch">
                                <th v-for="(title, key) in primaryKeySearch[0]" :key="key + 's-th'" v-if="key !== 'row_num'">
                                    <span>{{key}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="cursor-default">
                            <tr @click="primaryTrModalClick(key)" v-for="(item, key) in primaryKeySearch" :key="key + 'search-tr'">
                                <td v-for="(value, f_name) in item" v-if="f_name !== 'row_num'">
                                    <div v-if="typeof primaryData['field_join'] !== 'undefined' && f_name in primaryData['field_join']">
                                        <span v-if="typeof primaryJoinData[key][f_name + '_Join'] !== 'undefined'">
                                            {{primaryJoinData[key][f_name + '_Join']}}
                                        </span>
                                        <span v-if="value !== null">[{{value}}]</span>
                                    </div>
                                    <span v-else>{{value}}</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--pagination-->
                    <div class="modal-footer report-footer">
                        <pagination :data="primaryDataReturn" :limit="3" @pagination-change-page="paginationGetData">
                            <span slot="prev-nav">&lt; Trước</span>
                            <span slot="next-nav">Sau &gt;</span>
                        </pagination>
                    </div>
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
            primaryFilterData(event, f_name) {
                event.preventDefault();
                this.$store.commit('form/primaryLoadModalSearch', {f_name: f_name, filter: true});
            },
            primaryTrModalClick(key) {
                this.$store.commit('form/primarySelectModalSearch', key);
            },
            paginationGetData(page = 1) {
                this.$store.commit('form/primaryLoadModalSearch', {f_name: this.primaryKeyTitle, filter: true, page: page});
            }
        },
        computed: {
            primaryKeyTitle() {
                return this.$store.state.form.primaryKeyTitle;
            },
            primaryData() {
                return this.$store.state.form.primaryData;
            },
            primaryJoinData() {
                return this.$store.state.form.primaryJoinData;
            },
            primaryKeyFilter() {
                return this.$store.state.form.primaryKeyFilter;
            },
            primaryDataReturn() {
                return this.$store.state.form.primaryDataReturn;
            },
            primaryKeySearch() {
                return this.$store.state.form.primaryKeySearch;
            },
            primaryKeyFiltering() {
                return this.$store.state.form.primaryKeyFiltering;
            }
        }
    }
</script>
