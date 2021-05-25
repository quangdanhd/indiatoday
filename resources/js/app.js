require('./bootstrap');
require('./menu');

window.Vue = require('vue').default;
import store from './store/index';
import './ReportHelpers';
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated.js';

Vue.use(VueInternationalization);
const i18n = new VueInternationalization({
    locale: document.head.querySelector('meta[name="locale"]').content,
    messages: Locale
});

// login
Vue.component('report-login', require('./components/login/Login.vue').default);
// menu
Vue.component('main-menu', require('./components/menu/MenuMain.vue').default);
Vue.component('sub-menu', require('./components/menu/MenuSub.vue').default);
Vue.component('child-menu', require('./components/menu/MenuChild.vue').default);
Vue.component('child-menu-toggle', require('./components/menu/MenuChildToggle.vue').default);
// component report
Vue.component('data-table', require('./components/report_table/DataTable.vue').default);
Vue.component('data-form', require('./components/report_form/DataForm.vue').default);
Vue.component('data-form-index', require('./components/report_form/DataFormIndex.vue').default);
// pagination
Vue.component('pagination', require('laravel-vue-pagination'));
// chart home
Vue.component('chart-home', require('./components/charts/ChartHome.vue').default);

window.onload = function () {
    if (document.getElementById('app')) {
        const app = new Vue({
            el: '#app',
            i18n,
            store,
        });
    }
};
