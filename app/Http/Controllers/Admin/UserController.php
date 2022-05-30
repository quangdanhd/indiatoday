<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;

class UserController extends Controller
{
    public function data_config()
    {
        // table_name
        $table_name = 'user';
        // PrimaryKey
        $primaryKey = 'id';
        // filed
        $field = [
            'username' => config_field('text'),
            'password' => config_field('password'),
            'fullname' => config_field('text'),
            'facebook' => config_field('text'),
            'address' => config_field('text'),
            'phone' => config_field('text'),
            'is_admin' => config_field('boolean'),
            'active' => config_field('boolean'),
        ];
        // hidden column
        $hidden_column = [
            'password',
        ];
        // default value
        $default_value = [];
        // label
        $label = [];
        // form
        $form = [
            0 => ['type' => 'div',
                'class' => 'col-md-12 col-lg-12 mt-2',
                'items' => [
                    0 => [
                        'type' => 'div',
                        'class' => 'col-md-12 col-lg-6',
                        'items' => [
                            0 => [
                                'type' => 'field',
                                'items' => [
                                    'fullname',
                                    'facebook',
                                    'address',
                                    'phone',
                                ],
                            ]
                        ],
                    ],
                    1 => [
                        'type' => 'div',
                        'class' => 'col-md-12 col-lg-6',
                        'items' => [
                            0 => [
                                'type' => 'field',
                                'items' => [
                                    'username',
                                    'password',
                                    'is_admin',
                                    'active',
                                ]
                            ],
                        ]
                    ],
                ],
            ],
        ];
        // select field
        $select = [];
        // required
        $required = [
            'username',
            'fullname',
        ];
        // reference
        $reference = [];
        // primarySearch
        $primarySearch = [];
        // search_popup
        $search_popup = $this->search_popup();
        // table join
        $table_join = $this->table_join();
        // index filter
        $index_filter = $this->index_filter();
        // field_join
        $field_join = $this->field_join();
        return [
            'table_name' => $table_name,
            'primaryKey' => $primaryKey,
            'field' => $field,
            'hidden_column' => $hidden_column,
            'default_value' => $default_value,
            'label' => $label,
            'form' => $form,
            'select' => $select,
            'required' => $required,
            'reference' => $reference,
            'search_popup' => $search_popup,
            'primarySearch' => $primarySearch,
            'table_join' => $table_join,
            'redirect' => true, // true: redirect to index, false: show message
            'index_filter' => $index_filter,
            'import' => false,
            'export' => false,
            'field_join' => $field_join,
        ];
    }

    public function index_filter()
    {
        return config_search_popup('user_id');
    }

    public function search_popup()
    {
        return [];
    }

    public function table_join()
    {
        return [];
    }

    public function field_join()
    {
        return [];
    }

    public function index()
    {
        return reports_form_index($this->data_config());
    }

    public function show($id)
    {
        return reports_form_show($id, $this->data_config());
    }

    public function create()
    {
        $obj = reports_form_create_data($this->data_config());
        return View::make('report/data_form')->with('obj', $obj);
    }

    public function store(Request $request)
    {
        $requestData = $request->all();
        $message = $this->validate_record('', $request);
        if ($message) {
            return [
                'status' => 'error',
                'message' => $message,
            ];
        }
        $return = reports_form_store($this->data_config(), $requestData);
        return $return;
    }

    public function edit($id)
    {
        $data = $this->data_config();
        $record = DB::table('user')->select('fullname', 'username')->find($id);
        if ($record) {
            $data['title'] = join(' - ', [$record->fullname, $record->username]);
        }
        $obj = reports_form_edit_data($id, $data);
        return View::make('report/data_form')->with('obj', $obj);
    }

    public function update(Request $request)
    {
        $requestData = $request->all();
        $id = isset($requestData['formData']['id']) ? $requestData['formData']['id'] : '';
        $message = $this->validate_record($id, $request);
        if ($message) {
            return [
                'status' => 'error',
                'message' => $message,
            ];
        }
        $return = reports_form_update($this->data_config(), $requestData);
        return $return;
    }

    public function destroy($id)
    {
        // return reports_form_destroy($id, $this->data_config());
    }

    public function validate_record($id, $request)
    {
        $message = [];
        $user_name = isset($request->all()['formData']['username']) ? $request->all()['formData']['username'] : '';
        if (!!$user_name) {
            $user = DB::table('user')->where('id', '!=', $id)->where('username', $user_name)->first();
            if ($user) {
                $message[] = 'Đã tồn tại tên tài khoản, vui lòng sử dụng tên tài khoản khác!';
            }
        } else {
            $message[] = 'Tên tài khoản không được để trống!';
        }
        if ($message) {
            $message = '<br>' . join('<br>', $message);
        }
        return $message;
    }
}
