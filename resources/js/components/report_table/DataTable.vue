<template>
    <div class="report-component">
        <!--overlay loader-->
        <div class="report-loader" v-if="isLoading">
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
        <!--filter-->
        <div class="search-report" v-if="Object.keys(search).length > 0">
            <form @submit="filterData($event)" class="form-row">
                <div v-for="(item, key, index) in search['search_filter']" :key="index + 'search'" class="col-md-2 mb-1">
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
                                <option v-for="(option, k_2) in search['select'][key]" :key="index + k_2 + 'select-search'" :value="k_2">
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
                    <label class="mb-0" style="opacity: 0;">Tìm</label>
                    <div>
                        <button type="submit" title="Tìm" class="report-button">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <!--message & error-->
        <div v-if="message !== ''" class="mb-1">
            <div class="mb-0 alert alert-success alert-dismissible">
                <span @click="closeMessage" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong style="text-transform: capitalize;">{{$t('message.success')}}</strong>
                <span v-html="message"></span>
            </div>
        </div>
        <div v-if="error !== ''" class="mb-1">
            <div class="mb-0 alert alert-danger alert-dismissible">
                <span @click="closeError" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong style="text-transform: capitalize;">{{$t('message.error')}}</strong>
                <span v-html="error"></span>
            </div>
        </div>
        <!--action-->
        <div class="action-report p-1">
            <button @click="reloadData()" :title="$t('button.reload')" class="report-button">
                <i class="action-item fas fa-redo p-1"></i>
            </button>
            <button @click="saveData()" title="Lưu" class="report-button" :disabled='saveDisabled'>
                <i class="action-item fas fa-save p-1 font-size-15"></i>
            </button>
            <button v-if="canAdd" @click="addNew()" :title="$t('button.add')" class="report-button">
                <i class="action-item fas fa-plus p-1 font-size-15"></i>
            </button>
            <button v-if="Object.values(canDel).includes(true)" @click="delData()" title="Xóa" class="report-button" :disabled='delDisabled'>
                <i class="action-item fas fa-trash-alt p-1"></i>
            </button>
            <button @click="tableClass()" :title="$t('button.expand')" class="report-button" :class="{'active': tableWidth}">
                <i class="action-item fas fa-expand-arrows-alt"></i>
            </button>
            <button @click="tableWordWrap()" :title="$t('button.word_wrap')" class="report-button" :class="{'active': noWrap}">
                <i class="action-item fa fa-text-width"></i>
            </button>
        </div>
        <!--table data-->
        <div class="list-report" :class="{'fixed-action': tdFixedAction}" ref="list_report">
            <form class="needs-validation" novalidate>
                <table class="table-report" :class="{'width-100': tableWidth, 'no-wrap': noWrap}" ref="table_report">
                    <!--thead-->
                    <thead>
                    <tr>
                        <th></th>
                        <th>
                            <label>
                                <input type="checkbox" @change="checkBox" :disabled="!Object.values(canDel).includes(true)">
                            </label>
                        </th>
                        <th @click="dataSort(fieldName[key])" v-for="(title, key) in thead" :key="key +'th-head'" v-if="fieldName[key] !== primaryKey" :class="[{'report-sort': sort.includes(fieldName[key])}, {'sort-asc': dSort.hasOwnProperty(fieldName[key]) && Object.values(dSort).indexOf('asc') > -1}, {'sort-desc': dSort.hasOwnProperty(fieldName[key]) && Object.values(dSort).indexOf('desc') > -1}]">
                            <span>{{ $t('database.' + title) }}</span>
                        </th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <!--add new-->
                    <tr v-for="(item, key) in dataNew" :key="key + 'tr-new'">
                        <td></td>
                        <td></td>
                        <td v-for="(f_value, f_name, k_item) in item" :key="k_item + 'td-new'" v-if="f_name !== primaryKey">
                            <InputSearchPopup v-if="fieldType[f_name] === config['search_popup']" :index="key" :f_name="f_name" :isNew="true"/>
                            <InputForm v-else-if="!hiddenInput.includes(f_name)" :config="config" :f_type="fieldType[f_name]" :f_name="f_name" :required="required" :select="select" v-model="dataNew[key][f_name]"/>
                        </td>
                        <td class="td-action">
                            <button @click="removeRow(key)" title="Xóa dòng" class="report-button row-button">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    <!-- show/edit -->
                    <tr v-for="(item, key) in tbody" :key="key + 'tr-data'">
                        <td class="text-muted">{{(perPage * (currentPage - 1) + (key + 1))}}</td>
                        <td v-if="!isEdited[item[primaryKey]]">
                            <label>
                                <input @change="checkBoxItem(item[primaryKey], $event)" type="checkbox" :checked='isChecked && canDel[item[primaryKey]]' :disabled="!canDel[item[primaryKey]]">
                            </label>
                        </td>
                        <td v-else>
                            <InputForm :config="config" :f_type="'id'" :f_name="primaryKey" :required="required" :select="select" v-model="dataEdit[item[primaryKey]][primaryKey]"/>
                        </td>
                        <td v-for="(value, f_name, index) in item" :key="index + 'td-data'" v-if="f_name !== primaryKey">
                            <div v-if="!isEdited[item[primaryKey]]">
                                <div v-if="typeof(fieldJoin[f_name]) !== 'undefined' && typeof(dataJoin[index]) !== 'undefined' && typeof(dataJoin[index][f_name + '_Join']) !== 'undefined'">
                                    {{dataJoin[index][f_name + '_Join']}}
                                    <span v-if="typeof fieldJoin[f_name]['get_field'] === 'string'">
                                         [{{value}}]
                                    </span>
                                </div>
                                <div v-else-if="typeof(fieldType[f_name]) == 'undefined'">{{value}}</div>
                                <div v-else :inner-html.prop="fieldType[f_name] | reportDataShow(value, f_name, select)"></div>
                            </div>
                            <div v-else>
                                <InputSearchPopup v-if="fieldType[f_name] === config['search_popup']" :index="item[primaryKey]" :f_name="f_name" :isNew="false"/>
                                <InputForm v-else-if="!hiddenInput.includes(f_name)" :config="config" :f_type="fieldType[f_name]" :f_name="f_name" :required="required" :select="select" v-model="dataEdit[item[primaryKey]][f_name]"/>
                                <div v-else>
                                    <div v-if="typeof(fieldJoin[f_name]) !== 'undefined' && typeof(dataJoin[index]) !== 'undefined' && typeof(dataJoin[index][f_name + '_Join']) !== 'undefined'">
                                        {{dataJoin[index][f_name + '_Join']}}
                                        <span v-if="typeof fieldJoin[f_name]['get_field'] === 'string'">
                                         [{{value}}]
                                    </span>
                                    </div>
                                    <div v-else-if="typeof(fieldType[f_name]) == 'undefined'">{{value}}</div>
                                    <div v-else :inner-html.prop="fieldType[f_name] | reportDataShow(value, f_name, select)"></div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center td-action" v-if="!isEdited[item[primaryKey]]">
                            <span v-if="canUpdate[item[primaryKey]]" @click="editRow(item[primaryKey], key)" title="Sửa" class="report-button row-button report-edit cursor-pointer">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </td>
                        <td v-else class="td-action">
                            <span v-if="canUpdate[item[primaryKey]]" @click="editRow(item[primaryKey], key)" title="Hủy" class="report-button row-button report-edit cursor-pointer">
                                <i class="fas fa-times"></i>
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        <!--pagination-->
        <div class="card-footer report-footer">
            <pagination :data="data" :limit="3" @pagination-change-page="getData">
                <span slot="prev-nav">{{$t('button.previous')}}</span>
                <span slot="next-nav">{{$t('button.next')}}</span>
            </pagination>
        </div>
        <SearchPopupModal/>
    </div>
