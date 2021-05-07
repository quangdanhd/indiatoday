window.Vue = require('vue').default;
import mutations from './mutations'
import VueInternationalization from 'vue-i18n';
import Locale from '../../vue-i18n-locales.generated.js';

Vue.use(VueInternationalization);
const i18n = new VueInternationalization({
    locale: document.head.querySelector('meta[name="locale"]').content,
    messages: Locale
});
export default {
    namespaced: true,
    state: {
        i18n: i18n,
        alert: '',
        message: '',
        error: '',
        formSubmit: false,
        config: {},
        objData: {},
        record: {}, // for edit
        dataModel: {}, // data in form
        dataView: [], // data for field view
        dataImage: {}, // data for field image
        dataMultiImage: {}, // data for field multi image add new
        dataMultiImageDB: {}, // data for field multi image from database
        dataMultiImageUpdate: {}, // ids data images update (active or destroy)
        isEdited: false, // just use for kpi-config
        changeRecord: [], // previous, next, first & last
        // search popup - primaryKey
        primaryData: {}, // primary Config
        primaryJoinData: {},
        primaryKeyTitle: '',
        primaryKeyFilter: {},
        primaryDataReturn: {}, // for pagination
        primaryKeySearch: [], // records
        primaryKeyFiltering: false,
        // search popup - field
        dataModelPopup: {}, // v-model for field join
        modalData: {}, // config field of search_popup
        modeJoinData: {},
        modalTitle: '',
        modalFilter: {},
        modalReturn: {}, // for pagination
        modalSearch: [], // records
        modalFiltering: false,
        modalAutofill: [],
        // table join
        joinData: {}, // config (of field join)
        joinJoinData: {}, // for field_join
        joinIsNew: true,
        joinTab: 0, // active tab (multiple join)
        joinConfig: {}, // config (of field join search_filter)
        addData: [], // v-model add
        joinRefresh: true,
        joinIndex: '', // index (of tab join)
        joinIndex_2: '', // index (of row record in tab)
        // search popup - table join
        joinTitle: '',
        joinFilter: {},
        joinReturn: {}, // for pagination
        joinSearch: [], // records
        joinFiltering: false,
        joinAutofill: [],
        // table data update
        joinIsEdited: {},
        joinDataEdit: {}, // v-model edit (join table)
        // table join - field join
        joinAddJoin: [], // v-model for add (field join - table join)
        joinEditJoin: {}, // v-model for edit (field join - table join)
        // import (table join)
        canImport: [],
        importForm: false,
        importSubmit: false,
        importFile: [],
        canExport: [],
        // import (action header)
        importFileHeader: null,
        // dependence (ẩn hiện trường theo 1 trường)
        dependenceConfig: {},
        // tabDependence (ẩn hiện tab theo 1 trường)
        tabDependenceConfig: {},
        // data field search in table join
        dataJoinSearch: {},
        // data sort column in table join
        dataSortTableJoin: [],
    },
    mutations,
    i18n,
}
