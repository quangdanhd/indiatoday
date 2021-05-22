<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Support\Facades\DB;

class news_view extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;
    protected $table = 'news_view';
    protected $primaryKey = 'id';
    protected $fillable = ['news_id', 'user_id', 'unknown_token', 'is_user'];

    public $timestamps = TRUE;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    public static function boot()
    {
        parent::boot();
        self::created(function ($model) {
            $view_count = DB::table('news_view')->select('id')->where('news_id', $model->news_id)->count();
            news::find($model->news_id)->update(['views' => $view_count]);
        });
    }

    public function dataFormIndex()
    {
        return $this->whereNotNull('news_view.id')->orderBy('id', 'desc');
    }
}