</template>

<script>
    import InputSearchPopup from './InputSearchPopup';
    import InputForm from './InputForm';
    import SearchPopupModal from './SearchPopupModal';

    export default {
        components: {
            InputSearchPopup,
            InputForm,
            SearchPopupModal,
        },
        props: [
            'obj'
        ],
        data() {
            return {
                config: {},
                explode_filter: {},
            }
        },
        created() {
            this.config = report_config;
            this.explode_filter = explode_filter;
            this.$store.commit('list/initData', {obj: this.obj, config: this.config});
            this.getData();
        },
        methods: {
            getData(page = 1) {
                this.$store.commit('list/getData', {
                    links: this.obj,
                    page: page,
                    thisTemplate: this
                });
            },
            reloadData() {
                this.$store.commit('list/reloadData');
            },
            tableClass() {
                this.$store.commit('list/tableClass', this);
            },
            tableWordWrap() {
                this.$store.commit('list/tableWordWrap');
            },
            checkBox() {
                this.$store.commit('list/checkBox');
            },
            checkBoxItem(id, event) {
                this.$store.commit('list/checkBoxItem', {id: id, event: event});
            },
            addNew() {
                this.$store.commit('list/addNew');
            },
            removeRow(key) {
                this.$store.commit('list/removeRow', key);
            },
            editRow(id, key) {
                this.$store.commit('list/editRow', {id: id, key: key});
                this.$forceUpdate();
            },
            saveData() {
                this.$store.commit('list/saveData');
            },
            delData() {
                this.$store.commit('list/deleteDataRecords', this.$t('message.delete_confirm'));
            },
            filterData(event) {
                event.preventDefault();
                this.reloadData();
            },
            dataSort(f_name) {
                this.$store.commit('list/dataSortRecords', f_name);
            },
            closeMessage() {
                this.$store.commit('list/clearMessage');
            },
            closeError() {
                this.$store.commit('list/clearError');
            },
        },
        computed: {
            message() {
                return this.$store.state.list.message;
            },
            error() {
                return this.$store.state.list.error;
            },
            primaryKey() {
                return this.$store.state.list.primaryKey;
            },
            isLoading() {
                return this.$store.state.list.isLoading;
            },
            thead() {
                return this.$store.state.list.thead;
            },
            fieldName() {
                return this.$store.state.list.fieldName;
            },
            fieldType() {
                return this.$store.state.list.fieldType;
            },
            fieldJoin() {
                return this.$store.state.list.fieldJoin;
            },
            data() {
                return this.$store.state.list.data;
            },
            tbody() {
                return this.$store.state.list.tbody;
            },
            dataJoin() {
                return this.$store.state.list.dataJoin;
            },
            required() {
                return this.$store.state.list.required;
            },
            select() {
                return this.$store.state.list.select;
            },
            hiddenInput() {
                return this.$store.state.list.hiddenInput;
            },
            search() {
                return this.$store.state.list.search;
            },
            sort() {
                return this.$store.state.list.sort;
            },
            tableWidth() {
                return this.$store.state.list.tableWidth;
            },
            noWrap() {
                return this.$store.state.list.noWrap;
            },
            saveDisabled() {
                return this.$store.state.list.saveDisabled;
            },
            delDisabled() {
                return this.$store.state.list.delDisabled;
            },
            isChecked() {
                return this.$store.state.list.isChecked;
            },
            tdFixedAction() {
                return this.$store.state.list.tdFixedAction;
            },
            dataNew() {
                return this.$store.state.list.dataNew;
            },
            isEdited() {
                return this.$store.state.list.isEdited;
            },
            dataEdit() {
                return this.$store.state.list.dataEdit;
            },
            dataDel() {
                return this.$store.state.list.dataDel;
            },
            dataSearch() {
                return this.$store.state.list.dataSearch;
            },
            dSort() {
                return this.$store.state.list.dSort;
            },
            canAdd() {
                return this.$store.state.list.canAdd;
            },
            canUpdate() {
                return this.$store.state.list.canUpdate;
            },
            canDel() {
                return this.$store.state.list.canDel;
            },
            currentPage() {
                return this.$store.state.list.currentPage;
            },
            perPage() {
                return this.$store.state.list.perPage;
            },
        }
    }
</script>
