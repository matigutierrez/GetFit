<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDisponibilidadHistoricaServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_disponibilidad_historica_servicio', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_servicio_id')->unsigned();
            $table->foreign('tgf_servicio_id')->references('id')->on('tgf_servicio')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('dse_fecha_inicio')->nullable();
            $table->timestamp('dse_fecha_fin')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_disponibilidad_historica_servicio');
    }
}
