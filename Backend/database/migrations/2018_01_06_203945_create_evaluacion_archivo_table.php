<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEvaluacionArchivoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_evaluacion_archivo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_evaluacion_id')->unsigned();
            $table->foreign('tgf_evaluacion_id')->references('id')->on('tgf_evaluacion')->onDelete('cascade')->onUpdate('cascade');
            $table->string('ear_nombre');
            $table->binary('ear_archivo')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_evaluacion_archivo');
    }
}
