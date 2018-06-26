<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSolicitudServicioHistoricaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_solicitud_servicio_historica', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_disponibilidad_servicio_id')->unsigned();
            $table->foreign('tgf_disponibilidad_servicio_id', 'sse_dse_id')->references('id')->on('tgf_disponibilidad_servicio')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id', 'sse_cli_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('sse_fecha_inicio')->nullable();
            $table->timestamp('sse_fecha_fin')->nullable();

            $table->unique(['tgf_disponibilidad_servicio_id', 'tgf_cliente_id'], 'sse_dse_id_u');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_solicitud_servicio_historica');
    }
}
