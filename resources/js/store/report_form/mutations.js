export default {
    // init
    initData(state, obj) {
        state.config = obj['config'];
        let data = obj['data'];
        // objData
        state.objData = data;
        // alert
        state.alert = '';
        if (typeof data['alert'] !== 'undefined') {
            state.alert = data['alert'];
        }
        state.dataView = data['field_view'];
        state.changeRecord = typeof data['change_record'] !== 'undefined' ? data['change_record'] : [];
        // dataModel
        let dataField = Object.keys(data['field']);
        let dataModel = {};
        let dataModelPopup = {};
        // record (edit)
        if (typeof data['record'] !== 'undefined') {
            state.isEdited = false;
            state.record = data['record'];
            dataModel[data['primaryKey']] = data['record'][data['primaryKey']];
        } else {
            state.isEdited = true;
            state.record = {};
        }
        // set dataModel by dataField
        for (let i of dataField) {
            if (data['field'][i] !== state.config['multiple_image']) {
                // v-model field search popup
                if ([state.config['search_popup'], state.config['view_search_popup']].includes(data['field'][i])) {
                    if (typeof data['data_join'] !== 'undefined') {
                        let valJoinName = '';
                        let valJoinID = '';
                        if (typeof data['data_join'][i + '_Join'] !== 'undefined') {
                            valJoinName = data['data_join'][i + '_Join'];
                        }
                        if (typeof data['data_join'][i + '_ID'] !== 'undefined') {
                            valJoinID = '[' + data['data_join'][i + '_ID'] + ']';
                        }
                        if (typeof data['record'] !== 'undefined') {
                            if (typeof data['record'][i] !== 'undefined' && data['record'][i] !== null) {
                                valJoinID += '[' + data['record'][i] + ']';
                            }
                        }
                        if (valJoinName || valJoinID) {
                            valJoinName = valJoinName == null ? '' : valJoinName + ' ';
                            dataModelPopup[i] = valJoinName + valJoinID;
                        } else {
                            dataModelPopup[i] = '';
                        }
                    } else {
                        dataModelPopup[i] = '';
                    }
                }
                if (typeof data['record'] !== 'undefined') {
                    dataModel[i] = data['record'][i];
                } else {
                    dataModel[i] = '';
                }
                // v-model field boolean
                if ([state.config['boolean'], state.config['view_boolean']].includes(data['field'][i])) {
                    if (typeof data['record'] !== 'undefined') {
                        dataModel[i] = data['record'][i] === 1 || data['record'][i] === '1';
                    } else {
                        dataModel[i] = false;
                    }
                }
                // v-model field password
                if (data['field'][i] === state.config['password']) {
                    dataModel[i] = '';
                }
                // v-model field date
                if (data['field'][i] === state.config['date']) {
                    if (dataModel[i]) {
                        dataModel[i] = dataModel[i].match(/^\d{4}-\d{2}-\d{2}/g)[0];
                    }
                }
                // v-model field time
                if (data['field'][i] === state.config['time']) {
                    dataModel[i] = dataModel[i].replace(new RegExp('\.0+$', 'gm'), '');
                }
                // v-model field month
                if (data['field'][i] === state.config['month']) {
                    if (dataModel[i]) {
                        dataModel[i] = dataModel[i].match(/^\d{4}-\d{2}/g)[0];
                    }
                }
                // v-model if has default value
                if (typeof data['record'] === 'undefined' && i in data['default_value']) {
                    dataModel[i] = data['default_value'][i];
                }
            }
        }
        state.dataModel = dataModel;
        state.dataModelPopup = dataModelPopup;
        // joinConfig
        state.joinConfig = data['table_join'];
        let isEdited = {};
        for (let i in data['table_join']) {
            // addData
            state.addData[i] = [];
            state.joinAddJoin[i] = [];
            // dataEdit
            state.joinDataEdit[i] = {};
            state.joinEditJoin[i] = {};
            // isEdited
            if (typeof data['table_join'][i]['recordReturn'] !== 'undefined') {
                if (typeof data['table_join'][i]['recordReturn']['data'] !== 'undefined') {
                    state.joinConfig[i]['record'] = data['table_join'][i]['recordReturn']['data'];
                    if (typeof data['table_join'][i]['recordJoinReturn']['data'] !== 'undefined') {
                        state.joinConfig[i]['record_join'] = data['table_join'][i]['recordJoinReturn']['data'];
                    }
                    let edited = {};
                    for (let j of state.joinConfig[i]['record']) {
                        edited[j[data['table_join'][i]['primaryKey']]] = false;
                    }
                    isEdited[i] = edited;
                }
            }
            // import
            state.importFile[i] = '';
            if (typeof data['table_join'][i]['import'] !== 'undefined') {
                state.canImport[i] = data['table_join'][i]['import'];
            } else {
                state.canImport[i] = false;
            }
            // Export
            if (typeof data['table_join'][i]['export'] !== 'undefined') {
                state.canExport[i] = data['table_join'][i]['export'];
            } else {
                state.canExport[i] = false;
            }
            // data field search in table join
            state.dataJoinSearch[i] = {};
            state.dataJoinSearch[i][data['table_join'][i]['join_field']] = state.dataModel[state.objData['primaryKey']];
            if (typeof data['table_join'][i]['search_filter'] !== 'undefined') {
                // this.dataFilter = this.obj['index_filter'];
                for (let j in data['table_join'][i]['search_filter']) {
                    if (typeof data['table_join'][i]['selected'] !== 'undefined' && typeof data['table_join'][i]['selected'][j] !== 'undefined') {
                        state.dataJoinSearch[i][j] = data['table_join'][i]['selected'][j];
                    } else {
                        state.dataJoinSearch[i][j] = '';
                    }
                }
            }
        }
        state.joinIsEdited = isEdited;
        // dependence (ẩn hiện trường theo 1 trường)
        if (typeof data['dependence'] !== 'undefined') {
            state.dependenceConfig = data['dependence'];
        }
        // dependence (ẩn hiện tab theo 1 trường)
        if (typeof data['tab_dependence'] !== 'undefined') {
            state.tabDependenceConfig = data['tab_dependence'];
        }
        // data for field multi image from database
        if (typeof data['dataMultiImageDB'] !== 'undefined') {
            state.dataMultiImageDB = data['dataMultiImageDB'];
        }
    },
    // load data modal field
    loadModalSearch(state, data) {
        let page = typeof data['page'] !== 'undefined' ? data['page'] : 1;
        let f_name = data.f_name;
        state.modalData = state.objData['search_popup'][f_name];
        state.modalFiltering = true;
        if (!data.keepFilter) {
            state.modalTitle = f_name;
            let filter = state.objData['search_popup'][f_name];
            if (typeof filter['search_filter'] != 'undefined') {
                let newFilter = {};
                for (let i of Object.keys(filter['search_filter'])) {
                    if (typeof filter['default_search'] !== 'undefined' && typeof filter['default_search'][i] !== 'undefined') {
                        newFilter[i] = filter['default_search'][i];
                    } else {
                        newFilter[i] = '';
                    }
                }
                state.modalFilter = newFilter;
            }
            state.modalAutofill = state.objData['search_popup'][f_name]['search_autofill'];
        }
        state.modalSearch = [];
        let custom_config = typeof state.modalData['custom_config'] !== 'undefined' ? state.modalData['custom_config'] : [];
        axios.post('/form-index', {
            table: state.modalData['search_table'],
            primaryKey: state.modalData['primaryKey'],
            dataSearch: state.modalFilter,
            dataQuery: state.modalData['query'],
            filterJoin: typeof state.modalData['join'] !== 'undefined' ? state.modalData['join'] : [],
            hidden_column: typeof state.modalData['hidden_column'] !== 'undefined' ? state.modalData['hidden_column'] : [],
            field_join: typeof state.modalData['field_join'] !== 'undefined' ? state.modalData['field_join'] : [],
            custom_config: custom_config,
            page: page
        }).then(response => {
            let res = response.data;
            let dataIndex = res['data'];
            state.modalReturn = dataIndex;
            state.modalSearch = dataIndex['data'];
            if (typeof res['data_join']['data'] !== 'undefined') {
                state.modeJoinData = res['data_join']['data'];
            }
            state.modalFiltering = false;
        });
    },
    // select data row in modal
    selectModalSearch(state, key) {
        $('#search-popup-modal').modal('hide');
        let dataJoin = typeof state.modeJoinData[key] !== 'undefined' ? state.modeJoinData[key] : [];
        let dataModal = state.modalSearch[key];
        for (let i in state.modalAutofill) {
            // model join
            if (i in state.dataModelPopup) {
                let valJoin = '';
                if (dataJoin && typeof dataJoin[i + '_Join'] !== 'undefined') {
                    valJoin = dataJoin[i + '_Join'];
                } else {
                    if (typeof state.objData['field_join'][i] !== 'undefined') {
                        let field = state.objData['field_join'][i]['field'];
                        if (dataModal[field] !== null) {
                            valJoin = dataModal[field];
                        }
                    } else {
                        valJoin = '[Config not found]';
                    }
                }
                if (dataModal[state.modalAutofill[i]] !== null) {
                    valJoin += ' [' + dataModal[state.modalAutofill[i]] + ']';
                }
                state.dataModelPopup[i] = valJoin;
            }
            // model
            state.dataModel[i] = state.modalSearch[key][state.modalAutofill[i]];
            // map filter
            if (state.modalTitle === i) {
                if (typeof state.modalData['map_filter'] !== 'undefined') {
                    for (let j in state.modalData['map_filter']) {
                        let filter_field = state.modalData['map_filter'][j];
                        state.objData['search_popup'][j]['default_search'][filter_field] = state.dataModel[i];
                    }
                }
            }
        }
    },
    // tab active - (join table - multiple join)
    setJoinTab(state, key) {
        if (state.joinTab !== key) {
            state.joinTab = key;
            state.importForm = false;
        }
    },
    // add row data new (join table)
    setAddData(state, key) {
        let table = state.joinConfig[key];
        let field = table['field_name'].filter(x => !table['hide_field'].includes(x));
        let field_new = {};
        for (let i of field) {
            if (table['field_type'][i] === state.config['boolean']) {
                field_new[i] = false;
            } else {
                field_new[i] = '';
            }
            // v-model if has default value
            if (i in table['default_value']) {
                field_new[i] = table['default_value'][i];
            }
        }
        // field = field.reduce((a, b) => (a[b] = '', a), {});
        state.addData[key].push(field_new);
        // join
        let join = state.joinConfig[key]['join'];
        let field_join = Object.keys(join);
        let field_join_new = {};
        for (let i of field_join) {
            field_join_new[i] = '';
        }
        state.joinAddJoin[key].push(field_join_new);
    },
    // remove row data new (join table)
    removeAddData(state, data) {
        state.addData[data['key']].splice(data['index'], 1);
        state.joinAddJoin[data['key']].splice(data['index'], 1);
    },
    // load data modal (join table)
    joinLoadModalSearch(state, data) {
        let page = typeof data['page'] !== 'undefined' ? data['page'] : 1;
        state.joinIsNew = data.isNew;
        state.joinFiltering = true;
        let f_name = data.f_name;
        state.joinIndex = data.key_1;
        state.joinIndex_2 = data.key_2;
        state.joinData = state.objData['table_join'][data.key_1]['search_popup'][f_name];
        if (!data.keepFilter) {
            state.joinTitle = f_name;
            let filter = state.joinConfig[data.key_1]['search_popup'][f_name];
            if (typeof filter['search_filter'] != 'undefined') {
                let newFilter = {};
                for (let i of Object.keys(filter['search_filter'])) {
                    if (typeof filter['default_search'] !== 'undefined' && typeof filter['default_search'][i] !== 'undefined') {
                        newFilter[i] = filter['default_search'][i];
                    } else {
                        newFilter[i] = '';
                    }
                }
                state.joinFilter = newFilter;
            }
            state.joinAutofill = state.joinConfig[data.key_1]['search_popup'][f_name]['search_autofill'];
        }
        state.joinSearch = [];
        let custom_config = typeof state.joinData['custom_config'] !== 'undefined' ? state.joinData['custom_config'] : [];
        axios.post('/form-index', {
            table: state.joinData['search_table'],
            primaryKey: state.joinData['primaryKey'],
            dataSearch: state.joinFilter,
            dataQuery: state.joinData['query'],
            filterJoin: typeof state.joinData['join'] !== 'undefined' ? state.joinData['join'] : [],
            hidden_column: typeof state.joinData['hidden_column'] !== 'undefined' ? state.joinData['hidden_column'] : [],
            field_join: typeof state.joinData['field_join'] !== 'undefined' ? state.joinData['field_join'] : [],
            custom_config: custom_config,
            page: page
        }).then(response => {
            let res = response.data;
            let dataIndex = res['data'];
            state.joinReturn = dataIndex;
            state.joinSearch = dataIndex['data'];
            if (typeof res['data_join']['data'] !== 'undefined') {
                state.joinJoinData = res['data_join']['data'];
            } else {
                state.joinJoinData = [];
            }
            state.joinFiltering = false;
        });
    },
    // select data row in modal (join table)
    joinSelectModalSearch(state, key) {
        $('#join-search-popup-modal').modal('hide');
        let dataJoin = typeof state.joinJoinData[key] !== 'undefined' ? state.joinJoinData[key] : [];
        for (let i in state.joinAutofill) {
            let value = state.joinSearch[key][state.joinAutofill[i]];
            let valJoin = '';
            if (Object.keys(state.joinConfig[state.joinIndex]['join']).includes(i)) {
                if (dataJoin && typeof dataJoin[state.joinAutofill[i] + '_Join'] !== 'undefined') {
                    if (dataJoin[state.joinAutofill[i] + '_Join']) {
                        valJoin = dataJoin[state.joinAutofill[i] + '_Join'];
                    }
                    if (state.joinIsNew) {
                        valJoin = valJoin + ' [' + value + ']';
                    }
                } else {
                    let f_name = state.joinConfig[state.joinIndex]['join'][i]['field'];
                    valJoin = '[Field not found]';
                    if (typeof state.joinSearch[key][f_name] !== 'undefined') {
                        if (state.joinSearch[key][f_name]) {
                            valJoin = state.joinSearch[key][f_name];
                        }
                        if (state.joinIsNew) {
                            valJoin = valJoin + ' [' + value + ']';
                        }
                    }
                }
            }
            if (state.joinIsNew) {
                state.addData[state.joinIndex][state.joinIndex_2][i] = value;
                // join
                if (Object.keys(state.joinConfig[state.joinIndex]['join']).includes(i)) {
                    state.joinAddJoin[state.joinIndex][state.joinIndex_2][i] = valJoin;
                }
            } else {
                state.joinDataEdit[state.joinIndex][state.joinIndex_2][i] = value;
                // join
                if (Object.keys(state.joinConfig[state.joinIndex]['join']).includes(i)) {
                    state.joinEditJoin[state.joinIndex][state.joinIndex_2][i + '_Join'] = valJoin;
                }
            }
        }
        this.commit('form/refreshTableJoin');
    },
    refreshTableJoin(state) {
        state.joinRefresh = false;
        setTimeout(function () {
            state.joinRefresh = true;
        }, 10);
    },
    // submit form
    formSubmitData(state) {
        if ($('form.needs-validation')[0].checkValidity() === true) {
            state.formSubmit = true;
            state.message = '';
            state.error = '';
            if (typeof state.objData['record'] === 'undefined') {
                // create new
                axios.post(state.objData['url'], {
                    formData: state.dataModel,
                    joinNewData: state.addData,
                    joinUpdateData: state.joinDataEdit,
                    dataImage: state.dataImage,
                    dataMultiImage: state.dataMultiImage,
                }).then(response => {
                    this.commit('form/formSubmitDataThen', response.data);
                    if (response.data['status'] === 'success') {
                        state.formSubmit = true;
                        let path = '/' + state.objData['url'].split('/')[1] + '/' + response.data['id'];
                        axios.get(path, {}).then(response => {
                            state.formSubmit = false;
                            this.commit('form/initData', {data: response.data, config: state.config});
                        });
                    }
                }).catch(error => {
                    this.commit('form/formSubmitDataCatch', error.response.data.message);
                })
            } else {
                // update
                axios.patch(state.objData['url'], {
                    formData: state.dataModel,
                    joinNewData: state.addData,
                    joinUpdateData: state.joinDataEdit,
                    dataImage: state.dataImage,
                    dataMultiImage: state.dataMultiImage,
                    dataMultiImageUpdate: state.dataMultiImageUpdate,
                }).then(response => {
                    this.commit('form/formSubmitDataThen', response.data);
                }).catch(error => {
                    this.commit('form/formSubmitDataCatch', error.response.data.message);
                })
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: state.i18n.t('message.oops'),
                text: state.i18n.t('message.submit_valid_error'),
            });
        }
    },
    formSubmitDataThen(state, res) {
        if (res['status'] === 'success') {
            if (res['redirect']) {
                if (typeof state.objData['back_link'] !== 'undefined' && typeof state.objData['back_link']['link'] !== 'undefined') {
                    window.location.href = state.objData['back_link']['link'];
                } else {
                    window.location.href = '/' + res['url'];
                }
            } else {
                state.message = res['message'];
                let path = '/' + state.objData['url'].split('/')[1] + '/' + res['id'];
                axios.get(path, {}).then(response => {
                    state.formSubmit = false;
                    this.commit('form/initData', {data: response.data, config: state.config});
                });
            }
        } else {
            state.error = res['message'];
            state.formSubmit = false;
        }
        $('form.needs-validation').removeClass('was-validated');
    },
    formSubmitDataCatch(state, error) {
        state.error = error;
        state.formSubmit = false;
        $('form.needs-validation').removeClass('was-validated');
    },
    // change edit status of row (table join)
    changeJoinIsEdited(state, data) {
        let thisEdited = state.joinIsEdited[data['key']];
        let editData = state.joinDataEdit[data['key']];
        let editDataJoin = state.joinEditJoin[data['key']];
        thisEdited[data['id']] = !thisEdited[data['id']];
        if (typeof editData[data['id']] === 'undefined') {
            editData[data['id']] = state.joinConfig[data['key']]['record'][data['key_2']];
            if (typeof state.joinConfig[data['key']]['record_join'] !== 'undefined') {
                editDataJoin[data['id']] = state.joinConfig[data['key']]['record_join'][data['key_2']];
            } else {
                editDataJoin[data['id']] = {};
            }
        } else {
            delete editData[data['id']];
            delete editDataJoin[data['id']];
        }
    },
    // load data modal (primary key)
    primaryLoadModalSearch(state, data) {
        let page = typeof data['page'] !== 'undefined' ? data['page'] : 1;
        let f_name = data.f_name;
        state.primaryData = state.objData['primarySearch'][f_name];
        if (!state.primaryKeyTitle) {
            let filter = state.objData['primarySearch'][f_name];
            if (typeof filter['search_filter'] != 'undefined') {
                let newFilter = {};
                for (let i of Object.keys(filter['search_filter'])) {
                    if (typeof filter['default_search'] !== 'undefined' && typeof filter['default_search'][i] !== 'undefined') {
                        newFilter[i] = filter['default_search'][i];
                    } else {
                        newFilter[i] = '';
                    }
                }
                state.primaryKeyFilter = newFilter;
            }
        }
        if (data.filter || !state.primaryKeyTitle) {
            state.primaryKeyTitle = f_name;
            state.primaryKeyFiltering = true;
            state.primaryKeySearch = [];
            axios.post('/form-index', {
                table: state.objData['table_name'],
                primaryKey: state.objData['primaryKey'],
                dataSearch: state.primaryKeyFilter,
                dataQuery: state.primaryData['query'],
                filterJoin: typeof state.primaryData['join'] !== 'undefined' ? state.primaryData['join'] : [],
                hidden_column: typeof state.primaryData['hidden_column'] !== 'undefined' ? state.primaryData['hidden_column'] : [],
                field_join: typeof state.primaryData['field_join'] !== 'undefined' ? state.primaryData['field_join'] : [],
                page: page
            }).then(response => {
                let res = response.data;
                let dataIndex = res['data'];
                state.primaryDataReturn = dataIndex;
                state.primaryKeySearch = dataIndex['data'];
                state.primaryJoinData = res['data_join']['data'];
                state.primaryKeyFiltering = false;
            });
        }
    },
    // select data row in modal (join table)
    primarySelectModalSearch(state, key) {
        if (!state.primaryKeyFiltering) {
            state.message = '';
            state.error = '';
            state.primaryKeyFiltering = true;
            let path = '/' + state.objData['url'].split('/')[1] + '/' + state.primaryKeySearch[key][state.objData['primaryKey']];
            axios.get(path, {}).then(response => {
                this.commit('form/initData', {data: response.data, config: state.config});
                $('#primary-search-modal').modal('hide');
                state.primaryKeyFiltering = false;
            });
        }
    },
    // clear message & error
    clearMessage(state) {
        state.message = '';
    },
    clearError(state) {
        state.error = '';
    },
    // create new record
    createNewRecord(state) {
        if (!state.formSubmit) {
            state.isEdited = true;
            let path = '/' + state.objData['url'].split('/')[1];
            state.formSubmit = true;
            axios.get(path, {}).then(response => {
                this.commit('form/initData', {data: response.data, config: state.config});
                state.formSubmit = false;
            });
        }
    },
    // update datetime-local value
    updateDateTimeLocalValue(state, data) {
        state.dataModel[data['name']] = data['value'].replace('T', ' ')
    },
    updateDateTimeLocalJoinAddData(state, data) {
        if (data['isNew']) {
            state.addData[data['key_1']][data['key_2']][data['f_name']] = data['value'].replace('T', ' ')
        } else {
            state.joinDataEdit[data['key_1']][data['key_2']][data['f_name']] = data['value'].replace('T', ' ')
        }
    },
    // allow edit form or not (if use)
    changeIsEdited(state, key) {
        state.isEdited = key;
    },
    toggleJoinFormImport(state, key) {
        state.importForm = !state.importForm;
    },
    onJoinFileChange(state, data) {
        state.importFile[data['key']] = data['e'].target.files[0];
    },
    submitJoinImport(state, key) {
        state.message = '';
        state.error = '';
        if (!state.importSubmit && state.importFile[key]) {
            state.importSubmit = true;
            state.formSubmit = true;
            let formData = new FormData();
            formData.append('table', state.joinConfig[key]['table']);
            formData.append('file', state.importFile[key]);
            formData.append('join_field', state.joinConfig[key]['join_field']);
            formData.append('join_field_data', state.dataModel[state.objData['primaryKey']]);
            axios.post('/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(response => {
                let res = response.data;
                if (res['status'] === 'success') {
                    state.message = res['message'];
                    if (Object.keys(state.record)) {
                        let path = '/' + state.objData['url'].split('/')[1] + '/' + state.record[state.objData['primaryKey']];
                        axios.get(path, {}).then(response => {
                            this.commit('form/initData', {data: response.data, config: state.config});
                            state.importSubmit = false;
                            state.importForm = false;
                            state.formSubmit = false;
                        });
                    } else {
                        state.importSubmit = false;
                        state.importForm = false;
                        state.formSubmit = false;
                    }
                } else {
                    state.error = res['message'];
                    state.importSubmit = false;
                    state.formSubmit = false;
                }
            }).catch(error => {
                state.error = error.response.data.message;
                state.importSubmit = false;
                state.formSubmit = false;
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: state.i18n.t('message.oops'),
                text: state.i18n.t('message.import_blank'),
            });
        }
    },
    changeRecordById(state, id) {
        state.formSubmit = true;
        let path = '/' + state.objData['url'].split('/')[1] + '/' + id;
        axios.get(path, {}).then(response => {
            this.commit('form/initData', {data: response.data, config: state.config});
            state.formSubmit = false;
        });
    },
    onFileChangeImportHeader(state, event) {
        state.importFileHeader = event.target.files[0];
    },
    submitImportHeader(state, table) {
        state.message = '';
        state.error = '';
        if (!state.formSubmit && state.importFileHeader) {
            state.formSubmit = true;
            let formData = new FormData();
            formData.append('table', table);
            formData.append('file', state.importFileHeader);
            axios.post('/import', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(response => {
                let res = response.data;
                if (res['status'] === 'success') {
                    state.message = res['message'];
                    state.formSubmit = false;
                } else {
                    state.error = res['message'];
                    state.formSubmit = false;
                }
            }).catch(error => {
                state.error = error.response.data.message;
                state.formSubmit = false;
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: state.i18n.t('message.oops'),
                text: state.i18n.t('message.import_blank'),
            });
        }
    },
    clearSearchPopupInput(state, f_name) {
        state.dataModel[f_name] = '';
        state.dataModelPopup[f_name] = '';
    },
    commitFormSubmit(state, value) {
        state.formSubmit = value;
    },
    commitDataModelPopup(state, data) {
        state.dataModelPopup[data['key']] = data['value'];
    },
    clearSearchPopupInputTableJoin(state, data) {
        if (data['isNew']) {
            state.addData[data['key_1']][data['key_2']][data['f_name']] = '';
            state.joinAddJoin[data['key_1']][data['key_2']][data['f_name']] = '';
        } else {
            state.joinDataEdit[data['key_1']][data['key_2']][data['f_name']] = '';
            state.joinEditJoin[data['key_1']][data['key_2']][data['f_name'] + '_Join'] = '';
        }
        // clear field auto fill when field search popup cleared
        for (let i in state.joinConfig[data['key_1']]['search_popup'][data['f_name']]['search_autofill']) {
            if (i !== data['f_name']) {
                if (data['isNew'] && i in state.addData[data['key_1']][data['key_2']]) {
                    state.addData[data['key_1']][data['key_2']][i] = '';
                }
                if (!data['isNew'] && i in state.joinDataEdit[data['key_1']][data['key_2']]) {
                    state.joinDataEdit[data['key_1']][data['key_2']][i] = '';
                }
            }
        }
        this.commit('form/refreshTableJoin');
    },
    onFieldImageChange(state, data) {
        let file = data['e'].target.files[0];
        if (data['check_size']) {
            this.commit('form/createImage', {f_name: data['f_name'], file: file});
        } else {
            if (data['f_name'] in state.dataImage) {
                delete state.dataImage[data['f_name']];
            }
        }
    },
    createImage(state, data) {
        let file = data['file'];
        let reader = new FileReader();
        reader.onload = (e) => {
            state.dataImage[data['f_name']] = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    removeFieldImage(state, f_name) {
        state.dataModel[f_name] = '';
        if (f_name in state.dataImage) {
            delete state.dataImage[f_name];
        }
    },
    // Pagination & Filter table join
    tableJoinPagination(state, page) {
        state.formSubmit = true;
        let TabConfig = state.joinConfig[state.joinTab];
        let sort = state.dataSortTableJoin.length ? state.dataSortTableJoin[state.joinTab] : {};
        axios.post('/form-index', {
            table: TabConfig['table'],
            primaryKey: TabConfig['primaryKey'],
            dataSearch: state.dataJoinSearch[state.joinTab],
            dataQuery: TabConfig['query'],
            filterJoin: [],
            hidden_column: TabConfig['hide_field'],
            field_join: TabConfig['join'],
            dataSort: sort,
            page: page
        }).then(response => {
            let res = response.data;
            state.joinConfig[state.joinTab]['recordReturn'] = res['data'];
            state.joinConfig[state.joinTab]['record'] = res['data']['data'];
            state.joinConfig[state.joinTab]['recordJoinReturn'] = res['data_join'];
            state.joinConfig[state.joinTab]['record_join'] = res['data_join']['data'];
            state.formSubmit = false;
        }).catch(error => {
            state.error = error.response.data.message;
            state.formSubmit = false;
        });
        // this.commit('form/refreshTableJoin');
    },
    // sort column in table join
    sortColumnTableJoin(state, data) {
        let key = data['tab_index'];
        let f_name = data['f_name'];
        if (!state.dataSortTableJoin.length) {
            for (let i in state.joinConfig) {
                state.dataSortTableJoin[i] = {};
            }
        }
        if (f_name in state.dataSortTableJoin[key]) {
            state.dataSortTableJoin[key][f_name] = state.dataSortTableJoin[key][f_name] === 'asc' ? 'desc' : 'asc';
        } else {
            state.dataSortTableJoin[key] = {};
            state.dataSortTableJoin[key][f_name] = 'asc';
        }
        this.commit('form/tableJoinPagination', 1);
        // this.commit('form/refreshTableJoin');
    },
    formSubmitChange(state, data) {
        state.formSubmit = data;
    },
    exportData(state, data) {
        let export_name = data['export_name'];
        let parent_id = typeof data['parent_id'] !== 'undefined' ? data['parent_id'] : '';
        let result = confirm('Xác nhận xuất dữ liệu ra file excel?');
        if (result) {
            let url = '/export?table=' + export_name;
            if (parent_id) {
                url += '&parent_id=' + parent_id;
            }
            let win = window.open(url, '_blank');
            win.focus();
        }
    },
    onFieldMultiImageChange(state, data) {
        let file = data['e'].target.files[0];
        if (data['check_size']) {
            this.commit('form/createMultiImage', {f_name: data['f_name'], file: file});
        } else {
            // if (data['f_name'] in state.dataImage) {
            //     delete state.dataImage[data['f_name']];
            // }
        }
    },
    createMultiImage(state, data) {
        let file = data['file'];
        let reader = new FileReader();
        reader.onload = (e) => {
            let arr = [];
            if (data['f_name'] in state.dataMultiImage) {
                arr = state.dataMultiImage[data['f_name']];
            }
            arr.push(e.target.result);
            state.dataMultiImage[data['f_name']] = arr;
        };
        reader.readAsDataURL(file);
    },
    removeMultiImage(state, data) {
        if (data['f_name'] in state.dataMultiImage) {
            state.dataMultiImage[data['f_name']].splice(data['key'], 1);
        }
    },
    removeMultiImageDB(state, data) {
        let arr = [];
        if (data['f_name'] in state.dataMultiImageUpdate) {
            arr = state.dataMultiImageUpdate[data['f_name']];
        }
        if (arr.includes(data['key'])) {
            arr = arr.filter(x => x !== data['key']);
        } else {
            arr.push(data['key']);
        }
        state.dataMultiImageUpdate[data['f_name']] = arr;
    }
}
