<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsViewTable extends Migration
{
    public function up()
    {
        Schema::create('news_view', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('news_id');
            $table->integer('user_id')->nullable();
            $table->string('unknown_token', 150);
            $table->boolean('is_user')->default(0);
            $table->dateTime('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('news_view');
    }
}
