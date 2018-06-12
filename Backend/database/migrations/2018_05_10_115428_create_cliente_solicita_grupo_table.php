<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateClienteSolicitaGrupoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tgf_cliente_solicita_grupo', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('tgf_cliente_id')->unsigned();
            $table->foreign('tgf_cliente_id')->references('id')->on('tgf_cliente')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('tgf_grupo_id')->unsigned();
            $table->foreign('tgf_grupo_id')->references('id')->on('tgf_grupo')->onUpdate('cascade')->onDelete('cascade');
            $table->unique(['tgf_cliente_id', 'tgf_grupo_id']);
            $table->timestamp('fecha_solicitud');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tgf_cliente_solicita_grupo');
    }
}
