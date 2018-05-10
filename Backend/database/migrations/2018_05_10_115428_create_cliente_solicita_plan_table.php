<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClienteSolicitaPlanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cliente_solicita_plan', function (Blueprint $table) {
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('tgf_plan_id')->unsigned();
            $table->foreign('tgf_plan_id')->references('id')->on('tgf_plan')->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['tgf_cliente_id', 'tgf_plan_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cliente_solicita_plan');
    }
}
