<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHuellaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_huella', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cliente_id')->unsigned()->unique();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
            $table->binary('hue_huella');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_huella');
    }
}
