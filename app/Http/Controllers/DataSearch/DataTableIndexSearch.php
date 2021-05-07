<?php

namespace App\Http\Controllers\DataSearch;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class DataTableIndexSearch extends Controller
{
    public function index(Request $request)
    {
        $params = $request->all();
        if (isset($params['table'], $params['primaryKey'])) {
            // model
            $modelName = 'App\\Models\\' . $params['table'];
            $model = new $modelName;
            // column
            $all_column = DB::getSchemaBuilder()->getColumnListing($params['table']);
            $hidden_column = isset($params['hidden_column']) ? $params['hidden_column'] : [];
            $column_new = array_diff($all_column, $hidden_column);
            $column = [];
            foreach ($column_new as $key => $value) {
                $column[] = $params['table'] . '.' . $value;
            }
            // data join
            $data_join = [];
            if (isset($params['custom_config']['search_model'])) {
                $data = $model->{$params['custom_config']['search_model']}()->select($column);
                if ($params['field_join']) {
                    $data_join = $model->{$params['custom_config']['search_model']}();
                }
            } elseif (method_exists($model, 'getDataTable')) {
                $data = $model->getDataTable()->select($column);
                if ($params['field_join']) {
                    $data_join = $model->getDataTable();
                }
            } else {
                $data = DB::table($params['table'])->whereNotNull($params['primaryKey'])->select($column);
                if ($params['field_join']) {
                    $data_join = DB::table($params['table'])->whereNotNull($params['primaryKey']);
                }
            }
            // join index
            $data_join_select = [];
            foreach ($params['field_join'] as $key => $value) {
                $data_join = $data_join->leftjoin($value['table'] . ' as ' . $value['table'] . '_' . $key, $value['table'] . '_' . $key . '.' . $value['primaryKey'], '=', $params['table'] . '.' . $key);
                if (is_array($value['get_field'])) {
                    // get multiple field
                    foreach ($value['get_field'] as $k2 => $val2) {
                        $data_join_select[] = $value['table'] . '_' . $key . '.' . $val2 . ' as ' . $key . '_' . $val2;
                    }
                } else {
                    // single field [id]
                    $data_join_select[] = $value['table'] . '_' . $key . '.' . $value['get_field'] . ' as ' . $key . '_Join';
                }
            }
            if ($data_join_select) {
                $data_join = $data_join->select($data_join_select);
            }
            // query
            $checkFilterJoin = array_keys($params['filterJoin']);
            $filterJoin = $params['filterJoin'];
            foreach ($params['dataSearch'] as $key => $value) {
                if ($value !== null) {
                    $operators = 'like';
                    $str = $value;
                    if (isset($params['dataQuery'][$key])) {
                        $operators = $params['dataQuery'][$key];
                    }
                    if ($operators === 'like') {
                        $str = '%' . $value . '%';
                    }
                    $field = explode(explode_filter(), $key)[0];
                    if (!in_array($key, $checkFilterJoin)) {
                        $data = $data->where($params['table'] . '.' . $field, $operators, $str);
                        if ($data_join) {
                            $data_join = $data_join->where($params['table'] . '.' . $field, $operators, $str);
                        }
                    } else {
                        $key_2 = str_replace(explode_filter(), '', $key);
                        $data = $data->leftjoin($filterJoin[$key]['table'] . ' as ' . $filterJoin[$key]['table'] . '_' . $key_2, $filterJoin[$key]['table'] . '_' . $key_2 . '.' . $filterJoin[$key]['primaryKey'], '=', $params['table'] . '.' . $filterJoin[$key]['join_field']);
                        $data = $data->where($filterJoin[$key]['table'] . '_' . $key_2 . '.' . $field, $operators, $str);
                        if ($data_join) {
                            $data_join = $data_join->leftjoin($filterJoin[$key]['table'] . ' as ' . $filterJoin[$key]['table'] . '_filter_' . $key_2, $filterJoin[$key]['table'] . '_filter_' . $key_2 . '.' . $filterJoin[$key]['primaryKey'], '=', $params['table'] . '.' . $filterJoin[$key]['join_field']);
                            $data_join = $data_join->where($filterJoin[$key]['table'] . '_filter_' . $key_2 . '.' . $field, $operators, $str);
                        }
                    }
                }
            }
            // order by
            if ($params['dataSort']) {
                $orderBy = array_keys($params['dataSort'])[0];
                $direction = $params['dataSort'][$orderBy];
                $data = $data->orderBy($params['table'] . '.' . $orderBy, $direction);
                if ($data_join) {
                    $data_join = $data_join->orderBy($params['table'] . '.' . $orderBy, $direction);
                }
            } else {
                $data = $data->orderBy($params['table'] . '.' . $params['primaryKey'], 'asc');
                if ($data_join) {
                    $data_join = $data_join->orderBy($params['table'] . '.' . $params['primaryKey'], 'asc');
                }
            }
            // paginate
            $paginate = 20;
            $data = $data->paginate($paginate);
            if ($data_join) {
                $data_join = $data_join->paginate($paginate);
                // make field_Join when get_field is multiple
                foreach ($params['field_join'] as $key => $value) {
                    if (is_array($value['get_field'])) {
                        foreach ($data_join as $k2 => $val2) {
                            $val_join = [];
                            foreach ($value['get_field'] as $k3 => $val3) {
                                $val_join[] = $val2[$key . '_' . $val3];
                            }
                            $val_join = join(' - ', $val_join);
                            $data_join[$k2][$key . '_Join'] = $val_join;
                        }
                    }
                }
            }
            $user = Auth::user();
            $policyName = 'App\\Policies\\' . $params['table'] . 'Policy';
            $policy = new $policyName;
            $canUpdate = [];
            $canDel = [];
            foreach ($data as $key => $value) {
                // $canUpdate[$value[$params['primaryKey']]] = $policy->update($user, $value, $params['url']);
                $canUpdate[$value[$params['primaryKey']]] = true;
                $canDel[$value[$params['primaryKey']]] = $policy->destroy($user, $value, $params['url']);
            }
            return [
                'data' => $data,
                'data_join' => $data_join,
                'canUpdate' => $canUpdate,
                'canDel' => $canDel,
            ];
        } else {
            return [];
        }
    }
}
