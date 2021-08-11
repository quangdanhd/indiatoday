<?php

namespace App\Http\Controllers;

use App\Models\news_view;
use Illuminate\Support\Facades\DB;

class HomeController extends ControllerUsers
{
    public function index()
    {
        $obj = menu_category();
        $obj['title'] = 'Mekong24h';
        // Recent
        $take = 3;
        $newest_db = DB::table('news')->select('id', 'url', 'title', 'image')->where('publish', 1)->orderBy('id', 'desc')->take($take)->get();
        $newest = [];
        $newest_id = [];
        foreach ($newest_db as $key => $value) {
            $arr = (array)$value;
            if (!!$key) {
                $arr['image'] = str_replace('news_370x208', 'news_237x133', $arr['image']);
            }
            $newest[] = $arr;
            $newest_id[] = $arr['id'];
        }
        $obj['newest'] = $newest;
        // Top
        $take = 10;
        $top_db = get_top_news();
        $top_db = $top_db->select('id', 'url', 'title')->whereNotIn('id', $newest_id)->take($take)->get();
        $obj['top'] = $top_db;
        // OTHER
        $category_name = [
            // 6 items
            [
                1,
                2,
                3,
                4,
                5,
                6,
            ],
            // 1 items (*hidden)
            [
                7,
            ],
            // 3 items
            [
                8,
                9,
                10,
            ],
            // 6 items
            [
                11,
                12,
                13,
                11,
                12,
                13,
            ]
        ];
        $category = [];
        $others_data = [];
        foreach ($category_name as $key => $value) {
            foreach ($value as $k_2 => $val_2) {
                $category_id = $val_2;
                $category[] = $category_id;
                $others_data[$key][$category_id] = [];
            }
        }
        $others_db = DB::table('news')->select('id', 'category_id', 'name', 'url', 'title', 'image')->leftJoin('news_category', 'category_id', 'type')->where('new_of_category', 1)->where('publish', 1)->whereIn('category_id', $category)->orderBy('id', 'desc')->get();
        $arr_0 = array_keys($others_data[0]);
        $arr_1 = array_keys($others_data[1]);
        $arr_2 = array_keys($others_data[2]);
        $arr_3 = array_keys($others_data[3]);
        foreach ($others_db as $key => $value) {
            $arr = (array)$value;
            if (in_array($arr['category_id'], $arr_0)) {
                $others_data[0][$arr['category_id']][] = $arr;
            }
            if (in_array($arr['category_id'], $arr_1)) {
                $others_data[1][$arr['category_id']][] = $arr;
            }
            if (in_array($arr['category_id'], $arr_2)) {
                $others_data[2][$arr['category_id']][] = $arr;
            }
            if (in_array($arr['category_id'], $arr_3)) {
                $others_data[3][$arr['category_id']][] = $arr;
            }
        }
        $obj['others'] = $others_data;
        return view('home')->with('obj', $obj);
    }

    public function show($url)
    {
        $obj = menu_category();
        $news = DB::table('news')->select('id', 'title', 'describe', 'category_id', 'content', 'created_at', 'updated_at')->where('url', $url)->where('publish', 1)->first();
        if ($news) {
            $obj['title'] = $news->title;
            $obj['detail'] = $news;
            $this->view_node($news->id);
            $this->aside_data($obj, $news->category_id);
            return view('detail')->with('obj', $obj);
        }
        $obj['title'] = '404 | Not Found';
        return view('errors.404_custom')->with('obj', $obj);
    }

    public function category($url)
    {
        $obj = menu_category();
        $category = DB::table('news_category')->select('type')->where('link', $url)->first();
        if ($category) {
            $obj['title'] = ucfirst($url);
            // List
            $take = 20;
            $list = DB::table('news')->select('id', 'title', 'describe', 'image', 'url')->where('category_id', $category->type)->where('publish', 1)->paginate($take);
            $obj['list'] = $list;
            $this->aside_data($obj, $category->type);
            return view('category')->with('obj', $obj);
        }
        $obj['title'] = '404 | Not Found';
        return view('errors.404_custom')->with('obj', $obj);
    }

    public function aside_data(&$obj, $category_id)
    {
        // Top
        $take = 4;
        $top_db = get_top_news();
        $top_db = $top_db->select('id', 'title', 'url', 'image')->take($take)->get();
        $top = [];
        foreach ($top_db as $key => $value) {
            $arr = (array)$value;
            $arr['image'] = str_replace('news_370x208', 'news_237x133', $arr['image']);
            $top[] = $arr;
        }
        $obj['top'] = $top;
        // Recommend
        $take = 5;
        $recommend_db = DB::table('news')->select('id', 'title', 'url', 'image')->where('publish', 1)->where('category_id', $category_id)->orderBy('id', 'desc')->take($take)->get();
        $obj['recommend'] = $recommend_db;
    }

    public function view_node($news_id)
    {
        // views
        $uniqueID = session_uniqueID();
        $view = DB::table('news_view')->select('id')->where('news_id', $news_id)->where('unknown_token', $uniqueID)->first();
        if (!$view) {
            news_view::create([
                'news_id' => $news_id,
                'unknown_token' => $uniqueID,
            ]);
        }
    }
}
