<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArchivoNotificacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_archivo_notificacion', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_notificion_id')->unsigned();
            $table->foreign('tgf_notificion_id')->references('id')->on('tgf_notificacion')->onDelete('cascade')->onUpdate('cascade');
            $table->string('arn_nombre');
            $table->binary('arn_archivo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_archivo_notificacion');
    }
}
