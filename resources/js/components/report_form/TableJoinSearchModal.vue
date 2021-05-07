<template>
    <div id="join-search-popup-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">{{joinTitle}}</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--filter-->
                    <div v-if="Object.values(joinFilter).length > 0">
                        <form @submit="joinFilterData($event, joinTitle)" class="form-row" :disabled="joinFiltering">
                            <div v-for="(item, key) in joinData['search_filter']" :key="key + 'filter'" class="col-md-2 mb-1">
                                <label class="mb-0">{{$t('database.' + key.replace(explode_filter, '_'))}}</label>
                                <div v-if="item === config['integer']">
                                    <label class="mb-0 w-100">
                                        <input type="number" min="0" step="1" class="form-control report-input" v-model="joinFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['decimal']">
                                    <label class="mb-0 w-100">
                                        <input type="number" class="form-control report-input" v-model="joinFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['boolean']">
                                    <label class="mb-0 w-100">
                                        <input type="checkbox" v-model="joinFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['date']">
                                    <label class="mb-0 w-100">
                                        <input type="date" class="form-control report-input" v-model="joinFilter[key]">
                                    </label>
                                </div>
                                <div v-else-if="item === config['select']">
                                    <label class="mb-0 w-100">
                                        <select class="form-control report-input" v-model="joinFilter[key]">
                                            <option value>{{$t('button.all')}}</option>
                                            <option v-for="(option, k_2) in joinData['select'][key]" :key="k_2 + 'select-search'" :value="k_2">
                                                {{$te('button.' + option) ? $t('button.' + option) : option}}
                                            </option>
                                        </select>
                                    </label>
                                </div>
                                <div v-else>
                                    <label class="mb-0 w-100">
                                        <input type="text" class="form-control report-input" v-model="joinFilter[key]">
                                    </label>
                                </div>
                            </div>
                            <div class="col-md-1 mb-1">
                                <label class="mb-0" style="opacity: 0;">Tìm</label>
                                <div>
                                    <button type="submit" title="Tìm" class="report-button">
                                        <i v-if="joinFiltering" class="fa-spin fas fa-spinner" style="font-size: 13px; color: #4dabf7;"></i>
                                        <i v-else class="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div v-if="joinFiltering" class="loader-line"></div>
                    <div v-else style="height: 3px"></div>
                    <!--table-->
                    <div class="overflow-auto no-wrap table-responsive-lg">
                        <table class="table table-sm table-striped table-hover">
                            <thead>
                            <tr v-if="joinSearch">
                                <th v-for="(title, key) in joinSearch[0]" :key="key + 's-th'" v-if="key !== 'row_num'">
                                    <span>{{key}}</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody class="cursor-default">
                            <tr @click="joinTrModalClick(key)" v-for="(item, key) in joinSearch" :key="key + 'search-tr'">
                                <td v-for="(value, f_name) in item" v-if="f_name !== 'row_num'">
                                    <div v-if="typeof joinData['field_join'] !== 'undefined' && f_name in joinData['field_join']">
                                        <span v-if="typeof joinJoinData[key][f_name + '_Join'] !== 'undefined'">
                                            {{joinJoinData[key][f_name + '_Join']}}
                                        </span>
                                        <span>[{{value}}]</span>
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
                    <pagination :data="joinReturn" :limit="3" @pagination-change-page="paginationGetData">
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
            joinFilterData(event, f_name) {
                event.preventDefault();
                this.$store.commit('form/joinLoadModalSearch', {
                    isNew: this.joinIsNew,
                    key_1: this.joinIndex,
                    key_2: this.joinIndex_2,
                    f_name: f_name,
                    keepFilter: true
                });
            },
            joinTrModalClick(key) {
                this.$store.commit('form/joinSelectModalSearch', key);
            },
            paginationGetData(page = 1) {
                this.$store.commit('form/joinLoadModalSearch', {
                    isNew: this.joinIsNew,
                    key_1: this.joinIndex,
                    key_2: this.joinIndex_2,
                    f_name: this.joinTitle,
                    keepFilter: true,
                    page: page
                });
            }
        },
        computed: {
            addData() {
                return this.$store.state.form.addData;
            },
            joinIsNew() {
                return this.$store.state.form.joinIsNew;
            },
            joinIndex() {
                return this.$store.state.form.joinIndex;
            },
            joinIndex_2() {
                return this.$store.state.form.joinIndex_2;
            },
            joinTitle() {
                return this.$store.state.form.joinTitle;
            },
            joinData() {
                return this.$store.state.form.joinData;
            },
            joinFilter() {
                return this.$store.state.form.joinFilter;
            },
            joinReturn() {
                return this.$store.state.form.joinReturn;
            },
            joinJoinData() {
                return this.$store.state.form.joinJoinData;
            },
            joinSearch() {
                return this.$store.state.form.joinSearch;
            },
            joinFiltering() {
                return this.$store.state.form.joinFiltering;
            },
            modalAutofill() {
                return this.$store.state.form.modalAutofill;
            }
        }
    }
</script>
