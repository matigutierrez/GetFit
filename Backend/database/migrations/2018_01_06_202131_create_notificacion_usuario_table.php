<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificacionUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_notificacion_usuario', function (Blueprint $table) {
            $table->integer('tgf_usu_id')->unsigned();
            $table->foreign('tgf_usu_id')->references('id')->on('tgf_usuario')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('tgf_not_id')->unsigned();
            $table->foreign('tgf_not_id')->references('id')->on('tgf_notificacion')->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['tgf_usu_id', 'tgf_not_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_notificacion_usuario');
    }
}
