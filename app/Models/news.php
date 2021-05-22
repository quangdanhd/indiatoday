<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class news extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;
    protected $table = 'news';
    protected $primaryKey = 'id';
    protected $fillable = ['title', 'category_id', 'describe', 'content', 'url', 'image', 'author_id', 'views', 'publish'];

    public $timestamps = TRUE;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public static function boot()
    {
        parent::boot();
        self::saving(function ($model) {
            $category_id = $model->category_id;
            DB::table('news')->where('publish', 1)->where('category_id', $category_id)->where('new_of_category', 1)->update(['new_of_category' => 0]);
            DB::table('news')->where('publish', 1)->where('category_id', $category_id)->orderBy('id', 'desc')->take(4)->update(['new_of_category' => 1]);
            if (!$model->id && !!$model->publish) {
                $model->new_of_category = 1;
            }
            $url = trim($model->title);
            $url = convert_name($url);
            $url = strtolower($url);
            // Removes special chars.
            $url = preg_replace('/[^A-Za-z0-9\s]/', '', $url);
            $url = preg_replace('/\s+/', '-', $url);
            $id = !!$model->id ? $model->id : '';
            if (!$id) {
                $id_db = DB::table('news')->select('id')->orderBy('id', 'desc')->first();
                if ($id_db) {
                    $id = $id_db->id + 1;
                } else {
                    $id = 1;
                }
            }
            $model->url = $url . '-' . $id;
        });
    }

    public function dataFormIndex()
    {
        return $this->whereNotNull('news.id')->orderBy('id', 'desc');
    }

    public function news_top()
    {
        return $this->orderBy('views', 'desc');
    }
}
