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
                $table->string('value', 500);
                $table->string('name', 50);
                $table->boolean('active')->default(0);
            });
            DB::table('configs')->insert(
                array(
                    [
                        'key' => 'LANGUAGE',
                        'value' => 'en',
                        'name' => 'English',
                        'active' => 1,
                    ],
                    [
                        'key' => 'LANGUAGE',
                        'value' => 'vi',
                        'name' => 'Vietnamese',
                        'active' => 0,
                    ],
                    [
                        'key' => 'FONT',
                        'value' => '{"a":"\u03b1","b":"b","c":"\u00e7","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"\u0271","n":"\u0273","o":"\u03c3","p":"\u03c1","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z"}',
                        'name' => 'font 1',
                        'active' => 1,
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
