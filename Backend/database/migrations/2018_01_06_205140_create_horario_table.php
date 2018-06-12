<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_horario', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_grupo_id')->unsigned();
            $table->foreign('tgf_grupo_id')->references('id')->on('tgf_grupo')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_hora_dia_id')->unsigned();
            $table->foreign('tgf_hora_dia_id')->references('id')->on('tgf_hora_dia')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_dia_semana_id')->unsigned();
            $table->foreign('tgf_dia_semana_id')->references('id')->on('tgf_dia_semana')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('hor_recuperativo');
            $table->boolean('hor_inactivo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_horario');
    }
}
