<template>
    <div class="report-form" :class="divClass">
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
        <!--message & error-->
        <div v-if="alert !== ''">
            <div class="mb-0 alert alert-secondary pt-1 pb-1">
                <span v-html="alert"></span>
            </div>
        </div>
        <div v-if="message !== ''">
            <div class="mb-0 alert alert-success alert-dismissible">
                <span @click="closeMessage" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Success!</strong>
                <span v-html="message"></span>
            </div>
        </div>
        <div v-if="error !== ''">
            <div class="mb-0 alert alert-danger alert-dismissible">
                <span @click="closeError" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Warning!</strong>
                <span v-html="error"></span>
            </div>
        </div>
        <!--form-->
        <form @submit="submitDataForm($event)" class="pt-2 mb-3 report-form needs-validation" novalidate :disabled="formSubmit">
            <!--action-->
            <div v-if="formType === 2" class="action-report">
                <span @click="createNew()" title="Thêm mới" class="report-button p-2 cursor-pointer">
                    <i class="action-item fas fa-plus p-1 font-size-15"></i>
                </span>
                <button type="submit" :disabled="formSubmit" title="Lưu" class="report-button">
                    <i class="action-item fas fa-save p-1 pt-2 pb-2 font-size-15"></i>
                </button>
                <span v-if="Object.keys(changeRecord).length > 0" class="change-record-action">
                    <span @click="changeRecordId(changeRecord['first'])" :title="'Đầu tiên [' +changeRecord['first'] + ']'" class="p-2" :class="{'report-button change-active': changeRecord['first'] !== ''}">
                        <i class="action-item fas fa-step-backward p-1 font-size-15"></i>
                    </span>
                    <span @click="changeRecordId(changeRecord['previous'])" :title="'Trước [' + changeRecord['previous'] + ']'" class="p-2" :class="{'report-button change-active': changeRecord['previous'] !== ''}">
                        <i class="action-item fas fa-chevron-left p-1 font-size-15"></i>
                    </span>
                    <span @click="changeRecordId(changeRecord['next'])" :title="'Sau [' + changeRecord['next'] + ']'" class="p-2" :class="{'report-button change-active': changeRecord['next'] !== ''}">
                        <i class="action-item fas fa-chevron-right p-1 font-size-15"></i>
                    </span>
                    <span @click="changeRecordId(changeRecord['last'])" :title="'Cuối [' + changeRecord['last'] + ']'" class="p-2" :class="{'report-button change-active': changeRecord['last'] !== ''}">
                        <i class="action-item fas fa-step-forward p-1 font-size-15"></i>
                    </span>
                </span>
                <span v-if="canImport || canExport" class="float-right p-2 import-button-action">
                    <span v-if="canImport">
                        <span @click="toggleFormImport(-1)" class="report-button p-2 cursor-pointer" :class="{'active': importForm && importIndex === -1}">
                            <i title="Import" class="action-item p-1 fas fa-upload"></i>
                            <span style="font-size: 12px;">{{tableName}}</span>
                        </span>
                        <span v-for="(item, key) in importTableJoin" :key="key + 'itj'">
                            <span @click="toggleFormImport(key)" class="report-button p-2 cursor-pointer" :class="{'active': importForm && importIndex === key}">
                                <i title="Import" class="action-item p-1 fas fa-upload"></i>
                                <span style="font-size: 12px;">{{item}}</span>
                            </span>
                        </span>
                    </span>
                    <span v-if="canExport">
                        <span @click="exportData()" class="report-button p-2 cursor-pointer" style="border-left: 1px solid #bbb;">
                            <i :title="$t('button.export_excel')" class="fas fa-file-excel"></i>
                            <span style="font-size: 12px;">{{tableName}}</span>
                        </span>
                    </span>
                </span>
            </div>
            <div v-if="formSubmit" class="loader-line"></div>
            <!--import form-->
            <div v-if="canImport || importTableJoin">
                <form v-if="importForm" @submit="submitImport($event)" class="container-fluid p-1 mb-2 report-form needs-validation" novalidate style="background: #e1e1e1;">
                    <div class="row">
                        <div class="col-sm-11 col-md-11">
                            <input @change="onFileChange($event)" type="file" name="file" class="form-control-file form-control-sm d-inline w-auto" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required>
                            <button type="submit" class="d-inline" style="border: 1px solid #777;">
                                {{submitTitle}}
                            </button>
                        </div>
                        <div class="col-sm-1 col-md-1">
                            <div class="pt-2">
                                <a :href="'/files/import_sample/import_' + importFileName + '.xlsx'" title="Tải file mẫu import" download class="mr-3">
                                    File mẫu <i class="fas fa-file-download"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div v-else style="height: 3px"></div>
            <div v-if="Object.keys(record).length > 0">
                <input type="hidden" v-model="dataModel[obj['primaryKey']]">
            </div>
            <div class="row">
                <div v-for="(item, key) in form" :key="key + 'form'" :class="item['class']">
                    <FormDiv v-if="item['type'] === 'div'" :obj="obj" :config="config" :div_items="item['items']"/>
                    <FormFieldset v-if="item['type'] === 'fieldset'" :config="config" :obj="obj" :fieldset="item['items']"/>
                    <FormField v-if="item['type'] === 'field'" :config="config" :obj="obj" :fields="item['items']"/>
                </div>
            </div>
            <TableJoin v-if="joinConfig.length > 0" :config="config"/>
            <div v-if="formType === 1" class="text-center mt-3">
                <button class="btn btn-primary w-25" type="submit" :disabled="formSubmit">
                    <span v-if="formSubmit" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Xác nhận
                </button>
            </div>
        </form>
        <SearchModalPrimaryKey/>
        <SearchModal/>
        <TableJoinSearchModal/>
    </div>
