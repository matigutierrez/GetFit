<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfesorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_profesor', function (Blueprint $table) {
            $table->increments('id');
            $table->string('pro_rut');
            $table->string('pro_nombres');
            $table->string('pro_apellidos');
            $table->string('pro_numerotelefonico', 30)->nullable();
            $table->string('pro_direccion')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_profesor');
    }
}
