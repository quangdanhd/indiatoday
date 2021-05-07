<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\Authenticatable;

class product extends Model implements Authenticatable
{
    use \Illuminate\Auth\Authenticatable;
    protected $table = 'product';
    protected $primaryKey = 'id';
    protected $fillable = ['product', 'category_id', 'url', 'desc', 'size', 'cost', 'price', 'price_default', 'is_order', 'active'];

    public $timestamps = TRUE;

    const CREATED_AT = 'created_at';
    const UPDATED_AT = 'updated_at';

    public function dataFormIndex()
    {
        return $this->whereNotNull('product.id');
    }

    public function dataFormDestroy($id)
    {
        $this->where('id', $id)->update(['active' => 0]);
    }
}
