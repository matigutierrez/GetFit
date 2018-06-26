<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCobranzaHistoricaServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cobranza_historica_servicio', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_solicitud_servicio_historica_id')->unsigned();
            $table->foreign('tgf_solicitud_servicio_historica_id', 'chs_sse_id')->references('id')->on('tgf_solicitud_servicio_historica')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('chs_monto');
            $table->timestamp('chs_fecha');

            $table->unique('tgf_solicitud_servicio_historica_id', 'chs_sse_id_u');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cobranza_historica_servicio');
    }
}
