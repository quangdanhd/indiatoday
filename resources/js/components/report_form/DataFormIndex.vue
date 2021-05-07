<template>
    <div class="position-relative">
        <div class="row">
            <div class="col-sm-8 col-md-10">
                <h4 class="mb-0 float-left mr-3">{{$t('database.list_' + obj['table_name'])}}</h4>
                <button v-if="importData" @click="toggleFormImport()" class="report-button">
                    <i v-if="!importForm" :title="$t('button.import')" class="fas fa-upload"></i>
                    <i v-else :title="$t('button.cancel_import')" class="fas fa-minus-circle"></i>
                </button>
                <button v-if="canExport" @click="exportData()" class="report-button">
                    <i :title="$t('button.export_excel')" class="fas fa-file-excel"></i>
                </button>
            </div>
            <div class="col-sm-4 col-md-2">
                <a :href="obj['url'] + '/create'" class="btn btn-sm btn-outline-success float-right">
                    <i class="fas fa-plus-circle"></i>
                    <span>{{$t('button.add')}}</span>
                </a>
            </div>
        </div>
        <!--overlay loader-->
        <div v-if="formSubmit" class="report-loader">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <!--import-->
        <div v-if="importData && importForm">
            <form @submit="submitImport($event)" class="container-fluid pt-2 mb-3 report-form needs-validation" novalidate :disabled="importSubmit">
                <div class="row">
                    <div class="col-sm-6 col-md-3">
                        <input @change="onFileChange($event)" type="file" name="file" class="form-control-file form-control-sm" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required>
                    </div>
                    <div class="col-sm-5 col-md-8">
                        <button type="submit" style="border: 1px solid rgb(119, 119, 119);">{{$t('button.import')}}</button>
                    </div>
                    <div class="col-sm-1 col-md-1">
                        <div class="pt-2">
                            <a :href="'/files/import_sample/import_' + obj['table_name'] + '.xlsx'" :title="$t('button.import_sample_file_download')" download class="mr-3">
                                {{$t('button.sample_file')}} <i class="fas fa-file-download"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="w-100" style="clear: both;"></div>
        <!--filter-->
        <div class="search-report" v-if="Object.keys(dataFilter).length > 0">
            <form @submit="filterData($event)" class="form-row">
                <div v-for="(item, key, index) in dataFilter['search_filter']" :key="index + 'search'" class="col-md-2 mb-1">
                    <label class="mb-0">{{$t('database.' + key.replace(explode_filter, '_'))}}</label>
                    <div v-if="item === config['integer']">
                        <label class="mb-0 w-100">
                            <input type="number" min="0" step="1" class="form-control report-input" v-model="dataSearch[key]">
                        </label>
                    </div>
                    <div v-else-if="item === config['decimal']">
                        <label class="mb-0 w-100">
                            <input type="number" class="form-control report-input" v-model="dataSearch[key]">
                        </label>
                    </div>
                    <div v-else-if="item === config['boolean']">
                        <label class="mb-0 w-100">
                            <input type="checkbox" v-model="dataSearch[key]">
                        </label>
                    </div>
                    <div v-else-if="item === config['date']">
                        <label class="mb-0 w-100">
                            <input type="date" class="form-control report-input" v-model="dataSearch[key]">
                        </label>
                    </div>
                    <div v-else-if="item === config['select']">
                        <label class="mb-0 w-100">
                            <select class="form-control report-input" v-model="dataSearch[key]">
                                <option value>{{$t('button.all')}}</option>
                                <option v-for="(option, k_2) in dataFilter['select'][key]" :key="index + k_2 + 'select-search'" :value="k_2">
                                    {{$te('button.' + option) ? $t('button.' + option) : option}}
                                </option>
                            </select>
                        </label>
                    </div>
                    <div v-else>
                        <label class="mb-0 w-100">
                            <input type="text" class="form-control report-input" v-model="dataSearch[key]">
                        </label>
                    </div>
                </div>
                <div class="col-md-1 mb-1">
                    <label class="mb-0" style="opacity: 0;">{{$t('button.search')}}</label>
                    <div>
                        <button type="submit" :title="$t('button.search')" class="report-button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!--message & error-->
        <div v-if="message !== ''" class="pl-3 pr-3 mb-2">
            <div class="mb-0 alert alert-success alert-dismissible">
                <span @click="closeMessage" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Success!</strong>
                <span v-html="message"></span>
            </div>
        </div>
        <div v-if="error !== ''" class="pl-3 pr-3 mb-2">
            <div class="mb-0 alert alert-danger alert-dismissible">
                <span @click="closeError" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Warning!</strong>
                <span v-html="error"></span>
            </div>
        </div>
        <!--table data-->
        <div v-if="dataTable.length" class="list-report fixed-action mr-5">
            <div class="no-wrap table-responsive table-responsive-lg">
                <table class="table-report table-counter table table-sm table-striped table-hover width-100">
                    <!--thead-->
                    <thead>
                    <tr v-for="(item, key) in dataTable" :key="key + 'tr-head'" v-if="key === 0">
                        <th v-for="(title, k_2) in item" :key="k_2 +'th-head'" v-if="k_2 !== obj['primaryKey']">
                            <span>{{$t('database.' + k_2)}}</span>
                        </th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item, key) in dataTable" :key="key + 'tr-tbody'">
                        <td v-for="(value, f_name, index) in item" :key="index + 'td-data'" v-if="f_name !== obj['primaryKey']">
                            <div v-if="typeof(obj['field_type'][f_name]) === 'undefined'">{{value}}</div>
                            <div v-else-if="fieldJoin.includes(f_name)">
                                <span>{{dataJoin[key][f_name + '_Join']}} </span>
                                <span v-if="value">[{{value}}]</span>
                            </div>
                            <div v-else :inner-html.prop="obj['field_type'][f_name] | reportDataShow(value, f_name, obj['select'])"></div>
                        </td>
                        <td class="text-center td-action mr-4">
                            <a :href="obj['url'] + '/' + item[obj['primaryKey']] + '/edit'" title="Sửa">
                                <i class="far fa-edit"></i>
                            </a>
                        </td>
                        <td class="td-action">
                            <!--<span @click="destroyItem(item[obj['primaryKey']])" title="Xóa" class="text-muted cursor-pointer">-->
                            <!--<i class="far fa-trash-alt"></i>-->
                            <!--</span>-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="pl-3 p-2">
            <span>Không có kết quả!</span>
        </div>
        <!--pagination-->
        <div class="card-footer report-footer">
            <pagination :data="dataReturn" :limit="3" @pagination-change-page="getData">
                <span slot="prev-nav">&lt; Trước</span>
                <span slot="next-nav">Sau &gt;</span>
            </pagination>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'obj'
        ],
        data() {
            return {
                config: {},
                explode_filter: '',
                message: '',
                error: '',
                dataFilter: {},
                dataSearch: {},
                dataReturn: {},
                dataTable: [],
                fieldJoin: [],
                dataJoin: [],
                importData: false,
                canExport: false,
                importForm: false,
                importFile: '',
                importSubmit: false,
            }
        },
        created() {
            // config
            this.config = report_config;
            this.explode_filter = explode_filter;
            this.importData = typeof this.obj['import'] !== 'undefined' ? this.obj['import'] : false;
            this.canExport = typeof this.obj['export'] !== 'undefined' ? this.obj['export'] : false;
            // filter
            if (typeof this.obj['index_filter'] !== 'undefined') {
                this.dataFilter = this.obj['index_filter'];
                for (let i in this.dataFilter['search_filter']) {
                    if (typeof this.dataFilter['selected'] !== 'undefined' && typeof this.dataFilter['selected'][i] !== 'undefined') {
                        this.dataSearch[i] = this.dataFilter['selected'][i];
                    } else {
                        this.dataSearch[i] = '';
                    }
                }
            }
            this.fieldJoin = Object.keys(this.obj['field_join']);
            this.getData();
        },
        methods: {
            getData(page = 1) {
                this.$store.commit('form/formSubmitChange', true);
                axios.post('/form-index', {
                    table: this.obj['table_name'],
                    primaryKey: this.obj['primaryKey'],
                    dataSearch: this.dataSearch,
                    dataQuery: this.dataFilter['query'],
                    filterJoin: this.dataFilter['join'],
                    hidden_column: this.obj['hidden_column'],
                    field_join: this.obj['field_join'],
                    page: page
                }).then(response => {
                    let res = response.data;
                    let dataIndex = res['data'];
                    this.dataReturn = dataIndex;
                    this.dataTable = dataIndex['data'];
                    this.dataJoin = res['data_join']['data'];
                    this.$store.commit('form/formSubmitChange', false);
                }).catch(error => {
                    this.error = error.response.data.message;
                });
            },
            closeMessage() {
                this.message = '';
            },
            closeError() {
                this.error = '';
            },
            filterData(event) {
                event.preventDefault();
                this.message = '';
                this.error = '';
                this.getData(this.dataReturn.current_page);
            },
            destroyItem(id) {
                if (confirm('Bạn chắc chắn muốn xóa bản ghi này?')) {
                    this.message = '';
                    this.error = '';
                    axios.delete(this.obj['url'] + '/' + id).then(response => {
                        let res = response.data;
                        if (res['status'] === 'success') {
                            this.message = res['message'];
                            this.getData(this.dataReturn.current_page);
                        } else {
                            this.error = res['message'];
                        }
                    }).catch(error => {
                        this.error = error.response.data.message;
                    });
                }
            },
            toggleFormImport() {
                if (!this.importForm) {
                    this.importFile = '';
                }
                this.importForm = !this.importForm;
            },
            onFileChange(e) {
                this.importFile = e.target.files[0]
            },
            submitImport(event) {
                event.preventDefault();
                this.message = '';
                this.error = '';
                if (this.importFile) {
                    this.$store.commit('form/formSubmitChange', true);
                    this.importSubmit = true;
                    let formData = new FormData();
                    formData.append('table', this.obj['table_name']);
                    formData.append('file', this.importFile);
                    axios.post('/import', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                    }).then(response => {
                        let res = response.data;
                        if (res['status'] === 'success') {
                            this.message = res['message'];
                        } else {
                            this.error = res['message'];
                        }
                        this.getData(this.dataReturn.current_page);
                        this.importSubmit = false;
                    }).catch(error => {
                        this.error = error.response.data.message;
                        this.$store.commit('form/formSubmitChange', false);
                        this.importSubmit = false;
                    });
                } else {
                    alert('Trường file không được để trống!');
                }
            },
            exportData() {
                this.$store.commit('form/exportData', {export_name: this.obj['table_name']});
            }
        },
        computed: {
            formSubmit() {
                return this.$store.state.form.formSubmit;
            },
        },
    }
</script>
