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
            $table->foreign('tgf_solicitud_servicio_historica_id', 'sos_sse_id')->references('id')->on('tgf_solicitud_servicio_historica')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_disponibilidad_historica_servicio_id')->unsigned();
            $table->foreign('tgf_disponibilidad_historica_servicio_id', 'sos_dse_id')->references('id')->on('tgf_disponibilidad_historica_servicio')->onDelete('cascade')->onUpdate('cascade');
        
            $table->unique('tgf_solicitud_servicio_historica_id', 'sos_see_id_u');
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