</template>

<script>
    import FormDiv from './FormDiv';
    import FormFieldset from './FormFieldset';
    import FormField from './FormField';
    import InputReference from './InputReference';
    import InputSearchPopup from './InputSearchPopup';
    import SearchModalPrimaryKey from './SearchModalPrimaryKey';
    import SearchModal from './SearchModal';
    import TableJoin from './TableJoin';
    import TableJoinSearchModal from './TableJoinSearchModal';

    export default {
        components: {
            FormDiv,
            FormFieldset,
            FormField,
            InputReference,
            InputSearchPopup,
            SearchModalPrimaryKey,
            SearchModal,
            TableJoin,
            TableJoinSearchModal,
        },
        props: [
            'obj'
        ],
        data() {
            return {
                config: report_config,
                form: this.obj['form'],
                formType: '',
                tableName: '',
                canImport: false,
                canExport: false,
                importTableJoin: [],
                importIndex: '',
                importForm: false,
                submitTitle: 'Import',
                importFileName: '',
                divClass: '',
            }
        },
        created() {
            this.$store.commit('form/initData', {data: this.obj, config: this.config});
            this.tableName = this.obj['table_name'];
            if (this.obj['import'] !== 'undefined') {
                this.canImport = this.obj['import'];
            }
            if (this.obj['export'] !== 'undefined') {
                this.canExport = this.obj['export'];
            }
            if (this.obj['import_table_join'] !== 'undefined') {
                this.importTableJoin = this.obj['import_table_join'];
            }
            if (this.obj['primarySearch'] !== 'undefined' && Object.keys(this.obj['primarySearch']).length > 0) {
                this.formType = 2; // has action bar
            } else {
                this.formType = 1; // submit form at bottom
            }
            let url = this.obj['url'].split('/');
            if (typeof url[1] !== 'undefined') {
                this.divClass = url[1];
            }
        },
        methods: {
            createNew() {
                this.$store.commit('form/createNewRecord');
            },
            submitDataForm(event) {
                event.preventDefault();
                this.$store.commit('form/formSubmitData');
            },
            closeMessage() {
                this.$store.commit('form/clearMessage');
            },
            closeError() {
                this.$store.commit('form/clearError');
            },
            changeRecordId(id) {
                if (id) {
                    this.$store.commit('form/changeRecordById', id);
                }
            },
            toggleFormImport(key) {
                if (this.importIndex === key) {
                    this.importForm = !this.importForm;
                } else {
                    if (key === -1) {
                        this.submitTitle = 'Import ' + this.tableName;
                        this.importFileName = this.tableName;
                    } else {
                        this.submitTitle = 'Import ' + this.importTableJoin[key];
                        this.importFileName = this.importTableJoin[key];
                    }
                    this.importIndex = key;
                    if (!this.importForm) {
                        this.importForm = true;
                    }
                }
            },
            onFileChange(e) {
                this.$store.commit('form/onFileChangeImportHeader', e);
            },
            submitImport(event) {
                event.preventDefault();
                let table = '';
                if (this.importIndex === -1) {
                    table = this.tableName;
                } else {
                    table = this.importTableJoin[this.importIndex];
                }
                this.$store.commit('form/submitImportHeader', table);
            },
            exportData(key) {
                this.$store.commit('form/exportData', {
                    export_name: this.obj['table_name'],
                });
            }
        },
        computed: {
            alert() {
                return this.$store.state.form.alert;
            },
            message() {
                return this.$store.state.form.message;
            },
            error() {
                return this.$store.state.form.error;
            },
            record() {
                return this.$store.state.form.record;
            },
            dataModel() {
                return this.$store.state.form.dataModel;
            },
            formSubmit() {
                return this.$store.state.form.formSubmit;
            },
            changeRecord() {
                return this.$store.state.form.changeRecord;
            },
            joinConfig() {
                return this.$store.state.form.joinConfig;
            },
        }
    }
</script>
