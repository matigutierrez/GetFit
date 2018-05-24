<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSedeClienteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_sede_cliente', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_sede_id')->unsigned();
            $table->foreign('tgf_sede_id')->references('id')->on('tgf_sede')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_sede_cliente');
    }
}
