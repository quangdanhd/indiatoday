export default {
    initData(state, data) {
        state.config = data['config'];
        let obj = data['obj'];
        state.obj = obj;
        state.url = obj['url'];
        state.tableName = obj['table_name'];
        state.primaryKey = obj['primaryKey'];
        state.thead = obj['table_th'];
        state.fieldName = obj['field_name'];
        state.fieldType = obj['field_type'];
        state.fieldJoin = obj['field_join'];
        state.required = obj['required'];
        state.select = obj['select'];
        state.hiddenInput = obj['hidden_input'];
        state.search = obj['search'];
        state.sort = obj['sort'];
        state.canAdd = obj['canAdd'];
        // filter
        for (let i in state.search['search_filter']) {
            if (typeof state.search['selected'] !== 'undefined' && typeof state.search['selected'][i] !== 'undefined') {
                state.dataSearch[i] = state.search['selected'][i];
            } else {
                state.dataSearch[i] = '';
            }
        }
    },
    getData(state, data) {
        state.dataNew = [];
        state.dataNewPopup = [];
        state.dataEdit = {};
        state.dataEditPopup = {};
        state.dataDel = [];
        state.currentPage = typeof data['page'] !== 'undefined' ? data['page'] : 1;
        let thisTemplate = typeof data['thisTemplate'] !== 'undefined' ? data['thisTemplate'] : null;
        state.isLoading = true;
        this.isLoading = true;
        let custom_config = typeof state.obj['custom_config'] !== 'undefined' ? state.obj['custom_config'] : [];
        axios.post('/data-table-index', {
            url: state.url,
            table: state.tableName,
            primaryKey: state.primaryKey,
            field_join: state.fieldJoin,
            dataSearch: state.dataSearch,
            dataQuery: state.search['query'],
            filterJoin: state.search['join'],
            dataSort: state.dSort,
            hidden_column: [],
            custom_config: custom_config,
            page: state.currentPage
        }).then(response => {
            let res = response.data;
            // data with pagination parameter
            state.data = res.data;
            // set data
            state.currentPage = state.data.current_page;
            state.perPage = state.data.per_page;
            state.tbody = res.data.data;
            if (typeof res['data_join']['data'] != 'undefined') {
                state.dataJoin = res['data_join']['data'];
            }
            // update & destroy
            state.canUpdate = res.canUpdate;
            state.canDel = res.canDel;
            // set is edit item
            for (let i in state.tbody) {
                state.isEdited[state.tbody[i][state.primaryKey]] = false;
            }
            // stop loading
            state.isLoading = false;
            // td action fixed
            if (thisTemplate !== null) {
                setTimeout(function () {
                    state.tdFixedAction = thisTemplate.$refs.table_report.clientWidth > thisTemplate.$refs.list_report.clientWidth;
                }, 100);
            }
        }).catch(error => {
            this.error = error.response.data.message;
        });
    },
    reloadData(state) {
        state.dataNew = [];
        state.dataNewPopup = [];
        state.isEdited = {};
        state.dataEdit = {};
        state.dataDel = [];
        this.commit('list/getData', {});
    },
    tableClass(state, thisTemplate) {
        state.tableWidth = !state.tableWidth;
        // td action
        setTimeout(function () {
            state.tdFixedAction = thisTemplate.$refs.table_report.clientWidth > thisTemplate.$refs.list_report.clientWidth;
        }, 100);
    },
    tableWordWrap(state) {
        state.noWrap = !state.noWrap;
    },
    checkBox(state) {
        state.isChecked = !state.isChecked;
        if (state.isChecked) {
            for (let i in state.tbody) {
                state.dataDel.push(state.tbody[i][state.primaryKey]);
            }
        } else {
            state.dataDel = [];
        }
        state.delDisabled = !state.isChecked
    },
    checkBoxItem(state, data) {
        let id = data['id'];
        let event = data['event'];
        if (event.target.checked) {
            state.dataDel.push(id);
        } else {
            let index = state.dataDel.indexOf(id);
            state.dataDel.splice(index, 1);
        }
        state.delDisabled = !state.dataDel.length
    },
    addNew(state) {
        state.tableWidth = true;
        state.saveDisabled = false;
        let dataKey = {};
        for (let i of state.fieldName) {
            dataKey[i] = '';
            // v-model if has default value
            if (typeof state.obj['default_value'] !== 'undefined' && i in state.obj['default_value']) {
                dataKey[i] = state.obj['default_value'][i];
            }
        }
        state.dataNew.push(dataKey);
        let dataNewPopup = {};
        for (let i of state.fieldName) {
            // v-model add field search popup
            if (state.fieldType[i] === state.config['search_popup']) {
                dataNewPopup[i] = '';
            }
        }
        state.dataNewPopup.push(dataNewPopup);
    },
    removeRow(state, key) {
        state.dataNew.splice(key, 1);
        state.dataNewPopup.splice(key, 1);
    },
    editRow(state, data) {
        let id = data['id'];
        let key = data['key'];
        state.tableWidth = true;
        state.isEdited[id] = !state.isEdited[id];
        if (state.isEdited[id]) {
            state.dataEdit[id] = Object.assign({}, state.tbody[key]);
            state.dataEditPopup[id] = Object.assign({}, state.dataJoin[key]);
        } else {
            delete state.dataEdit[id];
            delete state.dataEditPopup[id];
        }
        state.saveDisabled = !(state.dataNew.length > 0 || Object.keys(state.dataEdit).length > 0);
    },
    saveData(state) {
        $('form.needs-validation')[0].classList.add('was-validated');
        if ($('form.needs-validation')[0].checkValidity() === true) {
            state.isLoading = true;
            axios.post(state.url, {
                create: state.dataNew,
                update: state.dataEdit
            }).then(response => {
                let res = response.data;
                if (res.status === 'success') {
                    state.message = res.msg;
                    this.commit('list/reloadData');
                }
                if (res.status === 'error') {
                    state.isLoading = false;
                    state.error = res.msg;
                }
            }).catch(error => {
                state.error = error.response.data.message;
            })
        }
    },
    // clear message & error
    clearMessage(state) {
        state.message = '';
    },
    clearError(state) {
        state.error = '';
    },
    LoadSearchPopupModal(state, data) {
        let page = typeof data['page'] !== 'undefined' ? data['page'] : 1;
        state.isNew = data['isNew'];
        state.dataIndex = data['index'];
        let f_name = data.f_name;
        state.searchPopup = state.obj['search_popup'][f_name];
        if (!data.keepFilter && state.modalTitle !== f_name) {
            state.modalTitle = f_name;
            let filter = state.searchPopup;
            if (typeof filter['search_filter'] != 'undefined') {
                let newFilter = {};
                for (let i of Object.keys(filter['search_filter'])) {
                    if (typeof filter['selected'] !== 'undefined' && typeof filter['selected'][i] !== 'undefined') {
                        newFilter[i] = filter['selected'][i];
                    } else {
                        newFilter[i] = '';
                    }
                }
                state.modalFilter = newFilter;
            }
            state.modalAutofill = state.searchPopup['search_autofill'];
        }
        state.modalRecords = [];
        let config = state.searchPopup;
        let filterJoin = typeof config['join'] !== 'undefined' ? config['join'] : [];
        let hidden_column = typeof config['hidden_column'] !== 'undefined' ? config['hidden_column'] : [];
        let field_join = typeof config['field_join'] !== 'undefined' ? config['field_join'] : [];
        state.modalFiltering = true;
        let custom_config = typeof config['custom_config'] !== 'undefined' ? config['custom_config'] : [];
        axios.post('/form-index', {
            table: config['search_table'],
            primaryKey: config['primaryKey'],
            dataSearch: state.modalFilter,
            dataQuery: config['query'],
            filterJoin: filterJoin,
            hidden_column: hidden_column,
            field_join: field_join,
            custom_config: custom_config,
            page: page
        }).then(response => {
            let res = response.data;
            let dataIndex = res['data'];
            state.modalReturn = dataIndex;
            state.modalRecords = dataIndex['data'];
            state.dataModalJoin = res['data_join']['data'];
            state.modalFiltering = false;
        });
    },
    selectModalRecord(state, key) {
        $('#search-popup-modal').modal('hide');
        for (let i in state.modalAutofill) {
            // model join
            let dataJoin = typeof state.dataModalJoin[key] !== 'undefined' ? state.dataModalJoin[key] : [];
            let dataModal = state.modalRecords[key];
            let valJoin = [];
            let multi = false;
            if (dataJoin && typeof dataJoin[i + '_Join'] !== 'undefined') {
                // for another field join
                valJoin.push(dataJoin[i + '_Join']);
            } else {
                if (typeof state.obj['field_join'][i] !== 'undefined') {
                    let field = state.obj['field_join'][i]['get_field'];
                    if (typeof field === 'object') {
                        multi = true;
                        // multi field
                        for (let j of field) {
                            if (typeof dataModal[j] !== 'undefined' && dataModal[j] !== null) {
                                valJoin.push(dataModal[j]);
                            }
                        }
                    } else {
                        // single field + [id]
                        if (typeof dataModal[field] !== 'undefined' && dataModal[field] !== null) {
                            valJoin.push(dataModal[field]);
                        }
                    }
                } else {
                    valJoin.push('[Config not found]');
                }
            }
            if (!multi && dataModal[state.modalAutofill[i]] !== null) {
                valJoin.push('[' + dataModal[state.modalAutofill[i]] + ']');
            }
            if (multi) {
                valJoin = valJoin.join(' - ');
            } else {
                valJoin = valJoin.join(' ');
            }
            // data popup
            if (state.isNew) {
                if (i in state.dataNewPopup[state.dataIndex]) {
                    state.dataNewPopup[state.dataIndex][i] = valJoin;
                }
            } else {
                if (i + '_Join' in state.dataEditPopup[state.dataIndex]) {
                    state.dataEditPopup[state.dataIndex][i + '_Join'] = valJoin;
                }
            }
            // model
            if (state.isNew) {
                state.dataNew[state.dataIndex][i] = state.modalRecords[key][state.modalAutofill[i]];
            } else {
                state.dataEdit[state.dataIndex][i] = state.modalRecords[key][state.modalAutofill[i]];
            }
        }
    },
    clearSearchPopupInput(state, data) {
        if (data['isNew']) {
            state.dataNew[data['index']][data['f_name']] = '';
            state.dataNewPopup[data['index']][data['f_name']] = '';
        } else {
            state.dataEdit[data['index']][data['f_name']] = '';
            state.dataEditPopup[data['index']][data['f_name'] + '_Join'] = '';
        }
    },
    deleteDataRecords(state, mes) {
        if (confirm(mes)) {
            state.isLoading = true;
            axios.delete(state.url + '/1', {
                params: {
                    'ids': state.dataDel
                }
            }).then(response => {
                let res = response.data;
                if (res['status'] === 'success') {
                    state.message = res['msg'];
                    this.commit('list/reloadData');
                } else {
                    state.error = res['msg'];
                }
            }).catch(error => {
                state.error = error.response.data.message;
            })
        }
    },
    dataSortRecords(state, f_name) {
        if (state.sort.includes(f_name)) {
            if (state.dSort.hasOwnProperty(f_name)) {
                state.dSort[f_name] = state.dSort[f_name] === 'asc' ? 'desc' : 'asc';
            } else {
                state.dSort = {};
                state.dSort[f_name] = 'asc';
            }
            this.commit('list/reloadData');
        }
    }
}
