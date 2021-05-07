<?php

namespace App\Http\Controllers\DataSearch;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ReferenceSearchController extends Controller
{
    public function index(Request $request)
    {
        $params = $request->all();
        if (isset($params['table'], $params['primary'], $params['field']) && $params['table'] && $params['primary'] && $params['field']) {
            $data = DB::table($params['table'])->select($params['primary'], $params['field']);
            // query
            if (isset($params['search']) && $params['search']) {
                $data = $data->where($params['field'], 'like', '%' . $params['search'] . '%');
            }
            // order by
            $data = $data->orderBy($params['primary'], 'asc');
            // paginate
            $limit = isset($params['limit']) && $params['limit'] ? $params['limit'] : 10;
            $data = $data->take($limit)->get();
            return $data;
        } else {
            return [];
        }
    }
}
