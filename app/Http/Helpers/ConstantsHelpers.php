<?php

use App\Models\news;
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
        // $f_type = DB::getSchemaBuilder()->getColumnType($table, $value);
        $f_type = 'text';
        $field_type[$value] = $f_type;
        echo "'" . $value . "'" . ' => ' . "'" . $f_type . "',<br>";
    }
    dd(1);
    return;
}

function get_top_news()
{
    return DB::table('news')->where('publish', 1)->orderBy('views', 'desc');
}

function session_uniqueID()
{
    return session_client_ip();
    //    if (session_status() === PHP_SESSION_NONE) {
    //        session_start();
    //    }
    //    if (!isset($_SESSION['uniqueID'])) {
    //        $_SESSION['uniqueID'] = uniqid('', true) . '-' . time();
    //    }
    //    return $_SESSION['uniqueID'];
}

function session_client_ip()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

function menu_category()
{
    // Category
    $category_db = DB::table('news_category')->select('type', 'name')->orderBy('type', 'asc')->pluck('name', 'type')->toArray();
    $obj['category'] = $category_db;
    $obj['category_show'] = 9;
    return $obj;
}

function generate_sample_data()
{
    $count = DB::table('news')->select('id')->count();
    if (!$count) {
        return 'Tạo 1 tin tức mới để làm dữ liệu mẫu, và thử lại tính năng này!';
    }
    if ($count > 1) {
        return 'Không sử dụng được tính năng tạo dữ liệu mẫu. Dữ liệu tin tức trong database có nhiều hơn 1 bản ghi!';
    }
    $news = DB::table('news')->select('title', 'category_id', 'content', 'describe', 'image', 'publish', 'new_of_category')->orderBy('id', 'desc')->first();
    if ($news) {
        $data = (array)$news;
        $category = DB::table('news_category')->orderBy('type', 'asc')->pluck('type')->toArray();
        foreach ($category as $key => $value) {
            $new_data = $data;
            $new_data['category_id'] = $value;
            for ($i = 0; $i <= 4; $i++) {
                news::create($new_data);
            }
        }
    }
    return 'Tạo dữ liệu mẫu thành công!';
}

function get_name_image_upload($image)
{
    return time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
}

function config_field($key)
{
    return config('constants.field.' . $key);
}

function convert_name($str)
{
    $str = preg_replace("/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/", 'a', $str);
    $str = preg_replace("/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/", 'e', $str);
    $str = preg_replace("/(ì|í|ị|ỉ|ĩ)/", 'i', $str);
    $str = preg_replace("/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/", 'o', $str);
    $str = preg_replace("/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/", 'u', $str);
    $str = preg_replace("/(ỳ|ý|ỵ|ỷ|ỹ)/", 'y', $str);
    $str = preg_replace("/(đ)/", 'd', $str);
    $str = preg_replace("/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/", 'A', $str);
    $str = preg_replace("/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/", 'E', $str);
    $str = preg_replace("/(Ì|Í|Ị|Ỉ|Ĩ)/", 'I', $str);
    $str = preg_replace("/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/", 'O', $str);
    $str = preg_replace("/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/", 'U', $str);
    $str = preg_replace("/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/", 'Y', $str);
    $str = preg_replace("/(Đ)/", 'D', $str);
    return $str;
}

function explode_filter()
{
    return config('constants.explode_filter');
}

function config_search_popup($key)
{
    if ($key == 'news_id') {
        return [
            'search_table' => 'news',
            'primaryKey' => 'id',
            'search_filter' => [
                'title' => config_field('text'),
                'category_id' => config_field('select'),
                'publish' => config_field('select'),
                'created_at' . explode_filter() . 'from' => config_field('date'),
                'created_at' . explode_filter() . 'to' => config_field('date'),
            ],
            'search_autofill' => [
                'news_id' => 'id',
            ],
            'join' => [],
            'field_join' => [],
            'query' => [
                'category_id' => '=',
                'publish' => '=',
                'created_at' . explode_filter() . 'to' => '<=',
                'created_at' . explode_filter() . 'from' => '>=',
            ],
            'select' => [
                'category_id' => DB::table('news_category')->pluck('name', 'type'),
                'publish' => [
                    '0' => 'no',
                    '1' => 'yes',
                ],
            ],
            'default_search' => [
                'publish' => '1',
            ],
            'hidden_column' => []
        ];
    }
    return [];
}
