<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsistenciaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_asistencia', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_contrato_id')->unsigned();
            $table->foreign('tgf_contrato_id')->references('id')->on('tgf_contrato')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_horario_id')->unsigned();
            $table->foreign('tgf_horario_id')->references('id')->on('tgf_horario')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('asi_presente');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_asistencia');
    }
}
