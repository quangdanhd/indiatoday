<template>
    <div class="container-fluid pt-2 pb-2">
        <div class="row">
            <div class="col-md-12 col-lg-6">
                <div>
                    <b>Tổng truy cập: {{accessTotal}}</b>
                </div>
                <span v-if="!chartData.length">Không có dữ liệu <i>(lượt truy cập 30 ngày gần đây)</i>!</span>
                <GChart v-else :type="chartType" :data="chartData" :options="chartOptions"/>
            </div>
            <div class="col-md-12 col-lg-6">
                <!--<GChart :type="chartType_2" :data="chartData_2" :options="chartOptions_2"/>-->
            </div>
            <div class="col-md-12 col-lg-6">
                <!--<GChart :type="chartType_3" :data="chartData_3" :options="chartOptions_3"/>-->
            </div>
            <div class="col-md-12 col-lg-6">
                <!--<GChart :type="chartType_4" :data="chartData_4" :options="chartOptions_4"/>-->
            </div>
        </div>
    </div>
</template>
<script>
    import {GChart} from 'vue-google-charts'

    export default {
        components: {
            GChart
        },
        props: [
            'obj'
        ],
        data() {
            return {
                error: '',
                accessTotal: 0,
                Interval: '',
                chartType: '',
                chartData: [],
                chartOptions: {},
            }
        },
        created() {
            this.accessTotal = this.obj['access_total'];
            let chart_1 = this.obj['chart_1'];
            this.chartType = chart_1['type'];
            this.chartOptions = chart_1['options'];
            this.chartData = chart_1['data'];
        },
        mounted: function () {
            // if (this.obj['autoRefresh']) {
            //     if (this.obj['refreshTime'] < 1000) {
            //         this.obj['refreshTime'] = 1000;
            //     }
            //     this.todo();
            // }
        },
        methods: {
            // todo: function () {
            //     this.Interval = setInterval(function () {
            //         this.getChartData();
            //     }.bind(this), this.obj['refreshTime']);
            // },
            // getChartData() {
            //     axios.get(this.obj['url']).then(response => {
            //         let res = response.data;
            //         this.chartData = res['data'];
            //     }).catch(error => {
            //         this.error = error.response.data.message;
            //         clearInterval(this.Interval);
            //     });
            // },
        }
    }
</script>
