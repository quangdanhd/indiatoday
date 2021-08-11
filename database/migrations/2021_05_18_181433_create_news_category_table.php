<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateNewsCategoryTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('news_category')) {
            Schema::create('news_category', function (Blueprint $table) {
                $table->integer('type');
                $table->string('name', 50);
                $table->string('link', 50);
            });
            DB::table('news_category')->insert(
                array(
                    [
                        'type' => '1',
                        'name' => 'Phim',
                        'link' => 'movies',
                    ],
                    [
                        'type' => '2',
                        'name' => 'Thể thao',
                        'link' => 'sports',
                    ],
                    [
                        'type' => '3',
                        'name' => 'Công nghệ',
                        'link' => 'technology',
                    ],
                    [
                        'type' => '4',
                        'name' => 'Lối sống',
                        'link' => 'lifestyle',
                    ],
                    [
                        'type' => '5',
                        'name' => 'Xu hướng',
                        'link' => 'trending',
                    ],
                    [
                        'type' => '6',
                        'name' => 'Tạp chí',
                        'link' => 'magazine',
                    ],
                    [
                        'type' => '7',
                        'name' => 'INDIA',
                        'link' => 'india',
                    ],
                    [
                        'type' => '8',
                        'name' => 'Truyền hình',
                        'link' => 'television',
                    ],
                    [
                        'type' => '9',
                        'name' => 'Kinh doanh',
                        'link' => 'business',
                    ],
                    [
                        'type' => '10',
                        'name' => 'Khoa học',
                        'link' => 'science',
                    ],
                    [
                        'type' => '11',
                        'name' => 'Giáo dục',
                        'link' => 'education',
                    ],
                    [
                        'type' => '12',
                        'name' => 'Thành phố',
                        'link' => 'cities',
                    ],
                    [
                        'type' => '13',
                        'name' => 'Tự động',
                        'link' => 'auto',
                    ],
                    [
                        'type' => '14',
                        'name' => 'Thế giới',
                        'link' => 'world',
                    ],
                    [
                        'type' => '15',
                        'name' => 'khác',
                        'link' => 'others',
                    ],
                )
            );
        }
    }

    public function down()
    {
        Schema::dropIfExists('news_category');
    }
}
