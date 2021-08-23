<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsTable extends Migration
{
    public function up()
    {
        if (!Schema::hasTable('news')) {
            Schema::create('news', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('title', 250);
                $table->integer('category_id');
                $table->text('content')->nullable();
                $table->string('describe', 500)->nullable();
                $table->string('url', 300)->nullable();
                $table->string('from_url', 500)->nullable();
                $table->string('image', 250)->nullable();
                $table->integer('author_id')->nullable();
                $table->boolean('publish')->default(0);
                $table->integer('views')->default(0);
                $table->boolean('new_of_category')->default(0);
                $table->dateTime('created_at');
                $table->dateTime('updated_at');
            });
        }
    }

    public function down()
    {
        Schema::dropIfExists('news');
    }
}
