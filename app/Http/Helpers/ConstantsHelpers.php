<?php

use Illuminate\Support\Facades\DB;

function get_db_column()
{
    $table = '';
    $field_name = DB::getSchemaBuilder()->getColumnListing($table);
    foreach ($field_name as $key => $value) {
        echo "'" . $value . "',<br>";
    }
    get_db_column_type($table);
    dd(1);
    return;
}

function get_db_column_type($table)
{
    echo '<br><br><br>';
    $field_name = DB::getSchemaBuilder()->getColumnListing($table);
    $field_type = [];
    foreach ($field_name as $key => $value) {
        $f_type = DB::getSchemaBuilder()->getColumnType($table, $value);
        $field_type[$value] = $f_type;
        echo "'" . $value . "'" . ' => ' . "'" . $f_type . "',<br>";
    }
    dd(1);
    return;
}

function get_filename_extension($file)
{
    return explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
}

function config_field($key)
{
    return config('constants.field.' . $key);
}

function explode_filter()
{
    return config('constants.explode_filter');
}

function config_search_popup($key)
{
    $config = [
        'product_id' => [
            'search_table' => 'product',
            'primaryKey' => 'id',
            'search_filter' => [
                'product' => config_field('text'),
                'category_id' => config_field('select'),
                'desc' => config_field('text'),
                'size' => config_field('text'),
                'cost' . explode_filter() . 'from' => config_field('text'),
                'cost' . explode_filter() . 'to' => config_field('text'),
                'price' . explode_filter() . 'promotional_from' => config_field('text'),
                'price' . explode_filter() . 'promotional_to' => config_field('text'),
                'price_default' . explode_filter() . 'from' => config_field('text'),
                'price_default' . explode_filter() . 'to' => config_field('text'),
                'is_order' => config_field('select'),
                'active' => config_field('select'),
            ],
            'search_autofill' => [
                'product_id' => 'id',
            ],
            'join' => [],
            'field_join' => [],
            'query' => [
                'cost' . explode_filter() . 'from' => '>=',
                'cost' . explode_filter() . 'to' => '<=',
                'price' . explode_filter() . 'promotional_from' => '>=',
                'price' . explode_filter() . 'promotional_to' => '<=',
                'price_default' . explode_filter() . 'from' => '>=',
                'price_default' . explode_filter() . 'to' => '<=',
                'is_order' => '=',
                'active' => '=',
            ],
            'select' => [
                'category_id' => DB::table('category')->pluck('category', 'id'),
                'is_order' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
                'active' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
            ],
            'default_search' => [
                'active' => '1',
            ],
            'hidden_column' => [
                'created_at',
                'updated_at',
            ]
        ],
        'order_id' => [
            'search_table' => 'order',
            'primaryKey' => 'id',
            'search_filter' => [
                'collaborator' . explode_filter() . 'fullname' => config_field('text'),
                'customer' => config_field('text'),
                'phone' => config_field('text'),
                'address' => config_field('text'),
                'facebook' => config_field('text'),
                'desc' => config_field('text'),
                'paid' => config_field('select'),
                'status' => config_field('select'),
                'is_order' => config_field('select'),
                'active' => config_field('select'),
            ],
            'search_autofill' => [
                'order_id' => 'id',
            ],
            'join' => [
                'collaborator' . explode_filter() . 'fullname' => [
                    'table' => 'collaborator',
                    'primaryKey' => 'id',
                    'join_field' => 'collaborator_id',
                ],
            ],
            'field_join' => [
                'collaborator_id' => [
                    'table' => 'collaborator',
                    'primaryKey' => 'id',
                    'field' => 'fullname'
                ],
            ],
            'query' => [
                'paid' => '=',
                'status' => '=',
                'is_order' => '=',
                'active' => '=',
            ],
            'select' => [
                'paid' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
                'status' => DB::table('order_status')->pluck('status', 'id'),
                'is_order' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
                'active' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
            ],
            'default_search' => [
                'active' => '1',
            ],
            'hidden_column' => [
                'created_at',
                'updated_at',
            ]
        ],
        'collaborator_id' => [
            'search_table' => 'collaborator',
            'primaryKey' => 'id',
            'search_filter' => [
                'username' => config_field('text'),
                'fullname' => config_field('text'),
                'facebook' => config_field('text'),
                'address' => config_field('text'),
                'phone' => config_field('text'),
                'fullname' . explode_filter() . 'leader_id' => config_field('text'),
                'active' => config_field('select'),
            ],
            'search_autofill' => [
                'collaborator_id' => 'id',
            ],
            'join' => [
                'fullname' . explode_filter() . 'leader_id' => [
                    'table' => 'collaborator',
                    'primaryKey' => 'id',
                    'join_field' => 'leader_id',
                ],
            ],
            'field_join' => [
                'leader_id' => [
                    'table' => 'collaborator',
                    'primaryKey' => 'id',
                    'field' => 'fullname'
                ],
            ],
            'query' => [
                'active' => '=',
            ],
            'select' => [
                'active' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
            ],
            'default_search' => [
                'active' => '1',
            ],
            'hidden_column' => [
                'password',
                'created_at',
                'updated_at',
            ]
        ],
        'user_id' => [
            'search_table' => 'user',
            'primaryKey' => 'id',
            'search_filter' => [
                'username' => config_field('text'),
                'fullname' => config_field('text'),
                'facebook' => config_field('text'),
                'address' => config_field('text'),
                'phone' => config_field('text'),
                'is_admin' => config_field('select'),
                'active' => config_field('select'),
            ],
            'search_autofill' => [
                'user_id' => 'id',
            ],
            'join' => [],
            'field_join' => [],
            'query' => [
                'is_admin' => '=',
                'active' => '=',
            ],
            'select' => [
                'is_admin' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
                'active' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
            ],
            'default_search' => [
                'active' => '1',
            ],
            'hidden_column' => [
                'password',
                'created_at',
                'updated_at',
            ]
        ],
    ];
    return isset($config[$key]) ? $config[$key] : [];
}
