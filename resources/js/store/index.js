import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import menu from './menu/store';
import form from './report_form/store';
import list from './report_table/store';

export default new Vuex.Store({
    modules: {
        menu: menu,
        form: form,
        list: list,
    }
});
