<?php

namespace App\Http\Controllers;

use App\Models\news_view;
use Illuminate\Support\Facades\DB;

class HomeController extends ControllerUsers
{
    public function data_config()
    {
        // Category
        $category_db = DB::table('news_category')->select('type', 'name')->orderBy('type', 'asc')->pluck('name', 'type')->toArray();
        $obj['category'] = $category_db;
        $obj['category_show'] = 9;
        return $obj;
    }

    public function index()
    {
        $obj = $this->data_config();
        $obj['title'] = 'IndiaToday';
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
            [
                'movies',
                'sports',
                'technology',
                'lifestyle',
                'trending',
                'india',
            ],
            [
                'magazine',
            ],
            [
                'television',
                'business',
            ],
            [
                'science',
                'education',
                'cities',
                'auto',
                'world',
                'others',
            ]
        ];
        $category = [];
        $others_data = [];
        foreach ($category_name as $key => $value) {
            foreach ($value as $k_2 => $val_2) {
                $category_id = config('constants.news_category.' . $val_2);
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
        $obj = $this->data_config();
        $news = DB::table('news')->select('id', 'title', 'category_id', 'content', 'created_at', 'updated_at')->where('url', $url)->where('publish', 1)->first();
        if ($news) {
            $obj['title'] = $news->title;
            $obj['detail'] = $news;
            // views
            session_start();
            if (!isset($_SESSION['uniqueID'])) {
                $_SESSION['uniqueID'] = uniqid('', true);
            }
            $uniqueID = $_SESSION['uniqueID'];
            $view = DB::table('news_view')->where('news_id', $news->id)->where('unknown_token', $uniqueID)->first();
            if (!$view) {
                news_view::create([
                    'news_id' => $news->id,
                    'unknown_token' => $uniqueID,
                ]);
            }
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
            $take = 7;
            $recommend_db = DB::table('news')->select('id', 'title', 'url', 'image')->where('publish', 1)->where('category_id', $news->category_id)->orderBy('id', 'desc')->take($take)->get();
            $obj['recommend'] = $recommend_db;
            return view('detail')->with('obj', $obj);
        }
        $obj['title'] = '404 | Not Found';
        return view('errors.404_custom')->with('obj', $obj);
    }
}
