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
                        'name' => 'TIN TỨC',
                        'link' => 'tin-tuc',
                    ],
                    [
                        'type' => '2',
                        'name' => 'THỜI TRANG',
                        'link' => 'thoi-trang',
                    ],
                    [
                        'type' => '3',
                        'name' => 'LÀM ĐẸP',
                        'link' => 'lam-dep',
                    ],
                    [
                        'type' => '4',
                        'name' => 'SỨC KHỎE',
                        'link' => 'suc-khoe',
                    ],
                    [
                        'type' => '5',
                        'name' => 'QUÂN SỰ',
                        'link' => 'quan-su',
                    ],
                    [
                        'type' => '6',
                        'name' => 'CÔNG NGHỆ',
                        'link' => 'cong-nghe',
                    ],
                    [
                        'type' => '7',
                        'name' => 'KINH DOANH',
                        'link' => 'kinh-doanh',
                    ],
                    [
                        'type' => '8',
                        'name' => 'DU LỊCH',
                        'link' => 'du-lich',
                    ],
                    [
                        'type' => '9',
                        'name' => 'THẾ GIỚI',
                        'link' => 'the-gioi',
                    ],
                    [
                        'type' => '10',
                        'name' => 'GIÁO DỤC',
                        'link' => 'giao-duc',
                    ],
                    [
                        'type' => '11',
                        'name' => 'XE',
                        'link' => 'xe',
                    ],
                    [
                        'type' => '12',
                        'name' => 'PHÁP LUẬT',
                        'link' => 'phap-luat',
                    ],
                    [
                        'type' => '13',
                        'name' => 'GIẢI TRÍ',
                        'link' => 'giai-tri',
                    ],
                    [
                        'type' => '14',
                        'name' => 'THỂ THAO',
                        'link' => 'the-thao',
                    ],
                    [
                        'type' => '15',
                        'name' => 'PHIM',
                        'link' => 'phim',
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
