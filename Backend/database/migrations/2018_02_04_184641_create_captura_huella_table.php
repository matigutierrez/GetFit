<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCapturaHuellaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_captura_huella', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_sede_id')->unsigned();
            $table->timestamp('cah_fecha');
            $table->binary('cah_muestra');
        });
        DB::statement('ALTER TABLE tgf_captura_huella MODIFY COLUMN cah_muestra MEDIUMBLOB'); // Comentar esta linea si no se usa mysql
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_captura_huella');
    }
}
