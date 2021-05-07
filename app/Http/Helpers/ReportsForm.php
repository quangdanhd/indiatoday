<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

function reports_form_before(&$data)
{
    $db_column = config('db_column');
    $db_column_type = config('db_column_type');
    // get all columns name
    if (isset($db_column[$data['table_name']])) {
        $field_name = $db_column[$data['table_name']];
    } else {
        $field_name = DB::getSchemaBuilder()->getColumnListing($data['table_name']);
    }
    $column_type = [];
    if (isset($db_column_type[$data['table_name']])) {
        $column_type = $db_column_type[$data['table_name']];
    }
    $field_type = [];
    foreach ($field_name as $key => $value) {
        if (isset($data['field'][$value])) {
            $field_type[$value] = $data['field'][$value];
        } else {
            if (isset($column_type[$value])) {
                $field_type[$value] = $column_type[$value];
            } else {
                $field_type[$value] = 'text';
            }
        }
    }
    $data['field_type'] = $field_type;
    // default value
    if (!isset($data['default_value'])) {
        $data['default_value'] = [];
    }
    // reference
    if (!isset($data['reference'])) {
        $data['reference'] = [];
    }
    // table join
    if (isset($data['table_join'])) {
        foreach ($data['table_join'] as $key => $value) {
            // field name
            if (isset($value['table'])) {
                if (isset($db_column[$value['table']])) {
                    $field_name = $db_column[$value['table']];
                } else {
                    $field_name = DB::getSchemaBuilder()->getColumnListing($value['table']);
                }
                $data['table_join'][$key]['field_name'] = $field_name;
            }
            // field type for view
            $column_type_join = [];
            if (isset($db_column_type[$value['table']])) {
                $column_type_join = $db_column_type[$value['table']];
            }
            $field_type = [];
            foreach ($data['table_join'][$key]['field_name'] as $k_2 => $val_2) {
                if (isset($data['table_join'][$key]['field_type'][$val_2])) {
                    $field_type[$val_2] = $data['table_join'][$key]['field_type'][$val_2];
                } else {
                    if (isset($column_type_join[$val_2])) {
                        $field_type[$val_2] = $column_type_join[$val_2];
                    } else {
                        $field_type[$val_2] = 'text';
                    }
                }
            }
            $data['table_join'][$key]['field_type'] = $field_type;
            // hide field
            if (!isset($value['hide_field'])) {
                $data['table_join'][$key]['hide_field'] = [];
            }
            // join
            if (!isset($value['join'])) {
                $data['table_join'][$key]['join'] = [];
            }
            // default value
            if (!isset($value['default_value'])) {
                $data['table_join'][$key]['default_value'] = [];
            }
        }
    }
    // hidden column (to ignore field in index list)
    if (!isset($data['hidden_column'])) {
        $data['hidden_column'] = [];
    }
    // field join (to show detail field: field [primaryKey])
    if (!isset($data['field_join'])) {
        $data['field_join'] = [];
    }
    // index filter join (to show detail field: join_field [primaryKey])
    if (!isset($data['index_filter']['join'])) {
        $data['index_filter']['join'] = [];
    }
    // field view
    if (!isset($data['field_view'])) {
        $data['field_view'] = [];
    }
    if (isset($data['primarySearch'])) {
        foreach ($data['primarySearch'] as $key => $value) {
            if (!isset($value['select'])) {
                $data['primarySearch']['select'] = [];
            }
            if (!isset($value['selected'])) {
                $data['primarySearch']['selected'] = [];
            }
            if (!isset($value['hidden_column'])) {
                $data['primarySearch']['hidden_column'] = [];
            }
        }
    }
}

function reports_form_create_data($data)
{
    reports_form_before($data);
    $path = '/' . Route::getFacadeRoot()->current()->uri();
    $path = str_replace('/create', '', $path);
    // obj
    $obj = $data;
    if (!isset($obj['title'])) {
        $obj['title'] = trans('database.create_' . $data['table_name']);
    }
    $obj['url'] = $path;
    // first & last
    reports_form_first_last($obj);
    return $obj;
}

