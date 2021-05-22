<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateNewsCategoryTable extends Migration
{
    public function up()
    {
        Schema::create('news_category', function (Blueprint $table) {
            $table->integer('type');
            $table->string('name', 20);
        });
        DB::table('news_category')->insert(
            array(
                [
                    'type' => '1',
                    'name' => 'MOVIES',
                ],
                [
                    'type' => '2',
                    'name' => 'SPORTS',
                ],
                [
                    'type' => '3',
                    'name' => 'TECHNOLOGY',
                ],
                [
                    'type' => '4',
                    'name' => 'LIFESTYLE',
                ],
                [
                    'type' => '5',
                    'name' => 'TRENDING',
                ],
                [
                    'type' => '6',
                    'name' => 'MAGAZINE',
                ],
                [
                    'type' => '7',
                    'name' => 'INDIA',
                ],
                [
                    'type' => '8',
                    'name' => 'TELEVISION',
                ],
                [
                    'type' => '9',
                    'name' => 'BUSINESS',
                ],
                [
                    'type' => '10',
                    'name' => 'SCIENCE',
                ],
                [
                    'type' => '11',
                    'name' => 'EDUCATION',
                ],
                [
                    'type' => '12',
                    'name' => 'CITIES',
                ],
                [
                    'type' => '13',
                    'name' => 'AUTO',
                ],
                [
                    'type' => '14',
                    'name' => 'WORLD',
                ],
                [
                    'type' => '15',
                    'name' => 'OTHERS',
                ],
            )
        );
    }

    public function down()
    {
        Schema::dropIfExists('news_category');
    }
}
