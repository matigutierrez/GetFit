<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCobranzaHistoricaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cobranza_historica', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_contrato_historico_id')->unsigned();
            $table->foreign('tgf_contrato_historico_id')->references('id')->on('tgf_contrato')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('cob_monto');
            $table->timestamp('cob_fecha');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cobranza_historica');
    }
}
