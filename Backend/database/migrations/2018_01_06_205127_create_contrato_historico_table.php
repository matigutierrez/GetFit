<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContratoHistoricoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_contrato_historico', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_grupo_id')->unsigned();
            $table->foreign('tgf_grupo_id')->references('id')->on('tgf_grupo')->onDelete('cascade')->onUpdate('cascade');
            
            $table->timestamp('con_fecha_inicio');
            $table->string('con_acta')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_contrato_historico');
    }
}
