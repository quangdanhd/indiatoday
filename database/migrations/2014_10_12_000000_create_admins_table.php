<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateAdminsTable extends Migration
{
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username', 60);
            $table->string('password', 128);
            $table->integer('role_id')->nullable();
            $table->boolean('is_active')->default(1);
            $table->dateTime('last_login');
            $table->dateTime('created_at');
        });
        DB::table('admins')->insert(
            array([
                'username' => 'admin',
                'password' => '21232f297a57a5a743894a0e4a801fc3',
                'last_login' => Carbon\Carbon::now(),
                'created_at' => Carbon\Carbon::now(),
            ])
        );
    }

    public function down()
    {
        Schema::dropIfExists('admins');
    }
}
