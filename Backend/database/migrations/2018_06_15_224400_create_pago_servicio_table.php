<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagoServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_pago_servicio', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cobranza_historica_servicio_id')->unsigned();
            $table->foreign('tgf_cobranza_historica_servicio_id')->references('id')->on('tgf_cobranza_historica_servicio')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_metodo_pago_id')->unsigned();
            $table->foreign('tgf_metodo_pago_id')->references('id')->on('tgf_metodo_pago')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('pag_fecha');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_pago_servicio');
    }
}
