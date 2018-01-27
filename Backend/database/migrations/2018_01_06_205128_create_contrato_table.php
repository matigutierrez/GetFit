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
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_plan_id')->unsigned();
            $table->foreign('tgf_plan_id')->references('id')->on('tgf_plan')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('con_fecha_inicio');
            $table->binary('con_acta')->nullable();                 // Esta columna debe ser de tipo mediumblob
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
