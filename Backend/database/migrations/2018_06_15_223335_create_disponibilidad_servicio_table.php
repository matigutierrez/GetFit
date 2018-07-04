<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDisponibilidadServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_disponibilidad_servicio', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_disponibilidad_historica_servicio_id')->unsigned();
            $table->foreign('tgf_disponibilidad_historica_servicio_id', 'dse_dse_id')->references('id')->on('tgf_disponibilidad_historica_servicio')->onDelete('cascade')->onUpdate('cascade');

            $table->unique('tgf_disponibilidad_historica_servicio_id', 'dse_dse_id_u');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_disponibilidad_servicio');
    }
}
