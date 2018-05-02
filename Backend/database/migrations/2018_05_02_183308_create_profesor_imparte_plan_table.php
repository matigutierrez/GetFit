<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfesorImpartePlanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesor_imparte_plan', function (Blueprint $table) {
            $table->integer('tgf_profesor_id')->unsigned();
            $table->foreign('tgf_profesor_id')->references('id')->on('tgf_profesor')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('tgf_plan_id')->unsigned();
            $table->foreign('tgf_plan_id')->references('id')->on('tgf_plan')->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['tgf_profesor_id', 'tgf_plan_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('profesor_imparte_plan');
    }
}
