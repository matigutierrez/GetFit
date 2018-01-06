<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHorarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_horario', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('hor_hora');
            $table->integer('tgf_plan_id')->unsigned();
            $table->foreign('tgf_plan_id')->references('id')->on('tgf_plan')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('hor_recuperativo');
            $table->boolean('hor_inactivo');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_horario');
    }
}
