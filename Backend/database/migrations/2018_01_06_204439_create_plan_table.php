<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_plan', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_sede_id')->unsigned();
            $table->foreign('tgf_sede_id')->references('id')->on('tgf_sede')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_tipo_plan_id')->unsigned();
            $table->foreign('tgf_tipo_plan_id')->references('id')->on('tgf_tipo_plan');
            $table->string('pla_nombre');
            $table->string('pla_descripcion');
            $table->integer('pla_costo');
            $table->integer('pla_capacidad');
            $table->boolean('pla_solicitable');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_plan');
    }
}
