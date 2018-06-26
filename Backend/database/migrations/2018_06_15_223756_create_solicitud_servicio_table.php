<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSolicitudServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_solicitud_servicio', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_solicitud_servicio_historica_id')->unsigned();
            $table->foreign('tgf_solicitud_servicio_historica_id', 'sse_sse_id')->references('id')->on('tgf_solicitud_servicio_historica')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_disponibilidad_servicio_id')->unsigned();
            $table->foreign('tgf_disponibilidad_servicio_id')->references('id')->on('tgf_disponibilidad_servicio')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_solicitud_servicio');
    }
}
