<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

class access_times extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;
    protected $table = 'access_times';
    protected $primaryKey = 'id';
    protected $fillable = ['user_id', 'unknown_token'];

    public $timestamps = TRUE;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = null;

    public function dataFormIndex()
    {
        return $this->whereNotNull('access_times.id')->orderBy('id', 'desc');
    }
}
