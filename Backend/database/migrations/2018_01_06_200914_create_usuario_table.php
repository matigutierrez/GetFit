<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_usuario', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_rol_id')->unsigned();
            $table->foreign('tgf_rol_id')->references('id')->on('tgf_rol')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamp('usu_fecha_registro');
            $table->string('usu_correo');
            $table->string('password');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_usuario');
    }
}