function reports_form_edit_data($id, $data)
{
    reports_form_before($data);
    $record = DB::table($data['table_name'])->where($data['primaryKey'], $id)->first();
    $record = (array)$record;
    // join
    $data_join = [];
    if ($data['field_join']) {
        $data_join = DB::table($data['table_name']);
    }
    $data_join_select = [];
    foreach ($data['field_join'] as $key => $value) {
        $data_join = $data_join->leftjoin($value['table'] . ' as ' . $value['table'] . '_' . $key, $value['table'] . '_' . $key . '.' . $value['primaryKey'], '=', $data['table_name'] . '.' . $key);
        $data_join_select[] = $value['table'] . '_' . $key . '.' . $value['field'] . ' as ' . $key . '_Join';
    }
    if ($data_join_select) {
        $data_join = $data_join->select($data_join_select)->where($data['table_name'] . '.' . $data['primaryKey'], $id)->first();
    }
    $data['data_join'] = $data_join;
    // obj
    $obj = $data;
    if (isset($obj['title'])) {
        $title = $obj['title'];
    } else {
        $title = trans('database.edit_' . $data['table_name']) . ': ' . $id;
    }
    $obj['title'] = $title;
    $path = Route::getFacadeRoot()->current()->uri();
    $path = '/' . explode('/', $path)[0] . '/' . $id;
    $obj['url'] = $path;
    $obj['record'] = $record;
    // table join
    if (isset($data['table_join']) && $data['table_join']) {
        foreach ($data['table_join'] as $key => $value) {
            $paginate = 20;
            $join_record = DB::table($value['table'])->where($value['join_field'], $id)->orderBy($value['primaryKey'], 'asc')->paginate($paginate);
            $obj['table_join'][$key]['recordReturn'] = $join_record;
            // join field
            $record_2 = [];
            if ($value['join']) {
                $record_2 = DB::table($value['table']);
            }
            $record_2_select = [];
            foreach ($value['join'] as $k2 => $val2) {
                $record_2 = $record_2->leftjoin($val2['table'] . ' as ' . $val2['table'] . '_j2_' . $k2, $val2['table'] . '_j2_' . $k2 . '.' . $val2['primaryKey'], '=', $value['table'] . '.' . $k2);
                $record_2_select[] = $val2['table'] . '_j2_' . $k2 . '.' . $val2['field'] . ' as ' . $k2 . '_Join';
            }
            if ($record_2_select) {
                $record_2 = $record_2->select($record_2_select)->where($value['table'] . '.' . $value['join_field'], $id)->orderBy($value['table'] . '.' . $value['primaryKey'], 'asc')->paginate($paginate);
            }
            $obj['table_join'][$key]['recordJoinReturn'] = $record_2;
        }
    }
    // first & last
    if (isset($obj['primarySearch']) && $obj['primarySearch']) {
        reports_form_first_last($obj);
        // model
        $modelName = 'App\\Models\\' . $obj['table_name'];
        $model = new $modelName;
        $previous = '';
        $next = '';
        if (method_exists($model, 'getChangeRecord')) {
            $record = $model->getChangeRecord()->select($obj['primaryKey'])->where($obj['primaryKey'], '<', $id)->orderBy($obj['primaryKey'], 'desc')->get()->take(1);
            if (isset($record[0])) {
                $previous = $record[0][$obj['primaryKey']];
            }
            $record = $model->getChangeRecord()->select($obj['primaryKey'])->where($obj['primaryKey'], '>', $id)->orderBy($obj['primaryKey'], 'asc')->get()->take(1);
            if (isset($record[0])) {
                $next = $record[0][$obj['primaryKey']];
            }
        } else {
            $record = DB::table($obj['table_name'])->select($obj['primaryKey'])->where($obj['primaryKey'], '<', $id)->orderBy($obj['primaryKey'], 'desc')->first();
            if ($record) {
                $previous = ((array)$record)[$obj['primaryKey']];
            }
            $record = DB::table($obj['table_name'])->select($obj['primaryKey'])->where($obj['primaryKey'], '>', $id)->orderBy($obj['primaryKey'], 'asc')->first();
            if ($record) {
                $next = ((array)$record)[$obj['primaryKey']];
            }
        }
        $obj['change_record']['previous'] = $previous;
        $obj['change_record']['next'] = $next;
    }
    return $obj;
}

function reports_form_index($data)
{
    reports_form_before($data);
    $path = '/' . Route::getFacadeRoot()->current()->uri();
    // obj
    $obj = $data;
    $obj['url'] = $path;
    reports_form_first_last($obj);
    if (request()->ajax()) {
        return $obj;
    }
    return View::make('report/data_form_index')->with('obj', $obj);
}

