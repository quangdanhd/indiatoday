<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;

function reports_table_before(&$data)
{
    if (!isset($data['table_th'])) {
        $data['table_th'] = [];
    }
    if (!isset($data['field_name'])) {
        $data['field_name'] = [];
    }
    if (!isset($data['field_type'])) {
        $data['field_type'] = [];
    }
    if (!isset($data['field_join'])) {
        $data['field_join'] = [];
    }
    if (!isset($data['required'])) {
        $data['required'] = [];
    }
    if (!isset($data['required'])) {
        $data['required'] = [];
    }
    if (!isset($data['select'])) {
        $data['select'] = [];
    }
    if (!isset($data['hidden_input'])) {
        $data['hidden_input'] = [];
    }
    if (!isset($data['search_popup'])) {
        $data['search_popup'] = [];
    }
    if (!isset($data['search'])) {
        $data['search'] = [];
    }
    if (!isset($data['sort'])) {
        $data['sort'] = [];
    }
    $modelName = 'App\\Models\\' . $data['table_name'];
    $data['new_record'] = new $modelName;
    // field name = [] to select all columns
    if (empty($data['field_name'])) {
        // get all columns name
        $data['field_name'] = DB::getSchemaBuilder()->getColumnListing($data['table_name']);
        // set table header
        $data['table_th'] = $data['field_name'];
        // field type for view
        $db_column_type = config('db_column_type');
        $column_type = [];
        if (isset($db_column_type[$data['table_name']])) {
            $column_type = $db_column_type[$data['table_name']];
        }
        $field_type = [];
        foreach ($data['field_name'] as $key => $value) {
            if (isset($data['field_type'][$value])) {
                $field_type[$value] = $data['field_type'][$value];
            } else {
                if (isset($column_type[$value])) {
                    $field_type[$value] = $column_type[$value];
                } else {
                    $field_type[$value] = 'text';
                }
            }
        }
        $data['field_type'] = $field_type;
    }
    // url
    $path = Route::getFacadeRoot()->current()->uri();
    $data['url'] = $path;
    // add & update & destroy
    $user = Auth::user();
    $policyName = 'App\\Policies\\' . $data['table_name'] . 'Policy';
    $policy = new $policyName;
    // $canAdd = $policy->create($user, $data['new_record'], $path);
    $canAdd = true;
    $canUpdate = [];
    $canDel = [];
    $data['canAdd'] = $canAdd;
    $data['canUpdate'] = $canUpdate;
    $data['canDel'] = $canDel;
}

function reports_table_index($this_obj, $data)
{
    reports_table_before($data);
    $obj = $data;
    // $this_obj->authorize('index', [$data['new_record'], $data['url']]);
    return View::make('report/data_table')->with('obj', $obj);
}

function reports_table_validate($data)
{
    reports_table_before($data);
    $required = isset($data['required']) ? $data['required'] : [];
    $validate = [];
    foreach ($required as $key => $value) {
        $validate['create.*.' . $value] = 'required';
        $validate['update.*.' . $value] = 'required';
    }
    return $validate;
}

function reports_table_save($this_obj, $data, $request)
{
    reports_table_before($data);
    $validate = reports_table_validate($data);
    try {
        $user = Auth::user();
        $policyName = 'App\\Policies\\' . $data['table_name'] . 'Policy';
        $policy = new $policyName;
        if ($data['required']) {
            $this_obj->validate($request, $validate);
        }
        // add
        // if ($policy->create($user, $data['new_record'], $data['url'])) {
            $data_add = $request['create'];
            foreach ($data_add as $key => $value) {
                $modelName = 'App\\Models\\' . $data['table_name'];
                $model = new $modelName;
                $model->create($value);
            }
            // DB::table($data['table_name'])->insert($data_add);
        // }
        // update
        $data_update = $request['update'];
        foreach ($data_update as $key => $value) {
            $model = 'App\\Models\\' . $data['table_name'];
            $update = $model::find($value[$data['primaryKey']]);
            if ($update) {
                // if ($policy->update($user, $update, $data['url'])) {
                    $update->update($value);
                    // DB::table($data['table_name'])->where($data['primaryKey'], $value[$data['primaryKey']])->update($value);
                // }
            }
        }
        return response()->json([
            'status' => 'success',
            'msg' => 'Thao tác thành công!',
        ], 201);
    } catch (ValidationException $exception) {
        return response()->json([
            'status' => 'error',
            'msg' => 'Chưa nhập trường bắt buộc, hoặc sai định dạng!',
            'errors' => $exception->errors(),
        ], 201);
    }
}

function reports_table_destroy($data, $request)
{
    $modelName = 'App\\Models\\' . $data['table_name'];
    $model = new $modelName;
    if (method_exists($model, 'dataTableDestroy')) {
        $model->dataTableDestroy($request['ids']);
        return [
            'status' => 'success',
            'msg' => 'Đã xóa bản ghi!',
        ];
    } else {
        return [
            'status' => 'error',
            'msg' => 'Chưa khởi tạo hàm dataTableDestroy trong Model!',
        ];
    }
}
