import Vue from 'vue';

Vue.filter('reportDataShow', function (type, value, name, select) {
    let output;
    switch (type) {
        case report_config.decimal:
            output = reportCommasNumber(value);
            break;
        case report_config.date:
            output = reportDate(value);
            break;
        case report_config.datetime:
            output = reportDateTime(value);
            break;
        case report_config.boolean:
            output = reportBoolean(value);
            break;
        case report_config.select:
            output = reportSelect(value, name, select);
            break;
        default:
            output = value;
            let len = 50;
            if (!!value && value.length > len) {
                output = value.substring(0, len) + '...';
            }
    }
    return output;
});
Vue.filter('reportDateTimeConverter', function (value) {
    if (value) {
        let datetime = new Date(value);
        datetime.setMinutes(datetime.getMinutes() - datetime.getTimezoneOffset());
        datetime = datetime.toISOString().slice(0, 16);
        return datetime;
    }
});
Vue.filter('reportTimeConverter', function (value) {
    if (value) {
        return value.replace(new RegExp('\.0+$', 'gm'), '');
    }
});

function reportCommasNumber(value) {
    if (value && /^[\d.]+$/.test(value)) {
        value = parseFloat(value).toString();
        let arr = value.split('.');
        let num = arr[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1 ');
        if (typeof (arr[1]) != 'undefined') {
            num += ('.' + arr[1]);
        }
        return '<div class="text-right">' + num + '</div>';
    } else {
        return '';
    }
}

function reportDate(value) {
    if (value) {
        let date = value.split('-');
        if (date.length === 3) {
            return date[2] + '-' + date[1] + '-' + date[0];
        } else {
            return '';
        }
    } else {
        return '';
    }
}

function reportDateTime(value) {
    if (value) {
        let date = new Date(value);
        let d_date = [
            ('0' + date.getDate()).slice(-2),
            ('0' + (date.getMonth() + 1)).slice(-2),
            date.getFullYear()
        ].join('-');
        let d_time = [
            ('0' + date.getHours()).slice(-2),
            ('0' + date.getMinutes()).slice(-2),
            // ('0' + date.getSeconds()).slice(-2)
        ].join(':');
        return d_date + ' ' + d_time;
    } else {
        return '';
    }
}

function reportBoolean(value) {
    if (value === 1 || value === true || value === '1') {
        return '<div class="text-center"><i class="fas fa-check"></i></div>';
    } else {
        return '';
    }
}

function reportSelect(value, name, select) {
    if (typeof (select[name]) !== 'undefined' && typeof (select[name][value]) !== 'undefined') {
        return select[name][value];
    } else {
        return value;
    }
}

Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function (event) {
            // here I check that click was outside the el and his children
            if (!(el === event.target || el.contains(event.target))) {
                // and if it did, call method provided in attribute value
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
    },
});
