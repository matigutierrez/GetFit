<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateGrupoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_grupo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_sede_id')->unsigned();
            $table->foreign('tgf_sede_id')->references('id')->on('tgf_sede')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_tipo_grupo_id')->unsigned();
            $table->foreign('tgf_tipo_grupo_id')->references('id')->on('tgf_tipo_grupo');
            $table->string('gru_nombre');
            $table->string('gru_descripcion');
            $table->integer('gru_costo');
            $table->integer('gru_capacidad');
            $table->boolean('gru_solicitable');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_grupo');
    }
}