function reports_form_first_last(&$obj)
{
    if (isset($obj['primarySearch']) && $obj['primarySearch']) {
        $change_record = [];
        $change_record['previous'] = '';
        $change_record['next'] = '';
        // model
        $modelName = 'App\\Models\\' . $obj['table_name'];
        $model = new $modelName;
        $first = '';
        $last = '';
        if (method_exists($model, 'getChangeRecord')) {
            $record = $model->getChangeRecord()->select($obj['primaryKey'])->orderBy($obj['primaryKey'], 'asc')->get()->take(1);
            if (isset($record[0])) {
                $first = $record[0][$obj['primaryKey']];
            }
            $record = $model->getChangeRecord()->select($obj['primaryKey'])->orderBy($obj['primaryKey'], 'desc')->get()->take(1);
            if (isset($record[0])) {
                $last = $record[0][$obj['primaryKey']];
            }
        } else {
            $record = DB::table($obj['table_name'])->select($obj['primaryKey'])->orderBy($obj['primaryKey'], 'asc')->first();
            if ($record) {
                $first = ((array)$record)[$obj['primaryKey']];
            }
            $record = DB::table($obj['table_name'])->select($obj['primaryKey'])->orderBy($obj['primaryKey'], 'desc')->first();
            if ($record) {
                $last = ((array)$record)[$obj['primaryKey']];
            }
        }
        $change_record['first'] = $first;
        $change_record['last'] = $last;
        $obj['change_record'] = $change_record;
    }
}

function reports_form_show($id, $data)
{
    return reports_form_edit_data($id, $data);
}

function reports_form_create($data)
{
    $obj = reports_form_create_data($data);
    return View::make('report/data_form')->with('obj', $obj);
}

function reports_form_store($data, $request)
{
    reports_form_before($data);
    $form_data = $request['formData'];
    if (isset($form_data[$data['primaryKey']])) {
        unset($form_data[$data['primaryKey']]);
    }
    $record_modelName = 'App\\Models\\' . $data['table_name'];
    $record_model = new $record_modelName;
    $record = $record_model->create($form_data);
    $recordID = $record[$data['primaryKey']];
    // join table new data
    foreach ($data['table_join'] as $key => $value) {
        foreach ($request['joinNewData'][$key] as $k_2 => $v_2) {
            $data_join = $v_2;
            $data_join[$value['join_field']] = $recordID;
            $modelName = 'App\\Models\\' . $value['table'];
            $model = new $modelName;
            $model->create($data_join);
        }
    }
    $return = [];
    $return['status'] = 'success';
    $return['id'] = $recordID;
    $return['redirect'] = $data['redirect'];
    if ($data['redirect']) {
        $path = Route::getFacadeRoot()->current()->uri();
        $path = str_replace('/store', '', $path);
        $return['url'] = $path;
    } else {
        $return['message'] = 'Tạo mới thành công!';
        if (isset($data['message_return'])) {
            $return['message'] .= $data['message_return'];
        }
    }
    return $return;
}

function reports_form_edit($id, $data)
{
    $obj = reports_form_edit_data($id, $data);
    return View::make('report/data_form')->with('obj', $obj);
}

function reports_form_update($data, $request)
{
    reports_form_before($data);
    $form_data = $request['formData'];
    $recordID = '';
    if (isset($form_data[$data['primaryKey']])) {
        $recordID = $form_data[$data['primaryKey']];
        unset($form_data[$data['primaryKey']]);
    }
    $model = 'App\\Models\\' . $data['table_name'];
    $model::find($recordID)->update($form_data);
    foreach ($data['table_join'] as $key => $value) {
        // join table new data
        foreach ($request['joinNewData'][$key] as $k_2 => $v_2) {
            $data_join = $v_2;
            $data_join[$value['join_field']] = $recordID;
            $modelName = 'App\\Models\\' . $value['table'];
            $model = new $modelName;
            $model->create($data_join);
        }
        // join table update data
        foreach ($request['joinUpdateData'][$key] as $k_2 => $v_2) {
            $data_join = $v_2;
            unset($data_join[$value['primaryKey']]);
            $modelName = 'App\\Models\\' . $value['table'];
            $model = new $modelName;
            // $model->where($value['primaryKey'], $v_2[$value['primaryKey']])->update($data_join);
            $model->find($v_2[$value['primaryKey']])->update($data_join);
        }
    }
    $return = [];
    $return['status'] = 'success';
    $return['id'] = $recordID;
    $return['redirect'] = $data['redirect'];
    if ($data['redirect']) {
        $path = Route::getFacadeRoot()->current()->uri();
        $path = explode('/', $path)[0];
        $return['url'] = $path;
    } else {
        $return['message'] = 'Cập nhật thành công!';
        if (isset($data['message_return'])) {
            $return['message'] .= $data['message_return'];
        }
    }
    return $return;
}

function reports_form_destroy($id, $data)
{
    reports_form_before($data);
    $modelName = 'App\\Models\\' . $data['table_name'];
    $model = new $modelName;
    if (method_exists($model, 'dataFormDestroy')) {
        $model->dataFormDestroy($id);
        return [
            'status' => 'success',
            'message' => 'Đã xóa bản ghi!',
        ];
    } else {
        return [
            'status' => 'error',
            'message' => 'Chưa khởi tạo hàm dataFormDestroy trong Model!',
        ];
    }
}
