<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDescPlanTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_desc_plan', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_plan_id')->unsigned();
            $table->foreign('tgf_plan_id')->references('id')->on('tgf_plan')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('dep_inactivo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_desc_plan');
    }
}
