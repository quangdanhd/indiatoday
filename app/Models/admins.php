<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

class admins extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;
    protected $table = 'admins';
    protected $primaryKey = 'id';
    protected $fillable = ['username', 'password', 'fullname', 'facebook', 'is_admin', 'address', 'phone', 'active'];

    public $timestamps = TRUE;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            $model->password = strtoupper(md5($model->password));
        });
        self::updating(function ($model) {
            if ($model->password) {
                $model->password = strtoupper(md5($model->password));
            } else {
                $model->password = $model->getOriginal('password');
            }
        });
    }

    public function getAuth($username, $password)
    {
        $password = md5($password);
        return $this->where([
            ['username', '=', $username],
            ['password', '=', $password],
            ['is_active', '=', '1'],
        ])->first();
    }

    public function dataFormIndex()
    {
        return $this->whereNotNull('admins.id');
    }
}
