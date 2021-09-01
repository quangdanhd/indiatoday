<?php

namespace App\Http\Controllers;

class RssFeedController extends ControllerUsers
{
    public function feed()
    {
        $posts = (new \App\Models\news)->leftJoin('news_category', 'news.category_id', 'news_category.type')->where('publish', 1)->
        orderBy('created_at', 'desc')->limit(50)->get();
        return response()->view('rss.feed', compact('posts'))->header('Content-Type', 'application/xml');
    }
}
