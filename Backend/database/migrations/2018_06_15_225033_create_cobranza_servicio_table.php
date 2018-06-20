<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCobranzaServicioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cobranza_servicio', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cobranza_historica_servicio_id')->unsigned();
            $table->foreign('tgf_cobranza_historica_servicio_id')->references('id')->on('tgf_cobranza_historica_servicio')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cobranza_servicio');
    }
}
