import mutations from './mutations'

export default {
    namespaced: true,
    state: {
        config: '',
        message: '',
        error: '',
        url: '',
        obj: {},
        // data
        tableName: '',
        primaryKey: '',
        thead: [],
        fieldName: [],
        fieldType: {},
        fieldJoin: [], // config show join field with another field
        data: {},
        dataJoin: {}, // Show join field with another field
        tbody: [],
        required: [],
        select: [],
        hiddenInput: [], // field can view, can't add, can't edit
        search: [],
        sort: [],
        // action & class
        tableWidth: false, // true: width 100%
        noWrap: true,
        isLoading: false,
        saveDisabled: true,
        delDisabled: true,
        isChecked: false,
        tdFixedAction: false,
        // create, edit, delete
        isNew: true,
        dataIndex: '', // index of row is searching in popup
        dataNew: [],
        dataNewPopup: [], // v-model for field join
        isEdited: {},
        dataEdit: {},
        dataEditPopup: {}, // v-model for field join
        dataDel: [],
        // search & sort
        dataSearch: {},
        dSort: {},
        // add & update & destroy
        canAdd: false,
        canUpdate: {},
        canDel: {},
        currentPage: 1,
        perPage: 1,
        // search popup - field
        searchPopup: [], // config field search popup config
        dataModalJoin: {}, // show with field join in popup
        modalTitle: '',
        modalFilter: {},
        modalFiltering: false,
        modalReturn: {}, // for pagination
        modalRecords: [], // records
        modalAutofill: [],
    },
    mutations,
}
