<template>
    <div class="list-report fixed-action table-join">
        <div>
            <ul class="nav nav-tabs">
                <li v-for="(item, key) in joinConfig" v-if="tabShow(key)" :key="key + 'tj-li'" class="nav-item">
                    <a @click="tabClick(key)" class="nav-link" :class="{'active show': key === joinTab}" data-toggle="tab" :href="'#table-join-item-' + key">
                        {{item['label_tab']}}
                    </a>
                </li>
            </ul>
            <div class="tab-content overflow-auto no-wrap table-responsive-lg" style="min-height: 150px;">
                <div v-for="(item, key) in joinConfig" :key="key + 'tj-content'" class="tab-pane fade" :class="{'active show': key === joinTab}" :id="'table-join-item-' + key">
                    <!--action-->
                    <div class="action-report">
                        <span v-if="(typeof item['add_new'] === 'undefined' || item['add_new']) && typeof item['add_link'] === 'undefined'" @click="addNew(key)" title="Thêm mới" class="report-button p-1 cursor-pointer mr-1">
                            <i class="action-item fas fa-plus p-1 font-size-15"></i>
                        </span>
                        <a v-if="typeof item['add_new'] !== 'undefined' && item['add_new'] && typeof item['add_link'] !== 'undefined'" :href="item['add_link']" title="Thêm mới" class="report-button p-1 cursor-pointer mr-1">
                            <i class="action-item fas fa-plus p-1 font-size-15"></i>
                        </a>
                        <span @click="delData()" title="Xóa" class="report-button cursor-pointer d-none">
                            <i class="action-item fas fa-trash-alt p-1"></i>
                        </span>
                        <span v-if="Object.keys(record).length > 0 && canImport[key]" @click="toggleFormImport(key)" class="report-button p-1 cursor-pointer mr-2">
                            <i v-if="!importForm" title="Import" class="fas fa-upload"></i>
                            <i v-else title="Hủy Import" class="fas fa-minus-circle"></i>
                        </span>
                        <span v-if="Object.keys(record).length > 0 && canExport[key]" @click="exportData(key)" class="report-button p-1 cursor-pointer d-inline-block mr-2">
                            <i :title="$t('button.export_excel')" class="fas fa-file-excel"></i>
                        </span>
                    </div>
                    <div v-show="canImport[key] && importForm">
                        <div class="row mb-2">
                            <div class="col-sm-11 col-md-11">
                                <form @submit="submitImport($event, key)" class="container-fluid pt-2 report-form needs-validation" novalidate :disabled="importSubmit">
                                    <div class="row">
                                        <div class="col-sm-6 col-md-3">
                                            <input @change="onFileChange($event, key)" type="file" name="file" class="form-control-file form-control-sm p-0" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" required>
                                        </div>
                                        <div class="col-sm-6 col-md-9">
                                            <button type="submit" style="border: 1px solid #777;">
                                                Import Data
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-sm-1 col-md-1">
                                <div class="pt-2">
                                    <a :href="'/files/import_sample/import_' + item['table'] + '.xlsx'" title="Tải file mẫu import" download class="mr-3">
                                        File mẫu <i class="fas fa-file-download"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--filter-->
                    <div v-if="typeof item['search_filter'] !== 'undefined'" class="form-row table-filter">
                        <div v-for="(item_filter, key_filter, index_filter) in item['search_filter']" :key="index_filter + 'search'" class="col-md-2 mb-1">
                            <label class="mb-0">{{key_filter.replace(explode_filter, ' ')}}</label>
                            <div v-if="item_filter === config['integer']">
                                <label class="mb-0 w-100">
                                    <input type="number" min="0" step="1" class="form-control report-input" v-model="dataJoinSearch[key][key_filter]">
                                </label>
                            </div>
                            <div v-else-if="item_filter === config['decimal']">
                                <label class="mb-0 w-100">
                                    <input type="number" class="form-control report-input" v-model="dataJoinSearch[key][key_filter]">
                                </label>
                            </div>
                            <div v-else-if="item_filter === config['boolean']">
                                <label class="mb-0 w-100">
                                    <input type="checkbox" v-model="dataJoinSearch[key][key_filter]">
                                </label>
                            </div>
                            <div v-else-if="item_filter === config['date']">
                                <label class="mb-0 w-100">
                                    <input type="date" class="form-control report-input" v-model="dataJoinSearch[key][key_filter]">
                                </label>
                            </div>
                            <div v-else-if="item_filter === config['select']">
                                <label class="mb-0 w-100">
                                    <select class="form-control report-input" v-model="dataJoinSearch[key][key_filter]">
                                        <option value>{{$t('button.all')}}</option>
                                        <option v-for="(option_f, key_opf) in item['select'][key_filter]" :key="key + key_opf + 'select-search'" :value="key_opf">
                                            {{$te('button.' + option_f) ? $t('button.' + option_f) : option_f}}
                                        </option>
                                    </select>
                                </label>
                            </div>
                            <div v-else>
                                <label class="mb-0 w-100">
                                    <input type="text" class="form-control report-input" v-model="dataJoinSearch[key][key_filter]">
                                </label>
                            </div>
                        </div>
                        <div class="col-md-1 mb-1">
                            <label class="mb-0" style="opacity: 0;">Tìm</label>
                            <div>
                                <span @click="filterTableJoinData" title="Tìm" class="cursor-pointer report-button">
                                    <i class="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!--table data-->
                    <table class="table-report table table-sm table-striped table-hover">
                        <thead>
                        <tr>
                            <th @click="sortColumnTableJoin(key, th)" v-for="(th, th_k) in item['field_name']" v-if="th !== item['primaryKey'] && th !== item['join_field'] && !item['hide_field'].includes(th)" :key="th_k + 'tj-th'" :class="[{'report-sort': typeof item['sort'] !== 'undefined' && item['sort'].includes(th)}, {'sort-asc': dataSortTableJoin.length && typeof dataSortTableJoin[key][th] !== 'undefined' && dataSortTableJoin[key][th] === 'asc'}, {'sort-desc': dataSortTableJoin.length && typeof dataSortTableJoin[key][th] !== 'undefined' && dataSortTableJoin[key][th] === 'desc'}]">
                                <span>{{$t('database.' + th)}}</span>
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        <!--add new-->
                        <tr v-for="(add, add_key) in addData[key]" :key="add_key + 'tr-new'">
                            <td v-for="(value, name, index) in add" :key="index + 'td-new'" v-if="name !== item['primaryKey'] && name !== item['join_field']">
                                <TableJoinSearchPopup v-if="[config['search_popup'], config['view_search_popup']].includes(item['field_type'][name])" :config="config" :required="item['required']" :f_name="name" :f_type="item['field_type'][name]" :key_1="key" :key_2="add_key" :isNew="true"/>
                                <TableJoinInput v-else :config="config" :f_type="item['field_type'][name]" :f_name="name" :key_1="key" :key_2="add_key" :required="item['required']" :select="[]" :isNew="true"/>
                            </td>
                            <td class="td-action">
                                <span @click="removeRow(key, add_key)" title="Xóa dòng" class="report-button row-button cursor-pointer">
                                    <i class="far fa-trash-alt"></i>
                                </span>
                            </td>
                        </tr>
                        <!--show & edit-->
                        <tr v-if="typeof item['record'] !== 'undefined'" v-for="(edit, edit_key) in item['record']" :key="edit_key + '-tr-edit'">
                            <td v-for="(name, index) in item['field_name']" :key="index + 'td-edit'" v-if="name !== item['primaryKey'] && name !== item['join_field'] && !item['hide_field'].includes(name)">
                                <div v-if="!joinIsEdited[key][edit[item['primaryKey']]]">
                                    <div v-if="Object.keys(joinConfig[key]['join']).includes(name)">
                                        <span v-if="typeof item['record_join'] !== 'undefined'">
                                            {{item['record_join'][edit_key][name + '_Join']}}
                                        </span>
                                        <span v-if="edit[name] !== null">
                                             [{{edit[name]}}]
                                        </span>
                                    </div>
                                    <div v-else>
                                        <div v-if="typeof(item['field_type'][name]) === 'undefined'">
                                            {{edit[name]}}
                                        </div>
                                        <TableJoinImageView v-else-if="item['field_type'][name] === config['view_image']" :tab_key="key" :f_name="name" :f_value="edit[name]"/>
                                        <div v-else :inner-html.prop="item['field_type'][name] | reportDataShow(edit[name], name, item['select'])"></div>
                                    </div>
                                </div>
                                <div v-else>
                                    <TableJoinSearchPopup v-if="[config['search_popup'], config['view_search_popup']].includes(item['field_type'][name])" :config="config" :required="item['required']" :f_type="item['field_type'][name]" :f_name="name" :key_1="key" :key_2="edit[item['primaryKey']]" :isNew="false"/>
                                    <TableJoinInput v-else :config="config" :f_type="item['field_type'][name]" :f_name="name" :key_1="key" :key_2="edit[item['primaryKey']]" :required="item['required']" :select="[]" :isNew="false"/>
                                </div>
                            </td>
                            <td v-if="(typeof item['can_edit'] === 'undefined' || item['can_edit'])" class="text-center td-action">
                                <div v-if="!joinIsEdited[key][edit[item['primaryKey']]]">
                                    <span v-if="typeof joinConfig[key]['edit_link'] === 'undefined'" @click="editRow(edit[item['primaryKey']], key, edit_key)" title="Sửa" class="report-button row-button report-edit cursor-pointer">
                                        <i class="fas fa-pencil-alt"></i>
                                    </span>
                                    <a v-else :href="joinConfig[key]['edit_link'] + edit[item['primaryKey']] + '/edit'" title="Sửa" class="report-button row-button report-edit cursor-pointer">
                                        <i class="fas fa-pencil-alt"></i>
                                    </a>
                                </div>
                                <div v-else>
                                    <span @click="editRow(edit[item['primaryKey']], key, edit_key)" title="Hủy" class="report-button row-button report-edit cursor-pointer">
                                        <i class="fas fa-times"></i>
                                    </span>
                                </div>
                            </td>
                            <td v-else></td>
                        </tr>
                        </tbody>
                    </table>
                    <!--pagination-->
                    <div v-if="typeof item['recordReturn'] !== 'undefined'" class="card-footer report-footer">
                        <pagination :data="item['recordReturn']" :limit="3" @pagination-change-page="getTableJoinData">
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
    import TableJoinInput from './TableJoinInput';
    import TableJoinSearchPopup from './TableJoinSearchPopup';
    import TableJoinImageView from './TableJoinImageView';

    export default {
        components: {
            TableJoinInput,
            TableJoinSearchPopup,
            TableJoinImageView,
        },
        props: [
            'config'
        ],
        data() {
            return {
                TabActive: [],
                tabFieldDependence: [],
                oldDataModel: {},
                explode_filter: '',
            }
        },
        created() {
            this.explode_filter = explode_filter;
            this.oldDataModel = Object.assign({}, this.dataModel);
            if (typeof this.tabDependence['tab'] !== 'undefined') {
                for (let i of this.tabDependence['tab']) {
                    if (typeof i === 'string') {
                        if (!this.tabFieldDependence.includes(i)) {
                            this.tabFieldDependence.push(i);
                        }
                    } else {
                        for (let j of i) {
                            if (!this.tabFieldDependence.includes(j)) {
                                this.tabFieldDependence.push(j);
                            }
                        }
                    }
                }
            }
        },
        methods: {
            tabClick(key) {
                this.$store.commit('form/setJoinTab', key);
            },
            addNew(key) {
                this.$store.commit('form/setAddData', key);
                this.$forceUpdate();
            },
            removeRow(key, index) {
                this.$store.commit('form/removeAddData', {key: key, index: index});
                this.$forceUpdate();
            },
            editRow(id, key_1, key_2) {
                this.$store.commit('form/changeJoinIsEdited', {id: id, key: key_1, key_2: key_2});
                this.$forceUpdate();
            },
            delData() {
            },
            toggleFormImport(key) {
                this.$store.commit('form/toggleJoinFormImport', key);
            },
            onFileChange(e, key) {
                this.$store.commit('form/onJoinFileChange', {e: e, key: key});
            },
            submitImport(event, key) {
                event.preventDefault();
                if (this.importFile[key]) {
                }
                this.$store.commit('form/submitJoinImport', key);
            },
            tabShow(tab_index) {
                if (typeof this.tabDependence['tab'] === 'undefined') {
                    return true;
                }
                if (typeof this.tabDependence['tab'][tab_index] === 'undefined') {
                    return true;
                }
                let dep = this.tabDependence['tab'][tab_index];
                if (typeof this.tabDependence['allow'][tab_index] === 'undefined') {
                    return true;
                }
                // dependence with one field
                if (typeof dep === 'string') {
                    if (typeof this.tabDependence['allow'][tab_index][dep] === 'undefined') {
                        return true;
                    }
                    let show = this.tabDependence['allow'][tab_index][dep];
                    show = show.map(x => x.toString());
                    let val = this.dataModel[dep] !== null ? this.dataModel[dep].toString() : '';
                    return !!show.includes(val);
                } else {
                    // dependence with multiple field
                    let count = 0;
                    let allow = 0;
                    for (let i of dep) {
                        count++;
                        if (typeof this.tabDependence['allow'][tab_index][i] !== 'undefined') {
                            let show = this.tabDependence['allow'][tab_index][i];
                            show = show.map(x => x.toString());
                            let val = this.dataModel[i] !== null ? this.dataModel[i].toString() : '';
                            if (!!show.includes(val)) {
                                allow++;
                            }
                        }
                    }
                    return count === allow;
                }
            },
            setTabActive() {
                this.TabActive = [];
                for (let i = 0; i < Object.keys(this.joinConfig).length; i++) {
                    if (this.tabShow(i)) {
                        this.TabActive.push(i);
                    }
                }
                if (this.TabActive) {
                    if (!this.TabActive.includes(this.joinTab)) {
                        this.$store.commit('form/setJoinTab', this.TabActive[0]);
                    }
                }
            },
            getTableJoinData(page = 1) {
                this.$store.commit('form/tableJoinPagination', page);
            },
            filterTableJoinData() {
                this.$store.commit('form/tableJoinPagination', 1);
            },
            sortColumnTableJoin(tab_index, f_name) {
                if (typeof this.joinConfig[tab_index]['sort'] !== 'undefined' && this.joinConfig[tab_index]['sort'].includes(f_name)) {
                    this.$store.commit('form/sortColumnTableJoin', {tab_index: tab_index, f_name: f_name});
                }
            },
            exportData(key) {
                if (Object.keys(this.record).length > 0) {
                    this.$store.commit('form/exportData', {
                        export_name: this.joinConfig[key]['table'],
                        parent_id: this.record[this.objData['primaryKey']],
                    });
                }
            }
        },
        computed: {
            objData() {
                return this.$store.state.form.objData;
            },
            record() {
                return this.$store.state.form.record;
            },
            joinTab() {
                return this.$store.state.form.joinTab;
            },
            joinConfig() {
                return this.$store.state.form.joinConfig;
            },
            addData() {
                return this.$store.state.form.addData;
            },
            joinIsEdited() {
                return this.$store.state.form.joinIsEdited;
            },
            joinDataEdit() {
                return this.$store.state.form.joinDataEdit;
            },
            canImport() {
                return this.$store.state.form.canImport;
            },
            canExport() {
                return this.$store.state.form.canExport;
            },
            importForm() {
                return this.$store.state.form.importForm;
            },
            importSubmit() {
                return this.$store.state.form.importSubmit;
            },
            importFile() {
                return this.$store.state.form.importFile;
            },
            dataModel() {
                return this.$store.state.form.dataModel;
            },
            tabDependence() {
                return this.$store.state.form.tabDependenceConfig;
            },
            dataJoinSearch() {
                return this.$store.state.form.dataJoinSearch;
            },
            dataSortTableJoin() {
                return this.$store.state.form.dataSortTableJoin;
            },
        },
        watch: {
            dataModel: {
                handler: function (after, before) {
                    if (this.tabFieldDependence) {
                        for (let i of this.tabFieldDependence) {
                            if (this.oldDataModel[i] !== after[i]) {
                                this.setTabActive();
                                break;
                            }
                        }
                    }
                    this.oldDataModel = Object.assign({}, this.dataModel);
                },
                deep: true,
            },
        }
    }
</script>
