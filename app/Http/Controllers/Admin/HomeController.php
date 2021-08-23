<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

class HomeController extends Controller
{
    public function data_config()
    {
        // Chart 1
        $title = 'Lượt truy cập 30 ngày gần đây';
        $type = 'AreaChart';
        $options = [
            'vAxis' => [
                'title' => 'Lượt',
                'minValue' => 0,
            ],
            'hAxis' => ['title' => 'Ngày'],
        ];
        $date_now = strtotime(date('Y-m-d'));
        $date = strtotime('-30 days', $date_now);
        $date = date('Y-m-d', $date);
        $total = DB::table('access_times')->select('id')->count();
        $obj['access_total'] = $total;
        $db = DB::table('access_times')->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as views'))->whereDate('created_at', '>=', $date)->groupBy('date')->get()->pluck('views', 'date')->toArray();
        $data = [];
        if ($db) {
            $data = [
                ['Ngày', 'Lượt'],
            ];
            foreach ($db as $key => $value) {
                $data[] = [date('d-m', strtotime($key)), $value];
            }
        }
        $chart_1 = [
            'title' => $title,
            'type' => $type,
            'options' => $options,
            'data' => $data,
            'autoRefresh' => false,
            'refreshTime' => 10000, // (ms)
        ];
        $obj['chart_1'] = $chart_1;
        return $obj;
    }

    public function index()
    {
        $obj = $this->data_config();
        $obj['chart_1'] = $this->chart_data($obj['chart_1']);
        if (request()->ajax()) {
            return $obj;
        }
        return View::make('admin/home')->with('obj', $obj);
    }

    function chart_data($data)
    {
        $obj = $data;
        $obj['url'] = '/' . Route::getFacadeRoot()->current()->uri();
        // options
        $options = isset($data['options']) ? $data['options'] : [];
        switch ($data['type']) {
            case 'ColumnChart':
                // code column chart
                break;
            case 'StackedColumnChart':
                if (!isset($options['legend'])) {
                    $options['legend'] = ['position' => 'top', 'maxLines' => 3];
                }
                if (!isset($options['isStacked'])) {
                    $options['isStacked'] = true;
                    // $options['isStacked'] = 'percent';
                }
                break;
            case 'BarChart':
                if (!isset($options['bars'])) {
                    $options['bars'] = 'horizontal';
                }
                break;
            case 'ComboChart':
                if (!isset($options['seriesType'])) {
                    $options['seriesType'] = 'bars';
                }
                if (!isset($options['series'])) {
                    $options['series'] = [(count($data['data'][0]) - 2) => ['type' => 'line']];
                }
                break;
            case 'AreaChart':
                // code area chart
                break;
            case 'LineChart':
                if (!isset($options['curveType'])) {
                    $options['curveType'] = 'function';
                }
                break;
            case 'PieChart':
                // code pie chart
                break;
            case 'DonutChart':
                if (!isset($options['pieHole'])) {
                    $options['pieHole'] = 0.4;
                }
                break;
            default:
        }
        $options['title'] = $data['title'];
        $options['height'] = 300;
        $options['animation'] = [
            'duration' => 500,
            'easing' => 'linear',
            'startup' => true,
        ];
        $obj['options'] = $options;
        // end options
        $obj['type'] = $data['type'] == 'StackedColumnChart' ? 'ColumnChart' : $data['type'];
        $obj['type'] = $data['type'] == 'DonutChart' ? 'PieChart' : $obj['type'];
        if (!isset($data['autoRefresh'])) {
            $obj['autoRefresh'] = false;
        }
        if (!isset($data['refreshTime'])) {
            $obj['refreshTime'] = 10000;
        }
        //if (request()->ajax()) {
        //    return $data;
        //}
        return $obj;
    }

    public function flush_cache()
    {
        Cache::flush();
        $mes = 'Xóa cache thành công!';
        return View::make('admin/view_message')->with('mes', $mes);
    }
}
