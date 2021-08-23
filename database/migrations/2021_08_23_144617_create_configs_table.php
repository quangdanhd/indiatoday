<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateConfigsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('configs')) {
            Schema::create('configs', function (Blueprint $table) {
                $table->id();
                $table->string('key', 20);
                $table->string('value', 50);
                $table->string('name', 50);
                $table->boolean('active')->default(0);
            });
            DB::table('configs')->insert(
                array(
                    [
                        'key' => 'LANGUAGE',
                        'value' => 'en',
                        'name' => 'English',
                        'active' => 0,
                    ],
                    [
                        'key' => 'LANGUAGE',
                        'value' => 'vi',
                        'name' => 'Vietnamese',
                        'active' => 0,
                    ],
                )
            );
        }
    }

    public function down()
    {
        Schema::dropIfExists('configs');
    }
}
