<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCobranzaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cobranza', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cobranza_historica_id')->unsigned();
            $table->foreign('tgf_cobranza_historica_id')->references('id')->on('tgf_cobranza_historica')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_contrato_id')->unsigned();
            $table->foreign('tgf_contrato_id')->references('id')->on('tgf_contrato')->onDelete('cascade')->onUpdate('cascade');
            $table->unique('tgf_cobranza_historica_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cobranza');
    }
}
