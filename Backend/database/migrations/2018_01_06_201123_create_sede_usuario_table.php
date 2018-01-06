<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSedeUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_sede_usuario', function (Blueprint $table) {
            $table->integer('tgf_sede_id')->unsigned();
            $table->foreign('tgf_sede_id')->references('id')->on('tgf_sede')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_usuario_id')->unsigned();
            $table->foreign('tgf_usuario_id')->references('id')->on('tgf_usuario')->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['tgf_usuario_id', 'tgf_sede_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_sede_usuario');
    }
}
