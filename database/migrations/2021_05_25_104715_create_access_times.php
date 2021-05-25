<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessTimes extends Migration
{
    public function up()
    {
        Schema::create('access_times', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id')->nullable();
            $table->string('unknown_token', 150);
            $table->dateTime('created_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('access_times');
    }
}
