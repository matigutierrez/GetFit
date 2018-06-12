<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContratoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_contrato', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_contrato_historico_id')->unsigned();
            $table->foreign('tgf_contrato_historico_id')->references('id')->on('tgf_contrato_historico')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_grupo_id')->unsigned();
            $table->foreign('tgf_grupo_id')->references('id')->on('tgf_grupo')->onDelete('cascade')->onUpdate('cascade');
            $table->unique('tgf_contrato_historico_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_contrato');
    }
}
